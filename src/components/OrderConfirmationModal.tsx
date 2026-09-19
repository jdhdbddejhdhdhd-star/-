import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2, Sparkles, QrCode, Clock, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order } from '../types';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  order: Order | null;
  onTrackOrder: () => void;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  order,
  onTrackOrder,
  onClose,
}) => {
  const [stage, setStage] = useState<'processing' | 'confirmed'>('processing');

  useEffect(() => {
    if (isOpen) {
      setStage('processing');
      // Smooth processing state (1100ms) then reveal confirmed state
      const timer = setTimeout(() => {
        setStage('confirmed');
        // Confetti burst
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#7A153E', '#E0A96D', '#22C55E', '#FAF6F7'],
        });
      }, 1100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-center overflow-hidden border border-[#7A153E]/15"
        >
          {stage === 'processing' ? (
            /* 1. Processing Stage */
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#7A153E]/10 flex items-center justify-center text-[#7A153E] animate-pulse">
                  <Loader2 className="w-8 h-8 animate-spin text-[#7A153E]" />
                </div>
              </div>
              <h3 className="text-base font-bold text-stone-800">
                جاري إرسال طلبك للكاونتر...
              </h3>
              <p className="text-xs text-stone-500">
                يرجى الانتظار لحظات لتأكيد الاتصال بطاولة رقم {order.tableNumber}
              </p>
            </div>
          ) : (
            /* 2. Confirmed Success Stage */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-5"
            >
              {/* Success Badge */}
              <div className="w-18 h-18 mx-auto rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-xl font-black text-[#2E0B19]">
                  تم إرسال طلبك بنجاح!
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  شكراً لزيارتك مثلجات الإيطالي، طلبك الآن في مرحلة التحضير
                </p>
              </div>

              {/* Order Info Card */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2.5 text-right text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">رقم الطلب:</span>
                  <span className="font-extrabold text-[#7A153E] text-sm tracking-wider">
                    {order.orderNumber}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-stone-500">الطاولة:</span>
                  <span className="font-bold text-stone-800 bg-[#7A153E]/10 text-[#7A153E] px-2.5 py-0.5 rounded-md">
                    الطاولة {order.tableNumber}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-stone-500">المجموع المطلوب:</span>
                  <span className="font-bold text-stone-900">
                    {order.totalAmount.toLocaleString('ar-IQ')} د.ع
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-stone-500">الوقت المتوقع للتحضير:</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>8 - 12 دقيقة</span>
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={onTrackOrder}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#7A153E] text-white font-bold text-xs shadow-md shadow-[#7A153E]/20 hover:bg-[#911849] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>متابعة حالة الطلب المباشرة</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl text-stone-500 hover:text-stone-800 font-semibold text-xs transition-colors cursor-pointer"
                >
                  الرجوع للمنيو
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
