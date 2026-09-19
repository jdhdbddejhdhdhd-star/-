import React, { useState, useEffect, useMemo } from 'react';
import {
  CreditCard,
  Printer,
  QrCode,
  Search,
  RefreshCw,
  Receipt,
  Star,
  Lock,
  Users,
  UtensilsCrossed,
  Image as ImageIcon,
  FolderPlus,
  Trash2,
  Edit3,
  Plus,
  Sparkles,
  Check,
  FolderTree,
  ExternalLink,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import { Order, MenuItem, Category } from '../types';
import {
  subscribeToOrders,
  subscribeToCategories,
  subscribeToMenuItems,
  saveMenuItemInFirebase,
  deleteMenuItemInFirebase,
  saveCategoryInFirebase,
  deleteCategoryInFirebase,
} from '../lib/orderService';
import { TableQrManager } from './TableQrManager';
import { PrintableReceiptModal } from './PrintableReceiptModal';
import { PinLockScreen } from './PinLockScreen';
import { ImageEditorModal } from './ImageEditorModal';
import { CategoryEditorModal } from './CategoryEditorModal';
import { MenuEditorModal } from './MenuEditorModal';
import { DEFAULT_FALLBACK_IMAGE } from './SafeImage';

interface CashierViewProps {
  onSwitchRole?: () => void;
}

export const CashierView: React.FC<CashierViewProps> = ({ onSwitchRole }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('cashier_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Navigation tabs:
  // 1. qr_tables: رموز QR للطاولات
  // 2. orders: فواتير الصالة والطباعة
  // 3. menu_management: إدارة المنيو والصور والقوائم (جديد)
  const [activeTab, setActiveTab] = useState<'qr_tables' | 'orders' | 'menu_management'>('menu_management');

  // Sub-tabs inside Menu Management: 'items_images' (الأصناف والصور) vs 'categories' (القوائم والأقسام)
  const [menuSubTab, setMenuSubTab] = useState<'items_images' | 'categories'>('items_images');

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(true);
  const [orderSearchQuery, setOrderSearchQuery] = useState<string>('');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  // Menu Items & Categories State (Real-time Firebase sync)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState<boolean>(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [itemSearchQuery, setItemSearchQuery] = useState<string>('');

  // Modals for editing
  const [editingImageItem, setEditingImageItem] = useState<MenuItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState<boolean>(false);

  // Notification / Toast
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showToast = (message: string) => {
    setActionNotice(message);
    setTimeout(() => {
      setActionNotice(null);
    }, 4000);
  };

  // Real-time Firestore Subscriptions
  useEffect(() => {
    const unsubOrders = subscribeToOrders((updated) => {
      setOrders(updated);
      setIsLoadingOrders(false);
    });

    const unsubCats = subscribeToCategories((updatedCats) => {
      setCategories(updatedCats);
    });

    const unsubItems = subscribeToMenuItems((updatedItems) => {
      setMenuItems(updatedItems);
      setIsLoadingMenu(false);
    });

    return () => {
      unsubOrders();
      unsubCats();
      unsubItems();
    };
  }, []);

  // Filtered orders for cashier table
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (!orderSearchQuery.trim()) return true;
      const q = orderSearchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.tableNumber.includes(q) ||
        o.items.some((it) => it.item.nameAr.toLowerCase().includes(q))
      );
    });
  }, [orders, orderSearchQuery]);

  // Filtered menu items for cashier item manager
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((it) => {
      const matchCat =
        selectedCategoryFilter === 'all' || it.categoryId === selectedCategoryFilter;
      const matchSearch =
        !itemSearchQuery.trim() ||
        it.nameAr.toLowerCase().includes(itemSearchQuery.toLowerCase()) ||
        (it.description && it.description.toLowerCase().includes(itemSearchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [menuItems, selectedCategoryFilter, itemSearchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const todayTotal = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const completedOrders = orders.filter((o) => o.status === 'served').length;
    const activeOrders = orders.filter((o) => o.status !== 'served').length;
    return { todayTotal, completedOrders, activeOrders, totalCount: orders.length };
  }, [orders]);

  // Map category IDs to items count
  const categoryItemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    menuItems.forEach((it) => {
      counts[it.categoryId] = (counts[it.categoryId] || 0) + 1;
    });
    return counts;
  }, [menuItems]);

  const handleUnlock = () => {
    setIsUnlocked(true);
    try {
      sessionStorage.setItem('cashier_auth', 'true');
    } catch {}
  };

  const handleLock = () => {
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem('cashier_auth');
    } catch {}
  };

  // ================= ACTIONS: IMAGE EDITING & DELETION =================
  const handleSaveItemImage = async (newImageUrl: string) => {
    if (!editingImageItem) return;
    const updated: MenuItem = {
      ...editingImageItem,
      image: newImageUrl,
    };
    await saveMenuItemInFirebase(updated);
    showToast(`تم تحديث صورة "${editingImageItem.nameAr}" بنجاح.`);
  };

  const handleDeleteItemImage = async () => {
    if (!editingImageItem) return;
    const updated: MenuItem = {
      ...editingImageItem,
      image: DEFAULT_FALLBACK_IMAGE,
    };
    await saveMenuItemInFirebase(updated);
    showToast(`تم حذف صورة "${editingImageItem.nameAr}" والاعتماد على الشعار الافتراضي.`);
  };

  // Quick direct image delete button on card
  const handleQuickDeleteImage = async (item: MenuItem) => {
    if (confirm(`هل أنت متأكد من حذف صورة صنف "${item.nameAr}" والرجوع للشعار الرسمي؟`)) {
      const updated: MenuItem = {
        ...item,
        image: DEFAULT_FALLBACK_IMAGE,
      };
      await saveMenuItemInFirebase(updated);
      showToast(`تم حذف صورة "${item.nameAr}".`);
    }
  };

  // ================= ACTIONS: CATEGORY MANAGEMENT (ADD & DELETE) =================
  const handleSaveCategory = async (cat: Category) => {
    await saveCategoryInFirebase(cat);
    showToast(`تم حفظ وتحديث قائمة "${cat.nameAr}" بنجاح.`);
  };

  const handleDeleteCategory = async (catId: string) => {
    const cat = categories.find((c) => c.id === catId);
    await deleteCategoryInFirebase(catId);
    showToast(`تم حذف قائمة "${cat?.nameAr || catId}" بنجاح.`);
  };

  // ================= ACTIONS: MENU ITEM CRUD =================
  const handleSaveMenuItem = async (item: MenuItem) => {
    await saveMenuItemInFirebase(item);
    showToast(`تم حفظ الصنف "${item.nameAr}" بنجاح.`);
  };

  const handleDeleteMenuItem = async (itemId: string) => {
    const it = menuItems.find((i) => i.id === itemId);
    await deleteMenuItemInFirebase(itemId);
    showToast(`تم حذف الصنف "${it?.nameAr || itemId}".`);
  };

  if (!isUnlocked) {
    return (
      <PinLockScreen
        title="دخول كاونتر الكاشير"
        subtitle="إدارة المنيو، الصور، القوائم، وفواتير الصالة"
        badge="الكاشير والإدارة"
        defaultPin="8899"
        icon={CreditCard}
        onUnlock={handleUnlock}
        onBack={onSwitchRole}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F6] text-stone-900 pb-20 selection:bg-[#7A153E] selection:text-white" dir="rtl">
      {/* Toast Notice Bar */}
      {actionNotice && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-[#2D0616] text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/40 flex items-center gap-2.5 text-xs font-black animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Cashier Master Header */}
      <header className="sticky top-0 z-30 bg-[#2D0616] text-white shadow-lg border-b border-rose-950">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-400 text-[#2D0616] flex items-center justify-center font-black shadow-md shrink-0">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black font-serif">كاونتر الكاشير والإدارة</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-900 text-rose-200 border border-rose-700 font-bold">
                  محمي
                </span>
              </div>
              <p className="text-[11px] text-rose-200/85 line-clamp-1">
                تعديل وحذف الصور • إضافة وحذف القوائم • فواتير الصالة • باركودات QR
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Role Portal Switcher */}
            {onSwitchRole && (
              <button
                onClick={onSwitchRole}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#2D0616] text-xs font-black transition-all cursor-pointer shadow-sm"
                title="تبديل الواجهة"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">الواجهات</span>
              </button>
            )}

            {/* Quick Stats Pill */}
            <div className="hidden md:flex items-center gap-2.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
              <span className="text-rose-200/70 text-[11px]">مبيعات اليوم:</span>
              <span className="font-black text-amber-300">
                {stats.todayTotal.toLocaleString('ar-IQ')} د.ع
              </span>
            </div>

            {/* Lock Terminal Button */}
            <button
              onClick={handleLock}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-500/30 text-rose-200 text-xs font-bold transition-all cursor-pointer border border-white/15"
              title="قفل الكاونتر"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>قفل</span>
            </button>
          </div>
        </div>

        {/* Master Navigation Tabs:
            1. إدارة المنيو والصور والقوائم (New primary management hub)
            2. فواتير الصالة والطباعة
            3. رموز QR للطاولات
        */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center gap-2 border-t border-white/10 py-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('menu_management')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'menu_management'
                ? 'bg-amber-400 text-[#2D0616] shadow-sm'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>إدارة المنيو والصور والقوائم</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'orders'
                ? 'bg-amber-400 text-[#2D0616] shadow-sm'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>فواتير الصالة والطباعة ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('qr_tables')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'qr_tables'
                ? 'bg-amber-400 text-[#2D0616] shadow-sm'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>رموز QR للطاولات (1-100)</span>
          </button>
        </div>
      </header>

      {/* Cashier Content Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
        {/* ================= TAB 1: MENU, IMAGES & CATEGORIES MANAGEMENT ================= */}
        {activeTab === 'menu_management' && (
          <div className="space-y-4">
            {/* Top Toolbar: Sub-tab switcher and quick action buttons */}
            <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Sub-tabs: 1. الأصناف والصور | 2. القوائم والأقسام */}
              <div className="flex items-center p-1 bg-stone-100 rounded-2xl gap-1">
                <button
                  type="button"
                  onClick={() => setMenuSubTab('items_images')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    menuSubTab === 'items_images'
                      ? 'bg-[#7A153E] text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>تعديل وحذف الصور والأصناف ({menuItems.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMenuSubTab('categories')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    menuSubTab === 'categories'
                      ? 'bg-[#7A153E] text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <FolderTree className="w-4 h-4" />
                  <span>إضافة وحذف قوائم المنيو ({categories.length})</span>
                </button>
              </div>

              {/* Action Buttons depending on sub-tab */}
              <div className="flex items-center gap-2">
                {menuSubTab === 'categories' ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCategory(null);
                      setIsCategoryModalOpen(true);
                    }}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs shadow-sm transition-all cursor-pointer"
                  >
                    <FolderPlus className="w-4 h-4" />
                    <span>إضافة قائمة جديدة +</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingMenuItem(null);
                      setIsItemModalOpen(true);
                    }}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A153E] hover:bg-[#961D4E] text-white font-black text-xs shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة صنف جديد +</span>
                  </button>
                )}
              </div>
            </div>

            {/* ================= SUB-TAB 1: ITEMS & IMAGES MANAGER ================= */}
            {menuSubTab === 'items_images' && (
              <div className="space-y-4">
                {/* Search & Category Filter Bar */}
                <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={itemSearchQuery}
                      onChange={(e) => setItemSearchQuery(e.target.value)}
                      placeholder="ابحث عن صنف لتعديل أو حذف صورته..."
                      className="w-full pl-3 pr-9 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#7A153E]"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <span className="text-xs font-bold text-stone-500 shrink-0">تصفية حسب القائمة:</span>
                    <select
                      value={selectedCategoryFilter}
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-bold bg-stone-50 text-stone-800 focus:outline-none focus:border-[#7A153E]"
                    >
                      <option value="all">جميع القوائم ({menuItems.length} صنف)</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nameAr} ({categoryItemCounts[c.id] || 0})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Items Grid with Direct Image Edit & Delete Controls */}
                {isLoadingMenu ? (
                  <div className="bg-white rounded-3xl p-12 text-center text-stone-500 space-y-2 border border-stone-200">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#7A153E]" />
                    <p className="text-xs font-bold">جاري تحميل أصناف وقوائم المنيو...</p>
                  </div>
                ) : filteredMenuItems.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center text-stone-500 space-y-2 border border-stone-200">
                    <p className="text-sm font-bold">لا توجد أصناف تطابق البحث أو الفلتر المحدد</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {filteredMenuItems.map((item) => {
                      const category = categories.find((c) => c.id === item.categoryId);
                      const isDefaultImage =
                        !item.image || item.image === DEFAULT_FALLBACK_IMAGE;

                      return (
                        <div
                          key={item.id}
                          className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col hover:border-[#7A153E]/40 hover:shadow-md transition-all group"
                        >
                          {/* Image & Quick Overlay Actions */}
                          <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden">
                            <img
                              src={item.image || DEFAULT_FALLBACK_IMAGE}
                              alt={item.nameAr}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = DEFAULT_FALLBACK_IMAGE;
                              }}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Badge if present */}
                            {item.badge && (
                              <span className="absolute top-2 right-2 bg-[#7A153E] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
                                {item.badge}
                              </span>
                            )}

                            {/* Category tag */}
                            <span className="absolute top-2 left-2 bg-black/65 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border border-white/20">
                              {category?.nameAr || item.categoryId}
                            </span>

                            {/* IMAGE ACTION BAR (Overlay on Image) */}
                            <div className="absolute inset-x-2 bottom-2 z-10 flex items-center justify-between gap-1.5">
                              {/* Edit / Change Image Button */}
                              <button
                                type="button"
                                onClick={() => setEditingImageItem(item)}
                                className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-[#7A153E] text-[11px] font-black shadow-md border border-stone-200 transition-all cursor-pointer backdrop-blur-xs"
                                title="تغيير أو رفع صورة جديدة"
                              >
                                <ImageIcon className="w-3.5 h-3.5" />
                                <span>تعديل الصورة</span>
                              </button>

                              {/* Delete Image Button */}
                              <button
                                type="button"
                                onClick={() => handleQuickDeleteImage(item)}
                                disabled={isDefaultImage}
                                className={`inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-black shadow-md transition-all cursor-pointer backdrop-blur-xs ${
                                  isDefaultImage
                                    ? 'bg-stone-200/80 text-stone-400 cursor-not-allowed'
                                    : 'bg-rose-600/90 hover:bg-rose-700 text-white'
                                }`}
                                title={isDefaultImage ? 'الصورة محذوفة بالفعل' : 'حذف الصورة واعتماد الشعار الافتراضي'}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>حذف الصورة</span>
                              </button>
                            </div>
                          </div>

                          {/* Item Details */}
                          <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="font-bold text-sm text-stone-900 line-clamp-1 group-hover:text-[#7A153E] transition-colors">
                                  {item.nameAr}
                                </h3>
                                <span className="text-xs font-black text-[#7A153E] whitespace-nowrap">
                                  {item.price.toLocaleString('ar-IQ')} د.ع
                                </span>
                              </div>
                              {item.description && (
                                <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>

                            {/* Item Bottom Actions: Edit item details / Delete item */}
                            <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingMenuItem(item);
                                  setIsItemModalOpen(true);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold transition-all cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3 text-[#7A153E]" />
                                <span>تعديل الصنف</span>
                              </button>

                              <button
                                type="button"
                                onClick={async () => {
                                  if (confirm(`هل أنت متأكد من حذف الصنف "${item.nameAr}" نهائياً من المنيو؟`)) {
                                    await handleDeleteMenuItem(item.id);
                                  }
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-rose-600 hover:bg-rose-50 text-[11px] font-bold transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>حذف الصنف</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ================= SUB-TAB 2: CATEGORIES / LISTS MANAGER (ADD & DELETE) ================= */}
            {menuSubTab === 'categories' && (
              <div className="space-y-4">
                {/* Information Header Banner */}
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
                  <FolderTree className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 space-y-1">
                    <p className="font-bold">إدارة وحذف وإضافة قوائم وأقسام المنيو</p>
                    <p className="text-amber-800/90 leading-relaxed">
                      يمكنك هنا إضافة أقسام وقوائم جديدة للمحل، تعديل أسمائها وصور أغلفتها، أو حذف أي قائمة لا ترغب بظهورها في المنيو. تنعكس جميع التغييرات لحظياً على هواتف الزبائن والشاشات.
                    </p>
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {categories.map((cat) => {
                    const itemCount = categoryItemCounts[cat.id] || 0;

                    return (
                      <div
                        key={cat.id}
                        className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col hover:border-amber-400/80 hover:shadow-md transition-all group"
                      >
                        {/* Banner Image or Brand Header */}
                        <div className="relative h-28 w-full bg-gradient-to-r from-[#2D0616] to-[#4A0A24] overflow-hidden">
                          {cat.bannerImage ? (
                            <img
                              src={cat.bannerImage}
                              alt={cat.nameAr}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80';
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-amber-200/30">
                              <Sparkles className="w-12 h-12" />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                          {/* Items Count Badge */}
                          <span className="absolute top-2.5 right-2.5 bg-white/25 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                            {itemCount} صنف مسجل
                          </span>

                          {/* Category ID tag */}
                          <span className="absolute top-2.5 left-2.5 font-mono text-[9px] text-white/70 bg-black/40 px-2 py-0.5 rounded-md">
                            {cat.id}
                          </span>

                          {/* Category Name inside banner */}
                          <div className="absolute bottom-2.5 right-3 left-3">
                            <h3 className="text-white font-black text-sm sm:text-base drop-shadow-sm line-clamp-1">
                              {cat.nameAr}
                            </h3>
                          </div>
                        </div>

                        {/* Category Body & Actions */}
                        <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
                          <div>
                            <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                              {cat.description || 'لا يوجد وصف مدخل لهذا القسم حالياً.'}
                            </p>
                          </div>

                          {/* Action Buttons: Edit Category, Delete Category */}
                          <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingCategory(cat);
                                setIsCategoryModalOpen(true);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-[#7A153E]" />
                              <span>تعديل القائمة</span>
                            </button>

                            {/* Delete Category Button */}
                            <button
                              type="button"
                              onClick={async () => {
                                let confirmMsg = `هل أنت متأكد من حذف قائمة "${cat.nameAr}"؟`;
                                if (itemCount > 0) {
                                  confirmMsg += `\n\nتنبيه هام: هناك (${itemCount}) أصناف مسجلة في هذا القسم! سيتم إزالة هذا القسم من شريط المنيو.`;
                                }
                                if (confirm(confirmMsg)) {
                                  await handleDeleteCategory(cat.id);
                                }
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black border border-rose-200 transition-colors cursor-pointer"
                              title="حذف القائمة نهائياً من المنيو"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>حذف القائمة</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: ORDERS & PRINTABLE INVOICES ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Search and Summary Bar */}
            <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  placeholder="بحث برقم الطاولة، رقم الطلب، أو الصنف..."
                  className="w-full pl-3 pr-9 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#7A153E]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto text-xs text-stone-600">
                <span>إجمالي الطلبات المستلمة: <strong>{filteredOrders.length}</strong></span>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              {isLoadingOrders ? (
                <div className="p-12 text-center text-stone-500 space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#7A153E]" />
                  <p className="text-xs font-bold">جاري جلب الفواتير من السحابة...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="p-12 text-center text-stone-500 space-y-2">
                  <p className="text-sm font-bold">لا توجد طلبات تطابق بحثك حالياً</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                      <tr>
                        <th className="p-3.5">رقم الطلب</th>
                        <th className="p-3.5">الطاولة</th>
                        <th className="p-3.5">وقت الطلب</th>
                        <th className="p-3.5">الأصناف المطلوبة</th>
                        <th className="p-3.5">المبلغ الإجمالي</th>
                        <th className="p-3.5">حالة الطلب</th>
                        <th className="p-3.5 text-center">طباعة الفاتورة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredOrders.map((order) => {
                        const dateObj = new Date(order.createdAt);
                        const timeStr = dateObj.toLocaleTimeString('ar-IQ', {
                          hour: '2-digit',
                          minute: '2-digit',
                        });

                        return (
                          <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                            <td className="p-3.5 font-mono font-bold text-stone-800">
                              {order.orderNumber}
                            </td>
                            <td className="p-3.5 font-bold text-[#7A153E]">
                              طاولة {order.tableNumber}
                            </td>
                            <td className="p-3.5 text-stone-500">{timeStr}</td>
                            <td className="p-3.5 text-stone-700 max-w-xs truncate">
                              {order.items
                                .map((it) => `${it.quantity}x ${it.item.nameAr}`)
                                .join('، ')}
                            </td>
                            <td className="p-3.5 font-black text-stone-900">
                              {order.totalAmount.toLocaleString('ar-IQ')} د.ع
                            </td>
                            <td className="p-3.5">
                              {order.status === 'received' && (
                                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                                  جديد
                                </span>
                              )}
                              {order.status === 'preparing' && (
                                <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold">
                                  قيد التجهيز
                                </span>
                              )}
                              {order.status === 'ready' && (
                                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                                  جاهز للتسليم
                                </span>
                              )}
                              {order.status === 'served' && (
                                <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-[11px] font-bold">
                                  تم التقديم
                                </span>
                              )}
                              {order.rating && (
                                <div className="mt-1 flex items-center gap-1 text-[10px] text-amber-700 font-bold">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                                  <span>خدمة: {order.rating.serviceRating}/5 • أكل: {order.rating.foodRating}/5</span>
                                </div>
                              )}
                            </td>
                            <td className="p-3.5 text-center">
                              <button
                                onClick={() => setSelectedReceiptOrder(order)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7A153E] hover:bg-[#961D4E] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                <span>فاتورة قابلة للطبع</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: QR CODE GENERATOR FOR TABLES (1 - 100) ================= */}
        {activeTab === 'qr_tables' && <TableQrManager />}
      </main>

      {/* ================= MODALS ================= */}

      {/* 1. Image Editor & Delete Modal */}
      <ImageEditorModal
        isOpen={Boolean(editingImageItem)}
        onClose={() => setEditingImageItem(null)}
        title={editingImageItem ? editingImageItem.nameAr : ''}
        currentImageUrl={editingImageItem?.image || ''}
        onSaveImage={handleSaveItemImage}
        onDeleteImage={handleDeleteItemImage}
      />

      {/* 2. Category Editor Modal (Add & Edit & Delete Category) */}
      <CategoryEditorModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categoryToEdit={editingCategory}
        itemsCountInCategory={editingCategory ? categoryItemCounts[editingCategory.id] || 0 : 0}
        onSaveCategory={handleSaveCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      {/* 3. Full Menu Item Editor Modal */}
      <MenuEditorModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        categories={categories}
        itemToEdit={editingMenuItem}
        onSaveItem={handleSaveMenuItem}
        onDeleteItem={handleDeleteMenuItem}
        onSaveCategory={handleSaveCategory}
      />

      {/* 4. Printable Receipt Modal */}
      <PrintableReceiptModal
        order={selectedReceiptOrder}
        isOpen={Boolean(selectedReceiptOrder)}
        onClose={() => setSelectedReceiptOrder(null)}
      />
    </div>
  );
};
