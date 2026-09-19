import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Phone, Instagram, MessageCircle, ExternalLink, Clock, Sparkles } from 'lucide-react';
import { BRANCHES } from '../data/menuData';
import { BrandLogo } from './BrandLogo';

interface BranchesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BranchesModal: React.FC<BranchesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          className="relative z-10 w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-[#7A153E] to-[#911849] text-white flex items-center justify-between">
            <BrandLogo size="sm" variant="light" />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto space-y-5 text-right">
            <div>
              <h3 className="font-extrabold text-base text-[#2E0B19]">
                فروع مثلجات وحلويات الإيطالي
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                عيش لحظة المذاق الإيطالي الأصيل في فروعنا بمحافظة ذي قار
              </p>
            </div>

            {/* Branches List */}
            <div className="space-y-3">
              {BRANCHES.map((b, idx) => (
                <div
                  key={b.name}
                  className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 hover:border-[#7A153E]/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-[#7A153E]">
                      {b.name}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      مفتوح الآن
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <MapPin className="w-3.5 h-3.5 text-[#7A153E] shrink-0" />
                    <span>{b.address}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-stone-200/60">
                    <a
                      href={`tel:${b.phone}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-800 hover:text-[#7A153E] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span dir="ltr">{b.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/964${b.phone.substring(1)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7A153E] hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>واتساب</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links from PDF Page 12 */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <span className="text-xs font-extrabold text-stone-700 block">
                تواصل معنا وتابع جديدنا:
              </span>
              <div className="flex gap-2">
                <a
                  href="https://instagram.com/ice_italy_n2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200 flex items-center justify-center gap-1.5 text-xs font-bold transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>انستغرام: ice_italy_n2</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-100 bg-stone-50 text-center">
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-[#7A153E] text-white font-bold text-xs hover:bg-[#911849] transition-all cursor-pointer"
            >
              العودة إلى المنيو
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
