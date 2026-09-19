import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Users,
  ChefHat,
  CreditCard,
  ShoppingBag,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  QrCode,
  CheckCircle2,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export type UserRole = 'customer' | 'waiter' | 'cashier';

interface RolePortalModalProps {
  isOpen: boolean;
  currentRole: UserRole;
  onClose: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const RolePortalModal: React.FC<RolePortalModalProps> = ({
  isOpen,
  currentRole,
  onClose,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" dir="rtl">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 16 }}
          className="relative z-10 w-full max-w-lg max-h-[92vh] bg-white rounded-t-[28px] sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col"
        >
          {/* Header Banner with Cafe Logo & Name */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2D0616] via-[#4A0A24] to-[#7A153E] text-white shrink-0">
            <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
              <BrandLogo variant="light" size="sm" />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 pt-2.5 sm:pt-3 border-t border-white/15">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shadow-md shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-lg text-white font-serif">
                  بوابة الدخول واختيار الواجهة
                </h3>
                <p className="text-[11px] sm:text-xs text-rose-100 font-medium">
                  اختر الحساب المطلوب للمتابعة: زبون الصالة، طاقم الويتر، أو كاونتر الكاشير
                </p>
              </div>
            </div>
          </div>

          {/* Roles Selection Cards */}
          <div className="p-3.5 sm:p-6 space-y-3 bg-stone-50/50 overflow-y-auto flex-1 overscroll-contain">
            {/* 1. Customer Option */}
            <div
              onClick={() => {
                onSelectRole('customer');
                onClose();
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-right flex items-start gap-3.5 group hover:shadow-md ${
                currentRole === 'customer'
                  ? 'bg-amber-50/60 border-amber-400/80 shadow-xs ring-2 ring-amber-300/40'
                  : 'bg-white border-stone-200 hover:border-amber-300'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-stone-950 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-stone-900 text-sm sm:text-base">
                      واجهة الزبون (المنيو والطلب)
                    </h4>
                    {currentRole === 'customer' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        الواجهة الحالية
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold">
                    دخول حر
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  تصفح أصناف المنيو الفاخر وإرسال الطلبات مباشرة للطاولة.
                </p>
              </div>
            </div>

            {/* 2. Waiter Option */}
            <div
              onClick={() => {
                onSelectRole('waiter');
                onClose();
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-right flex items-start gap-3.5 group hover:shadow-md ${
                currentRole === 'waiter'
                  ? 'bg-rose-50/60 border-rose-400/80 shadow-xs ring-2 ring-rose-300/40'
                  : 'bg-white border-stone-200 hover:border-[#7A153E]/40'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7A153E] to-[#9B1D52] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <ChefHat className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-stone-900 text-sm sm:text-base">
                      واجهة الويتر
                    </h4>
                    {currentRole === 'waiter' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        الواجهة الحالية
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-100 text-[#7A153E] font-bold flex items-center gap-1 border border-rose-200">
                    <Lock className="w-3 h-3" />
                    رمز: 2024
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  متابعة وتحديث حالات طلبات الطاولات مباشرة.
                </p>
              </div>
            </div>

            {/* 3. Cashier Option */}
            <div
              onClick={() => {
                onSelectRole('cashier');
                onClose();
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-right flex items-start gap-3.5 group hover:shadow-md ${
                currentRole === 'cashier'
                  ? 'bg-amber-50/60 border-amber-400/80 shadow-xs ring-2 ring-amber-300/40'
                  : 'bg-white border-stone-200 hover:border-amber-400/60'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2D0616] to-[#4A0A24] text-amber-300 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-stone-900 text-sm sm:text-base">
                      واجهة الكاشير
                    </h4>
                    {currentRole === 'cashier' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        الواجهة الحالية
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center gap-1 border border-amber-200">
                    <Lock className="w-3 h-3" />
                    رمز: 8899
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  رموز QR للطاولات (1-100) وإصدار فواتير الصالة.
                </p>
              </div>
            </div>
          </div>

          {/* Security & Database Status Footer */}
          <div className="p-3.5 sm:p-4 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-xs pb-[max(1rem,env(safe-area-inset-bottom,16px))] shrink-0">
            <div className="flex items-center gap-2 text-stone-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>نظام سحابي متزامن ومحمي مع Google Firestore</span>
            </div>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold transition-colors cursor-pointer text-center"
            >
              متابعة في الواجهة الحالية
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
