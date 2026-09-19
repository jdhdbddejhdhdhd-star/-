import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronLeft, ArrowLeft } from 'lucide-react';

interface FloatingCartBarProps {
  totalCount: number;
  totalAmount: number;
  tableNumber: string;
  onOpenCart: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  totalCount,
  totalAmount,
  tableNumber,
  onOpenCart,
}) => {
  if (totalCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 z-40 max-w-lg mx-auto pb-[env(safe-area-inset-bottom,0px)]"
      >
        <button
          onClick={onOpenCart}
          className="w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-2xl bg-gradient-to-r from-[#7A153E] to-[#911849] text-white shadow-xl shadow-[#7A153E]/35 flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer border border-white/20"
        >
          {/* Left: Total items & Table */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-sm">
              {totalCount}
            </div>
            <div className="text-right">
              <div className="text-xs text-white/80 font-semibold">
                طلب الطاولة {tableNumber}
              </div>
              <div className="text-sm font-black tracking-wide">
                {totalAmount.toLocaleString('ar-IQ')} د.ع
              </div>
            </div>
          </div>

          {/* Right: Action CTA */}
          <div className="flex items-center gap-2 font-bold text-xs bg-white text-[#7A153E] px-3.5 py-2 rounded-xl shadow-xs">
            <span>عرض السلة</span>
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
