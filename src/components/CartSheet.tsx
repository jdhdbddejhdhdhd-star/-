import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  QrCode,
  FileText,
} from 'lucide-react';
import { CartItem } from '../types';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  tableNumber: string;
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onCheckout: () => void;
  onBrowseMenu: () => void;
}

export const CartSheet: React.FC<CartSheetProps> = ({
  isOpen,
  onClose,
  items,
  tableNumber,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onBrowseMenu,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
        />

        {/* Slide-up Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg max-h-[90vh] bg-white rounded-t-[28px] sm:rounded-t-[32px] overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Top Sheet Drag Indicator */}
          <div className="pt-3 pb-1 flex justify-center">
            <div className="w-12 h-1.5 rounded-full bg-stone-300" />
          </div>

          {/* Header */}
          <div className="px-4 sm:px-5 py-3 border-b border-[#7A153E]/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#7A153E]/10 flex items-center justify-center text-[#7A153E]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#2E0B19]">
                  سلة الطلبات ({totalCount})
                </h3>
                <div className="flex items-center gap-1 text-[11px] text-[#7A153E] font-bold">
                  <QrCode className="w-3 h-3" />
                  <span>طاولة رقم {tableNumber}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="إغلاق السلة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
            {items.length === 0 ? (
              // Empty Cart View
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#7A153E]/5 flex items-center justify-center mb-4 text-[#7A153E]">
                  <ShoppingBag className="w-10 h-10 opacity-70" />
                </div>
                <h4 className="text-lg font-bold text-stone-800 mb-1">
                  سلة طلباتك فارغة
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mb-6 leading-relaxed">
                  تصفح أصناف الحلويات والآيس كريم والمشروبات الإيطالية الفاخرة وأضف ما تشتهي إلى سلتك
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onBrowseMenu();
                  }}
                  className="py-3 px-6 rounded-2xl bg-[#7A153E] text-white font-bold text-xs shadow-md shadow-[#7A153E]/20 hover:bg-[#911849] active:scale-95 transition-all cursor-pointer"
                >
                  تصفح المنيو الآن
                </button>
              </div>
            ) : (
              // List of Cart Items
              <div className="space-y-3.5">
                {items.map((cartItem, idx) => (
                  <motion.div
                    key={cartItem.cartId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/80 flex items-center gap-3"
                  >
                    {/* Item Thumbnail with embedded order name */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.nameAr}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-xs text-[8px] text-white font-bold px-1 py-0.5 text-center truncate">
                        {cartItem.item.nameAr}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                        {cartItem.item.nameAr}
                      </h4>

                      {/* Customization pills */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cartItem.selectedSize && (
                          <span className="text-[10px] font-semibold bg-[#7A153E]/10 text-[#7A153E] px-2 py-0.5 rounded-md">
                            {cartItem.selectedSize.label}
                          </span>
                        )}
                        {cartItem.selectedFlavor && (
                          <span className="text-[10px] font-semibold bg-stone-200 text-stone-700 px-2 py-0.5 rounded-md">
                            {cartItem.selectedFlavor}
                          </span>
                        )}
                      </div>

                      {cartItem.notes && (
                        <p className="text-[10px] text-stone-500 italic mt-0.5 truncate">
                          ملاحظة: {cartItem.notes}
                        </p>
                      )}

                      <div className="text-xs font-black text-[#7A153E] mt-1">
                        {cartItem.totalPrice.toLocaleString('ar-IQ')} د.ع
                      </div>
                    </div>

                    {/* Quantity controls & delete */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => onRemoveItem(cartItem.cartId)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        title="حذف من السلة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-xl px-1.5 py-0.5 shadow-2xs">
                        <button
                          onClick={() =>
                            onUpdateQuantity(cartItem.cartId, cartItem.quantity - 1)
                          }
                          className="w-5 h-5 rounded-md flex items-center justify-center text-stone-600 hover:bg-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-black text-stone-800">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(cartItem.cartId, cartItem.quantity + 1)
                          }
                          className="w-5 h-5 rounded-md flex items-center justify-center text-stone-600 hover:bg-stone-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#7A153E]/10 bg-white space-y-3 pb-[max(1.25rem,env(safe-area-inset-bottom,16px))]">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>مجموع الطلبات</span>
                  <span className="font-bold text-stone-900">
                    {totalAmount.toLocaleString('ar-IQ')} د.ع
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>خدمة الصالة والتقديم</span>
                  <span className="font-bold text-emerald-600">مجاناً</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-stone-100 text-sm font-black text-[#2E0B19]">
                  <span>المبلغ الإجمالي</span>
                  <span className="text-base text-[#7A153E]">
                    {totalAmount.toLocaleString('ar-IQ')} د.ع
                  </span>
                </div>
              </div>

              {/* QR Verification Reminder Banner */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-2.5 flex items-center gap-2 text-right">
                <div className="w-7 h-7 rounded-xl bg-amber-400/20 text-[#7A153E] flex items-center justify-center shrink-0">
                  <QrCode className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-amber-950 font-semibold leading-tight">
                  خطوة التأكيد الأخيرة: مسح ملصق QR على طاولة <strong>{tableNumber}</strong> للتحقق من وجودك في الصالة.
                </p>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#7A153E] to-[#911849] text-white font-bold text-sm shadow-lg shadow-[#7A153E]/25 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-amber-300" />
                  <span>مسح QR الطاولة وإرسال الطلب</span>
                </div>
                <span className="text-xs bg-white/20 px-2.5 py-1 rounded-xl">
                  {totalAmount.toLocaleString('ar-IQ')} د.ع
                </span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
