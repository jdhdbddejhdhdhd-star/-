import React from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  CheckCircle2,
  Lock,
  UtensilsCrossed,
  ChefHat,
  Sparkles,
  ChevronLeft,
  Bell,
  Check,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface LiveOrderStatusCardProps {
  order: Order | null;
  tableNumber: string;
  onOpenDetails: () => void;
}

const STATUS_STEPS: { key: OrderStatus; label: string; sublabel: string }[] = [
  { key: 'received', label: 'تم الاستلام', sublabel: 'في الكاونتر' },
  { key: 'preparing', label: 'قيد التحضير', sublabel: 'بالمطبخ والبار' },
  { key: 'ready', label: 'جاهز للتقديم', sublabel: 'في طريق الطاولة' },
  { key: 'served', label: 'تم التقديم', sublabel: 'بالعافية' },
];

export const LiveOrderStatusCard: React.FC<LiveOrderStatusCardProps> = ({
  order,
  tableNumber,
  onOpenDetails,
}) => {
  if (!order) {
    return null;
  }

  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);
  const currentStep = STATUS_STEPS[currentIndex] || STATUS_STEPS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-5 bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#7A153E]/20 shadow-[0_6px_20px_rgba(122,21,62,0.07)] text-right relative overflow-hidden"
    >
      {/* Background ambient accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7A153E]/10 via-transparent to-transparent pointer-events-none rounded-bl-full" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <div>
            <h3 className="font-black text-sm sm:text-base text-[#2E0B19]">
              حالة الطلب: <span className="text-[#7A153E]">{currentStep.label}</span>
            </h3>
            <span className="text-[10px] text-stone-400 block font-medium">
              طلب رقم {order.orderNumber} • طاولة {order.tableNumber}
            </span>
          </div>
        </div>

        {/* Read-Only Security Badge (User cannot tamper with it) */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[10px] font-bold shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          <span>حالة رسمية محمية</span>
        </div>
      </div>

      {/* Timeline Steps - Strictly Read-Only */}
      <div className="py-4">
        <div className="relative flex items-center justify-between">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-stone-200 rounded-full z-0" />
          <motion.div
            initial={false}
            animate={{
              width: `${(Math.max(0, currentIndex) / (STATUS_STEPS.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute top-1/2 right-4 -translate-y-1/2 h-1 bg-[#7A153E] rounded-full z-0 origin-right"
          />

          {STATUS_STEPS.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div
                key={step.key}
                className="relative z-10 flex flex-col items-center select-none"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#7A153E] text-white shadow-sm'
                      : isCurrent
                      ? 'bg-white border-2 border-[#7A153E] text-[#7A153E] shadow-md ring-4 ring-[#7A153E]/15'
                      : 'bg-stone-100 border border-stone-300 text-stone-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isCurrent ? (
                    <ChefHat className="w-4 h-4 animate-bounce" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="mt-1.5 text-center">
                  <span
                    className={`block text-[11px] font-bold leading-tight ${
                      isCurrent
                        ? 'text-[#7A153E]'
                        : isCompleted
                        ? 'text-stone-800'
                        : 'text-stone-400'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="hidden sm:block text-[9px] text-stone-400 mt-0.5">
                    {step.sublabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Served & Rating Callout Banner */}
      {order.status === 'served' && (
        <div className="mb-2.5 p-2.5 bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl border border-amber-200 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-stone-800 font-bold">
            <div className="w-7 h-7 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center shrink-0 shadow-xs">
              <Star className="w-4 h-4 fill-stone-900" />
            </div>
            <div>
              <span className="block text-[11px] text-[#7A153E] font-black">
                {order.rating ? '✨ تم تقييم هذا الطلب' : '⭐ قيّم تجربتك ومستوى الخدمة'}
              </span>
              <span className="block text-[10px] text-stone-500 font-normal">
                {order.rating
                  ? `الخدمة: ${order.rating.serviceRating}/5 • الأكل: ${order.rating.foodRating}/5`
                  : 'شاركنا انطباعك لتطوير ضيافتنا'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenDetails}
            className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-[11px] shadow-xs transition-all cursor-pointer shrink-0"
          >
            {order.rating ? 'عرض التقييم' : 'تقييم الآن'}
          </button>
        </div>
      )}

      {/* Notice that this status is strictly counter-controlled and read-only */}
      <div className="bg-[#FAF6F7] rounded-2xl p-2.5 flex items-center justify-between gap-2 border border-[#7A153E]/10">
        <div className="flex items-center gap-1.5 text-[11px] text-[#6A4E58]">
          <Lock className="w-3.5 h-3.5 text-[#7A153E] shrink-0" />
          <span>يتم تحديث الحالة آلياً من كاونتر التحضير • غير قابلة للتعديل</span>
        </div>

        <button
          type="button"
          onClick={onOpenDetails}
          className="flex items-center gap-1 px-3 py-1 rounded-xl bg-[#7A153E] text-white text-[11px] font-bold shadow-xs hover:bg-[#911849] transition-all cursor-pointer shrink-0"
        >
          <span>التفاصيل</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
