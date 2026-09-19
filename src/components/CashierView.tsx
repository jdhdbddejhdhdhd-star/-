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
} from 'lucide-react';
import { Order } from '../types';
import { subscribeToOrders } from '../lib/orderService';
import { TableQrManager } from './TableQrManager';
import { PrintableReceiptModal } from './PrintableReceiptModal';
import { PinLockScreen } from './PinLockScreen';

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

  // Concise options: QR codes for tables as primary default, and Orders/Invoices
  const [activeTab, setActiveTab] = useState<'qr_tables' | 'orders'>('qr_tables');

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  // Real-time Firestore Subscriptions
  useEffect(() => {
    const unsubOrders = subscribeToOrders((updated) => {
      setOrders(updated);
      setIsLoadingOrders(false);
    });

    return () => {
      unsubOrders();
    };
  }, []);

  // Filtered orders for cashier table
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.tableNumber.includes(q) ||
        o.items.some((it) => it.item.nameAr.toLowerCase().includes(q))
      );
    });
  }, [orders, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const todayTotal = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const completedOrders = orders.filter((o) => o.status === 'served').length;
    const activeOrders = orders.filter((o) => o.status !== 'served').length;
    return { todayTotal, completedOrders, activeOrders, totalCount: orders.length };
  }, [orders]);

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

  if (!isUnlocked) {
    return (
      <PinLockScreen
        title="دخول كاونتر الكاشير"
        subtitle="رموز QR للطاولات وفواتير الصالة"
        badge="الكاشير"
        defaultPin="8899"
        icon={CreditCard}
        onUnlock={handleUnlock}
        onBack={onSwitchRole}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F6] text-stone-900 pb-20" dir="rtl">
      {/* Cashier Master Header */}
      <header className="sticky top-0 z-30 bg-[#2D0616] text-white shadow-lg border-b border-rose-950">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-400 text-[#2D0616] flex items-center justify-center font-black shadow-md shrink-0">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black font-serif">كاونتر الكاشير</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-900 text-rose-200 border border-rose-700 font-bold">
                  محمي
                </span>
              </div>
              <p className="text-[11px] text-rose-200/85 line-clamp-1">
                توليد باركودات QR للطاولات ومتابعة الفواتير
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

        {/* Concise Navigation Tabs: 1. QR للطاولات (Primary) | 2. فواتير الصالة */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center gap-2 border-t border-white/10 py-2">
          <button
            onClick={() => setActiveTab('qr_tables')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'qr_tables'
                ? 'bg-amber-400 text-[#2D0616] shadow-sm'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>رموز QR للطاولات (1-100)</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-amber-400 text-[#2D0616] shadow-sm'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>فواتير الصالة والطباعة ({orders.length})</span>
          </button>
        </div>
      </header>

      {/* Cashier Content Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
        {/* ================= TAB 1: QR CODE GENERATOR FOR TABLES (1 - 100) ================= */}
        {activeTab === 'qr_tables' && <TableQrManager />}

        {/* ================= TAB 2: ORDERS & PRINTABLE INVOICES ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Search and Summary Bar */}
            <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
      </main>

      {/* Printable Receipt Modal */}
      <PrintableReceiptModal
        order={selectedReceiptOrder}
        isOpen={Boolean(selectedReceiptOrder)}
        onClose={() => setSelectedReceiptOrder(null)}
      />
    </div>
  );
};
