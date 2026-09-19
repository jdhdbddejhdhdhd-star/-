import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, CartItem, Order, Category } from './types';
import { CATEGORIES as DEFAULT_CATEGORIES, MENU_ITEMS as DEFAULT_MENU_ITEMS } from './data/menuData';
import { BrandHeader } from './components/BrandHeader';
import { HomeScreen } from './components/HomeScreen';
import { CategoryNav } from './components/CategoryNav';
import { CategoryHero } from './components/CategoryHero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartSheet } from './components/CartSheet';
import { FloatingCartBar } from './components/FloatingCartBar';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderStatusModal } from './components/OrderStatusModal';
import { BranchesModal } from './components/BranchesModal';
import { TableQrScanModal } from './components/TableQrScanModal';
import { NoResults } from './components/NoResults';
import { LiveOrderStatusCard } from './components/LiveOrderStatusCard';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

// Security & Dedicated Views
import { WaiterView } from './components/WaiterView';
import { CashierView } from './components/CashierView';
import { RolePortalModal, UserRole } from './components/RolePortalModal';
import {
  submitOrderToFirebase,
  subscribeToOrderById,
  subscribeToMenuItems,
  subscribeToCategories,
  seedInitialMenuIfEmpty,
} from './lib/orderService';

export default function App() {
  return (
    <ErrorBoundary>
      <MainRouter />
    </ErrorBoundary>
  );
}

function MainRouter() {
  // 1. UNIFIED ROLE SELECTION & ROUTING
  // Role can be: 'customer' (default / menu & order), 'waiter' (PIN protected), or 'cashier' (PIN protected)
  const pathname = window.location.pathname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const explicitView = searchParams.get('view')?.toLowerCase();
  const explicitPortal =
    searchParams.get('portal') === 'true' ||
    searchParams.get('portal') === '1' ||
    explicitView === 'portal' ||
    explicitView === 'roles';

  const getInitialRole = (): UserRole => {
    if (pathname.includes('/waiter') || explicitView === 'waiter') return 'waiter';
    if (pathname.includes('/cashier') || explicitView === 'cashier') return 'cashier';
    return 'customer';
  };

  const [activeRole, setActiveRole] = useState<UserRole>(getInitialRole);
  const [isRolePortalOpen, setIsRolePortalOpen] = useState<boolean>(explicitPortal);

  const handleSelectRole = (role: UserRole) => {
    setActiveRole(role);
    // Update browser URL seamlessly for bookmarking or sharing
    const url = new URL(window.location.href);
    if (role === 'customer') {
      url.searchParams.delete('view');
    } else {
      url.searchParams.set('view', role);
    }
    window.history.replaceState(null, '', url.toString());
  };

  // Direct entrance: extract table from URL or use saved table / default to '01'
  const urlTable = searchParams.get('table') || searchParams.get('t') || '';

  const [tableNumber, setTableNumber] = useState<string>(() => {
    if (urlTable) {
      const formatted = String(urlTable).padStart(2, '0');
      try {
        localStorage.setItem('italian_table', formatted);
      } catch {}
      return formatted;
    }
    try {
      const saved = localStorage.getItem('italian_table');
      if (saved) return saved;
    } catch {}
    return '01';
  });

  const handleUpdateTable = (newTable: string) => {
    const formatted = String(newTable).padStart(2, '0');
    setTableNumber(formatted);
    try {
      localStorage.setItem('italian_table', formatted);
    } catch {}
  };

  return (
    <>
      {/* 1. Waiter Screen (Protected with PIN) */}
      {activeRole === 'waiter' && (
        <WaiterView onSwitchRole={() => setIsRolePortalOpen(true)} />
      )}

      {/* 2. Cashier & Management Screen (Protected with PIN) */}
      {activeRole === 'cashier' && (
        <CashierView onSwitchRole={() => setIsRolePortalOpen(true)} />
      )}

      {/* 3. Customer Screen (Direct Menu & Ordering with QR Confirmation) */}
      {activeRole === 'customer' && (
        <CustomerApp
          tableNumber={tableNumber}
          setTableNumber={handleUpdateTable}
        />
      )}

      {/* Global Unified Role Switcher / Portal Modal (accessible for staff from Waiter/Cashier or URL) */}
      <RolePortalModal
        isOpen={isRolePortalOpen}
        currentRole={activeRole}
        onClose={() => setIsRolePortalOpen(false)}
        onSelectRole={handleSelectRole}
      />
    </>
  );
}

// Inner Customer App Component
function CustomerApp({
  tableNumber,
  setTableNumber,
}: {
  tableNumber: string;
  setTableNumber: (t: string) => void;
}) {
  // Live Menu Items and Categories synchronized with Firebase
  const [menuItems, setMenuItems] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    seedInitialMenuIfEmpty();
    const unsubMenu = subscribeToMenuItems((items) => {
      if (items && items.length > 0) setMenuItems(items);
    });
    const unsubCats = subscribeToCategories((cats) => {
      if (cats && cats.length > 0) setCategories(cats);
    });
    return () => {
      unsubMenu();
      unsubCats();
    };
  }, []);

  // View switch: 'home' (main screen overview) vs 'menu' (full browsable catalogue)
  const [currentView, setCurrentView] = useState<'home' | 'menu'>('home');

  // Navigation & Category State (Initial category: الايس كريم)
  const [activeCategoryId, setActiveCategoryId] = useState<string>('ice-cream');

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Shopping Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ice_italy_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ice_italy_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Modals State
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState<boolean>(false);
  const [isBranchesOpen, setIsBranchesOpen] = useState<boolean>(false);
  const [isQrScanModalOpen, setIsQrScanModalOpen] = useState<boolean>(false);

  // Active Order State from Firebase (Only active after the customer completes and submits an order)
  const [activeOrderId, setActiveOrderId] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(`active_order_${tableNumber}`);
    } catch {
      return null;
    }
  });

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Sync activeOrderId if tableNumber changes
  useEffect(() => {
    try {
      const savedId = sessionStorage.getItem(`active_order_${tableNumber}`);
      setActiveOrderId(savedId);
      if (!savedId) {
        setCurrentOrder(null);
      }
    } catch {
      setActiveOrderId(null);
      setCurrentOrder(null);
    }
  }, [tableNumber]);

  useEffect(() => {
    if (!activeOrderId) {
      setCurrentOrder(null);
      return;
    }
    // Only listen to the order specifically completed and submitted by this customer
    const unsubscribe = subscribeToOrderById(activeOrderId, (liveOrder) => {
      if (liveOrder) {
        setCurrentOrder(liveOrder);
      }
    });
    return () => unsubscribe();
  }, [activeOrderId]);

  // Filtered menu items
  const displayedItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      return menuItems.filter(
        (item) =>
          item.nameAr.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          (item.flavors && item.flavors.some((f) => f.toLowerCase().includes(query)))
      );
    }
    return menuItems.filter((item) => item.categoryId === activeCategoryId);
  }, [searchQuery, activeCategoryId, menuItems]);

  const activeCategory = useMemo(() => {
    return categories.find((c) => c.id === activeCategoryId) || categories[0] || DEFAULT_CATEGORIES[0];
  }, [activeCategoryId, categories]);

  // Cart Totals
  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // Map quantities in cart for badges
  const itemCartQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of cartItems) {
      map[item.item.id] = (map[item.item.id] || 0) + item.quantity;
    }
    return map;
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (newCartItemData: Omit<CartItem, 'cartId'>) => {
    const cartId = `${newCartItemData.item.id}-${newCartItemData.selectedSize?.label || 'default'}-${newCartItemData.selectedFlavor || 'default'}-${Date.now()}`;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.item.id === newCartItemData.item.id &&
          i.selectedSize?.label === newCartItemData.selectedSize?.label &&
          i.selectedFlavor === newCartItemData.selectedFlavor &&
          i.notes === newCartItemData.notes
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        const newQty = current.quantity + newCartItemData.quantity;
        updated[existingIndex] = {
          ...current,
          quantity: newQty,
          totalPrice: newQty * current.unitPrice,
        };
        return updated;
      }

      return [...prev, { ...newCartItemData, cartId }];
    });
  };

  const handleQuickAdd = (item: MenuItem) => {
    handleAddToCart({
      item,
      quantity: 1,
      unitPrice: item.price,
      totalPrice: item.price,
    });
  };

  const handleUpdateCartQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              quantity,
              totalPrice: quantity * item.unitPrice,
            }
          : item
      )
    );
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Step 1: When user clicks Checkout in Cart, ask for Table QR Code verification
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsQrScanModalOpen(true);
  };

  // Step 2: Final submission to Firebase after table QR verification
  const executeFinalOrderCheckout = async () => {
    if (cartItems.length === 0) return;

    const orderNum = `${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      tableNumber,
      items: [...cartItems],
      totalAmount: cartTotalAmount,
      createdAt: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      status: 'received',
    };

    try {
      await submitOrderToFirebase(newOrder);
      setCurrentOrder(newOrder);
      setActiveOrderId(newOrder.id);
      try {
        sessionStorage.setItem(`active_order_${tableNumber}`, newOrder.id);
      } catch {}
      setCartItems([]);
      setIsQrScanModalOpen(false);
      setIsCartOpen(false);
      setIsConfirmationOpen(true);
    } catch (err) {
      console.error('Error sending order to Firebase:', err);
      // Fallback local
      setCurrentOrder(newOrder);
      setActiveOrderId(newOrder.id);
      try {
        sessionStorage.setItem(`active_order_${tableNumber}`, newOrder.id);
      } catch {}
      setCartItems([]);
      setIsQrScanModalOpen(false);
      setIsCartOpen(false);
      setIsConfirmationOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F7] text-[#221016] flex flex-col selection:bg-[#7A153E] selection:text-white pb-28 sm:pb-24">
      {/* Top Header with Table Badge, View Switcher, Search, and Cart */}
      <BrandHeader
        tableNumber={tableNumber}
        cartCount={cartTotalCount}
        cartTotal={cartTotalAmount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBranches={() => setIsBranchesOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        isSearchOpen={isSearchOpen}
        currentView={currentView}
        onSelectView={(view) => {
          setCurrentView(view);
          if (view === 'home') {
            setSearchQuery('');
            setIsSearchOpen(false);
          }
        }}
        onToggleSearch={() => {
          setIsSearchOpen((prev) => !prev);
          if (isSearchOpen) {
            setSearchQuery('');
          }
        }}
        onResetToTop={() => {
          setCurrentView('home');
          setActiveCategoryId(categories[0]?.id || 'ice-cream');
          setSearchQuery('');
        }}
      />

      {/* View 1: Main Home Screen (الواجهة الرئيسية) */}
      {currentView === 'home' && !searchQuery ? (
        <HomeScreen
          tableNumber={tableNumber}
          onNavigateToMenu={(categoryId) => {
            if (categoryId) setActiveCategoryId(categoryId);
            setCurrentView('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectProduct={(item) => setSelectedProduct(item)}
          onQuickAdd={handleQuickAdd}
          onOpenBranches={() => setIsBranchesOpen(true)}
          currentOrder={currentOrder}
          onOpenOrderStatus={() => setIsOrderStatusOpen(true)}
        />
      ) : (
        /* View 2: Full Menu Screen (قائمة المنيو الكاملة مع الأقسام) */
        <>
          {/* Category Horizontal Navigation (shown when in menu view and not searching) */}
          {!searchQuery && (
            <CategoryNav
              categories={categories}
              activeCategoryId={activeCategoryId}
              onSelectCategory={(id) => {
                setActiveCategoryId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              categoryCounts={{}}
            />
          )}

          {/* Main Menu Container */}
          <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 pt-2 sm:pt-3">
            {/* Dedicated Live Order Status Card if order exists */}
            {currentOrder && (
              <LiveOrderStatusCard
                order={currentOrder}
                tableNumber={tableNumber}
                onOpenDetails={() => setIsOrderStatusOpen(true)}
              />
            )}

            {/* Category Hero Banner */}
            {!searchQuery && (
              <CategoryHero
                category={activeCategory}
                itemCount={displayedItems.length}
              />
            )}

            {/* Search feedback when searching */}
            {searchQuery && (
              <div className="mb-4 flex items-center justify-between text-xs text-stone-600 bg-white p-3 rounded-2xl border border-stone-200">
                <span>
                  نتائج البحث عن: <strong className="text-[#7A153E]">"{searchQuery}"</strong> ({displayedItems.length} صنف)
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="font-bold text-[#7A153E] hover:underline cursor-pointer"
                >
                  إلغاء البحث
                </button>
              </div>
            )}

            {/* Products Grid with Smooth Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={searchQuery ? 'search' : activeCategoryId}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {displayedItems.length === 0 ? (
                  <NoResults
                    searchQuery={searchQuery}
                    onClearSearch={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                  />
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2.5 sm:gap-4">
                    {displayedItems.map((item, index) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        index={index}
                        quantityInCart={itemCartQuantities[item.id] || 0}
                        onOpenDetails={(selected) => setSelectedProduct(selected)}
                        onQuickAdd={handleQuickAdd}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </>
      )}

      {/* Sticky Floating Cart Button on Mobile */}
      <FloatingCartBar
        totalCount={cartTotalCount}
        totalAmount={cartTotalAmount}
        tableNumber={tableNumber}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Product Customization Bottom-Sheet / Modal */}
      <ProductModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Bottom-Sheet */}
      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        tableNumber={tableNumber}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
        onBrowseMenu={() => setIsCartOpen(false)}
      />

      {/* Order Confirmation Celebration Screen */}
      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        order={currentOrder}
        onTrackOrder={() => {
          setIsConfirmationOpen(false);
          setIsOrderStatusOpen(true);
        }}
        onClose={() => setIsConfirmationOpen(false)}
      />

      {/* Live Order Status Tracker */}
      <OrderStatusModal
        isOpen={isOrderStatusOpen}
        order={currentOrder}
        onClose={() => setIsOrderStatusOpen(false)}
        onNewOrder={() => {
          setIsOrderStatusOpen(false);
          setCurrentOrder(null);
          setActiveOrderId(null);
          try {
            sessionStorage.removeItem(`active_order_${tableNumber}`);
          } catch {}
        }}
      />

      {/* Branches Information Modal */}
      <BranchesModal
        isOpen={isBranchesOpen}
        onClose={() => setIsBranchesOpen(false)}
      />

      {/* Table QR Verification Before Checkout Modal */}
      <TableQrScanModal
        isOpen={isQrScanModalOpen}
        tableNumber={tableNumber}
        totalAmount={cartTotalAmount}
        onClose={() => setIsQrScanModalOpen(false)}
        onConfirmOrder={executeFinalOrderCheckout}
      />

      {/* Clean Footer without Welcome Option */}
      <Footer
        tableNumber={tableNumber}
        onOpenBranches={() => setIsBranchesOpen(true)}
      />
    </div>
  );
}
