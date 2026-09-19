import React, { useRef } from 'react';
import { Printer, X, Check, MapPin, Phone, Clock, Receipt } from 'lucide-react';
import { Order } from '../types';

interface PrintableReceiptModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableReceiptModal: React.FC<PrintableReceiptModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs" dir="rtl">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Modal Bar */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-sm">فاتورة حساب الطاولة الرسمية</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الفاتورة</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Thermal Receipt Container */}
        <div className="p-6 overflow-y-auto flex-1 bg-stone-50 flex justify-center">
          <div
            ref={receiptRef}
            id="thermal-receipt"
            className="w-full max-w-[340px] bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-stone-900 font-mono text-xs space-y-4 print:border-0 print:shadow-none print:p-0 print:max-w-none"
          >
            {/* Receipt Header */}
            <div className="text-center space-y-1 border-b border-dashed border-stone-400 pb-4">
              <h2 className="text-lg font-black tracking-tight font-serif text-[#4A0A24]">
                مثلجات وحلويات الإيطالي
              </h2>
              <p className="text-[11px] text-stone-600">فرع الشطرة - شارع الشوملي</p>
              <p className="text-[10px] text-stone-500">هاتف الإدارة والتوصيل: 07813071487</p>
              <div className="text-[11px] font-bold text-stone-800 pt-1">
                *** فاتورة حساب طاولة ***
              </div>
            </div>

            {/* Order Meta */}
            <div className="text-[11px] space-y-1 border-b border-dashed border-stone-300 pb-3">
              <div className="flex justify-between font-black text-sm">
                <span>رقم الطاولة:</span>
                <span className="bg-stone-100 px-2 py-0.5 rounded text-[#4A0A24]">
                  طاولة {order.tableNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span>رقم الفاتورة:</span>
                <span>#{order.orderNumber}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>تاريخ ووقت الطلب:</span>
                <span>{order.createdAt}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>حالة الطلب:</span>
                <span className="text-emerald-700 font-bold">
                  {order.status === 'served' ? 'مكتمل ومسلّم' : 'تم التحضير'}
                </span>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-2 border-b border-dashed border-stone-400 pb-4">
              <div className="grid grid-cols-12 font-bold text-[10px] text-stone-500 border-b border-stone-200 pb-1">
                <span className="col-span-6">الصنف</span>
                <span className="col-span-2 text-center">الكمية</span>
                <span className="col-span-4 text-left">المجموع</span>
              </div>

              {order.items.map((cartItem, idx) => (
                <div key={idx} className="grid grid-cols-12 text-[11px] py-1 items-start">
                  <div className="col-span-6">
                    <span className="font-bold text-stone-900 block leading-tight">
                      {cartItem.item.nameAr}
                    </span>
                    {(cartItem.selectedSize || cartItem.selectedFlavor || cartItem.selectedSauce) && (
                      <span className="text-[9px] text-stone-500 block">
                        {[cartItem.selectedSize?.label, cartItem.selectedFlavor, cartItem.selectedSauce]
                          .filter(Boolean)
                          .join(' • ')}
                      </span>
                    )}
                  </div>
                  <span className="col-span-2 text-center font-bold text-stone-700">
                    {cartItem.quantity}
                  </span>
                  <span className="col-span-4 text-left font-black text-stone-900">
                    {cartItem.totalPrice.toLocaleString('ar-IQ')} د.ع
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs">
                <span>المجموع الفرعي:</span>
                <span>{order.totalAmount.toLocaleString('ar-IQ')} د.ع</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>ضريبة الخدمة:</span>
                <span>0 د.ع (شاملة)</span>
              </div>
              <div className="flex justify-between text-sm font-black border-t-2 border-stone-900 pt-2 text-[#4A0A24]">
                <span>المبلغ الإجمالي المطلوب:</span>
                <span className="text-base">
                  {order.totalAmount.toLocaleString('ar-IQ')} د.ع
                </span>
              </div>
            </div>

            {/* Receipt Footer */}
            <div className="text-center pt-4 border-t border-dashed border-stone-300 space-y-1 text-[10px] text-stone-500">
              <p className="font-bold text-stone-800">شكراً لزيارتكم مثلجات الإيطالي ❤️</p>
              <p>نأمل أن تنال خدماتنا ومنتجاتنا رضاكم دائماً</p>
              <p className="text-[9px]">إنستغرام: @al_italy_icecream</p>
            </div>
          </div>
        </div>

        {/* Printable styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body * {
              visibility: hidden !important;
            }
            #thermal-receipt, #thermal-receipt * {
              visibility: visible !important;
            }
            #thermal-receipt {
              position: fixed !important;
              left: 0 !important;
              top: 0 !important;
              width: 80mm !important;
              max-width: 80mm !important;
              margin: 0 !important;
              padding: 10px !important;
              font-size: 11px !important;
              background: white !important;
              box-shadow: none !important;
              border: none !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}} />
      </div>
    </div>
  );
};
