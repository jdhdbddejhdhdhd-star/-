import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UtensilsCrossed,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChefHat,
  Bell,
  RefreshCw,
  Search,
  Filter,
  Layers,
  ChevronRight,
  Flame,
  Send,
  MapPin,
  Coffee,
  Check,
  Star,
  Lock,
  Users,
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { subscribeToOrders, updateOrderStatusInFirebase } from '../lib/orderService';
import { BrandLogo } from './BrandLogo';
import { PinLockScreen } from './PinLockScreen';

interface WaiterViewProps {
  onSwitchRole?: () => void;
}

export const WaiterView: React.FC<WaiterViewProps> = ({ onSwitchRole }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('waiter_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<'all' | OrderStatus>('all');
  const [searchTable, setSearchTable] = useState<string>('');
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // Subscribe to real-time orders from Firestore
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToOrders((updatedOrders) => {
      setOrders(updatedOrders);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchFilter = activeFilter === 'all' || order.status === activeFilter;
      const matchTable = !searchTable || order.tableNumber.includes(searchTable.trim()) || order.orderNumber.includes(searchTable.trim());
      return matchFilter && matchTable;
    });
  }, [orders, activeFilter, searchTable]);

  // Counts by status
  const counts = useMemo(() => {
    return {
      all: orders.length,
      received: orders.filter((o) => o.status === 'received').length,
      preparing: orders.filter((o) => o.status === 'preparing').length,
      ready: orders.filter((o) => o.status === 'ready').length,
      served: orders.filter((o) => o.status === 'served').length,
    };
  }, [orders]);

  // Handle advancing status
  const handleAdvanceStatus = async (order: Order) => {
    let nextStatus: OrderStatus = 'received';
    if (order.status === 'received') nextStatus = 'preparing';
    else if (order.status === 'preparing') nextStatus = 'ready';
    else if (order.status === 'ready') nextStatus = 'served';
    else return;

    setUpdatingOrderId(order.id);
    try {
      await updateOrderStatusInFirebase(order.id, nextStatus);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return {
          text: 'جديد / تم الاستلام',
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          nextLabel: 'بدء التجهيز بالمطبخ',
        };
      case 'preparing':
        return {
          text: 'جاري التحضير بالمطبخ',
          bg: 'bg-sky-100 text-sky-800 border-sky-300',
          dot: 'bg-sky-500 animate-pulse',
          nextLabel: 'جاهز للتسليم للصالة',
        };
      case 'ready':
        return {
          text: 'جاهز للتسليم',
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500 animate-ping',
          nextLabel: 'تم التقديم للزبون (اكتمال)',
        };
      case 'served':
        return {
          text: 'مكتمل / تم التقديم',
          bg: 'bg-stone-100 text-stone-600 border-stone-300',
          dot: 'bg-stone-400',
          nextLabel: 'مكتمل',
        };
    }
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    try {
      sessionStorage.setItem('waiter_auth', 'true');
    } catch {}
  };

  const handleLock = () => {
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem('waiter_auth');
    } catch {}
  };

  if (!isUnlocked) {
    return (
      <PinLockScreen
        title="دخول شاشة الويتر"
        subtitle="متابعة وتحديث طلبات الطاولات"
        badge="الويتر"
        defaultPin="2024"
        icon={ChefHat}
        onUnlock={handleUnlock}
        onBack={onSwitchRole}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F2F4] text-stone-900 pb-16" dir="rtl">
      {/* Waiter Top Bar */}
      <header className="sticky top-0 z-30 bg-[#4A0A24] text-white shadow-md border-b border-[#6B1237]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
              <ChefHat className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black tracking-tight font-serif">شاشة الويتر</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-[#4A0A24] font-black">
                  مباشر
                </span>
              </div>
              <p className="text-[11px] text-rose-200 line-clamp-1">متابعة وتحديث طلبات الصالة مباشرة</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSwitchRole && (
              <button
                onClick={onSwitchRole}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#4A0A24] text-xs font-black transition-all cursor-pointer shadow-sm"
                title="تبديل الواجهة"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">الواجهات</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            <button
              onClick={handleLock}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-500/30 text-rose-200 text-xs font-bold transition-all cursor-pointer border border-white/10"
              title="قفل الشاشة"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>قفل</span>
            </button>
          </div>
        </div>

        {/* Filter Pills Header */}
        <div className="max-w-7xl mx-auto px-4 pb-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-amber-400 text-[#4A0A24] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              الكل ({counts.all})
            </button>
            <button
              onClick={() => setActiveFilter('received')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'received'
                  ? 'bg-amber-400 text-[#4A0A24] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              <span>طلبات جديدة ({counts.received})</span>
            </button>
            <button
              onClick={() => setActiveFilter('preparing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'preparing'
                  ? 'bg-sky-400 text-stone-900 shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-sky-300" />
              <span>قيد التجهيز ({counts.preparing})</span>
            </button>
            <button
              onClick={() => setActiveFilter('ready')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'ready'
                  ? 'bg-emerald-400 text-stone-900 shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
              <span>جاهز للتسليم ({counts.ready})</span>
            </button>
            <button
              onClick={() => setActiveFilter('served')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'served'
                  ? 'bg-stone-300 text-stone-900 shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              مكتمل ({counts.served})
            </button>
          </div>

          {/* Quick Table Search */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              value={searchTable}
              onChange={(e) => setSearchTable(e.target.value)}
              placeholder="بحث برقم الطاولة أو الطلب..."
              className="w-full pl-3 pr-8 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-white/50 focus:outline-none focus:bg-white/20"
            />
          </div>
        </div>
      </header>

      {/* Orders Grid / Container */}
      <main className="max-w-7xl mx-auto px-4 pt-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-stone-500 space-y-3">
            <RefreshCw className="w-7 h-7 text-[#7A153E] animate-spin" />
            <p className="text-sm font-bold">جاري تحميل طلبات الصالة من السحابة...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 max-w-md mx-auto my-12 space-y-3 shadow-sm">
            <div className="w-14 h-14 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-2xl">
              🍽️
            </div>
            <h3 className="text-base font-black text-stone-800">لا توجد طلبات في هذا القسم حالياً</h3>
            <p className="text-xs text-stone-500">
              أي طلب جديد يقوم الزبون بإرساله من الطاولة سيظهر هنا فوراً في الوقت الحقيقي.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredOrders.map((order) => {
                const badge = getStatusBadge(order.status);
                const isUpdating = updatingOrderId === order.id;

                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`bg-white rounded-3xl border overflow-hidden shadow-sm flex flex-col justify-between transition-all ${
                      order.status === 'received'
                        ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-amber-500/5'
                        : order.status === 'ready'
                        ? 'border-emerald-400 ring-2 ring-emerald-400/20'
                        : 'border-stone-200'
                    }`}
                  >
                    {/* Card Header: Table + Time + Status */}
                    <div className="p-4 border-b border-stone-100 bg-stone-50/70 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-11 h-11 rounded-2xl bg-[#7A153E] text-white flex flex-col items-center justify-center font-black leading-none shadow-sm">
                          <span className="text-[9px] font-normal opacity-80">طاولة</span>
                          <span className="text-lg">{order.tableNumber}</span>
                        </div>
                        <div>
                          <div className="text-xs font-black text-stone-900">
                            طلب #{order.orderNumber}
                          </div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{order.createdAt}</span>
                          </div>
                        </div>
                      </div>

                      <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${badge.bg}`}>
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                        <span>{badge.text}</span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="p-4 space-y-2.5 flex-1 overflow-y-auto max-h-72">
                      {order.items.map((cartItem, idx) => (
                        <div
                          key={cartItem.cartId || idx}
                          className="flex items-start justify-between text-xs py-1.5 border-b border-stone-100 last:border-0"
                        >
                          <div className="flex items-start gap-2">
                            <span className="inline-block w-5 h-5 rounded-lg bg-stone-100 text-stone-700 font-black text-center leading-5 text-[11px] shrink-0">
                              {cartItem.quantity}×
                            </span>
                            <div>
                              <div className="font-bold text-stone-900 leading-tight">
                                {cartItem.item.nameAr}
                              </div>
                              {/* Addons / options summary */}
                              <div className="text-[10px] text-stone-500 space-x-1 space-x-reverse mt-0.5">
                                {cartItem.selectedSize && (
                                  <span className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-700">
                                    {cartItem.selectedSize.label}
                                  </span>
                                )}
                                {cartItem.selectedFlavor && (
                                  <span className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-700">
                                    {cartItem.selectedFlavor}
                                  </span>
                                )}
                                {cartItem.selectedSauce && (
                                  <span className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-700">
                                    {cartItem.selectedSauce}
                                  </span>
                                )}
                              </div>
                              {cartItem.notes && (
                                <p className="text-[10px] text-amber-700 bg-amber-50 rounded px-1.5 py-0.5 mt-1">
                                  ملاحظة: {cartItem.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          <span className="font-black text-stone-800 shrink-0 mr-2">
                            {cartItem.totalPrice.toLocaleString('ar-IQ')} د.ع
                          </span>
                        </div>
                      ))}

                      {order.notes && (
                        <div className="mt-2 p-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                          <strong>ملاحظات الطاولة:</strong> {order.notes}
                        </div>
                      )}

                      {/* Customer Live Rating */}
                      {order.rating && (
                        <div className="mt-2 p-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-300 text-xs space-y-1">
                          <div className="flex items-center justify-between font-black text-amber-900">
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                              <span>تقييم الزبون:</span>
                            </span>
                            <span className="text-[11px] bg-white px-2 py-0.5 rounded-md border border-amber-200">
                              خدمة: {order.rating.serviceRating}/5 • طعام: {order.rating.foodRating}/5
                            </span>
                          </div>
                          {order.rating.tags && order.rating.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {order.rating.tags.map((t) => (
                                <span key={t} className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                          {order.rating.comment && (
                            <p className="text-[10px] text-stone-700 italic pt-0.5">
                              "{order.rating.comment}"
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Total & Status Action Button */}
                    <div className="p-4 bg-stone-50/50 border-t border-stone-100 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-500 font-medium">المجموع الكلي:</span>
                        <span className="text-base font-black text-[#7A153E]">
                          {order.totalAmount.toLocaleString('ar-IQ')} د.ع
                        </span>
                      </div>

                      {/* Advance Status Button */}
                      {order.status !== 'served' ? (
                        <button
                          onClick={() => handleAdvanceStatus(order)}
                          disabled={isUpdating}
                          className={`w-full py-2.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-sm ${
                            order.status === 'received'
                              ? 'bg-amber-400 hover:bg-amber-500 text-stone-900'
                              : order.status === 'preparing'
                              ? 'bg-sky-500 hover:bg-sky-600 text-white'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          {isUpdating ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>تحديث إلى: {badge.nextLabel}</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="text-center py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5">
                          <Check className="w-4 h-4" />
                          <span>الطلب مكتمل وتم إرساله للكاشير للفاتورة</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};
