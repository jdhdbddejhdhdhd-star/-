import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, KeyRound, Check, AlertCircle, ArrowRight, ShieldCheck, LucideIcon } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface PinLockScreenProps {
  title: string;
  subtitle: string;
  badge: string;
  defaultPin: string;
  icon: LucideIcon;
  onUnlock: () => void;
  onBack?: () => void;
}

export const PinLockScreen: React.FC<PinLockScreenProps> = ({
  title,
  subtitle,
  badge,
  defaultPin,
  icon: IconComponent,
  onUnlock,
  onBack,
}) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState<boolean>(false);

  const handleKeyPress = (num: string) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      setError(null);
      if (newPin === defaultPin) {
        setTimeout(onUnlock, 150);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(null);
  };

  const handleClear = () => {
    setPin('');
    setError(null);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin === defaultPin) {
      onUnlock();
    } else {
      setError(`رمز الدخول غير صحيح! (الرمز الافتراضي: ${defaultPin})`);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleQuickUnlock = () => {
    setPin(defaultPin);
    setTimeout(onUnlock, 120);
  };

  // Support physical keyboard
  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key >= '0' && ev.key <= '9') {
        handleKeyPress(ev.key);
      } else if (ev.key === 'Backspace') {
        handleDelete();
      } else if (ev.key === 'Enter') {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, defaultPin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D0616] via-[#4A0A24] to-[#1F030E] text-white flex items-center justify-center p-3 sm:p-4 selection:bg-amber-400 selection:text-stone-900 py-6" dir="rtl">
      <motion.div
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[360px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] p-4 sm:p-6 shadow-2xl space-y-4 sm:space-y-5 text-center my-auto"
      >
        {/* Cafe Brand Logo & Name */}
        <div className="flex flex-col items-center justify-center pb-3 sm:pb-4 border-b border-white/15">
          <BrandLogo variant="light" size="md" className="justify-center" />
          <p className="text-[10px] sm:text-[11px] text-amber-200/90 font-medium mt-1.5">
            مقهى وحلويات الإيطالي • نظام الإدارة ونقاط البيع
          </p>
        </div>

        {/* Role Icon & Title */}
        <div className="space-y-2 sm:space-y-3 pt-0.5">
          <div className="w-11 h-11 sm:w-14 sm:h-14 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-300 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-400/20">
            <IconComponent className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.5]" />
          </div>

          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-amber-300 text-[10px] sm:text-[11px] font-bold mb-1 border border-white/20">
              {badge}
            </span>
            <h1 className="text-base sm:text-xl font-black text-white leading-tight">{title}</h1>
            <p className="text-[11px] sm:text-xs text-rose-100/80 mt-0.5">{subtitle}</p>
          </div>
        </div>

        {/* PIN Dots Display */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-3 py-1" dir="ltr">
            {[0, 1, 2, 3].map((idx) => {
              const isFilled = idx < pin.length;
              return (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-200 ${
                    isFilled
                      ? 'bg-amber-400 scale-125 shadow-md shadow-amber-400/50'
                      : 'border-2 border-white/30 bg-white/10'
                  }`}
                />
              );
            })}
          </div>

          {error && (
            <p className="text-[11px] text-amber-300 font-bold bg-black/30 py-1.5 px-3 rounded-xl border border-amber-300/30 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 max-w-[250px] mx-auto" dir="ltr">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleKeyPress(key)}
              className="w-14 sm:w-16 h-12 sm:h-14 mx-auto rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-lg sm:text-xl font-bold text-white transition-all border border-white/15 flex items-center justify-center cursor-pointer shadow-xs"
            >
              {key}
            </button>
          ))}

          <button
            type="button"
            onClick={handleClear}
            className="w-16 h-14 mx-auto rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 text-xs font-bold text-rose-200 transition-all border border-white/10 flex items-center justify-center cursor-pointer"
          >
            مسح
          </button>

          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            className="w-16 h-14 mx-auto rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-xl font-bold text-white transition-all border border-white/15 flex items-center justify-center cursor-pointer shadow-xs"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="w-16 h-14 mx-auto rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 text-sm font-bold text-rose-200 transition-all border border-white/10 flex items-center justify-center cursor-pointer"
            aria-label="حذف"
          >
            ⌫
          </button>
        </div>

        {/* Quick Helper Button & Back */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <button
            type="button"
            onClick={handleQuickUnlock}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-98 text-stone-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <KeyRound className="w-4 h-4" />
            <span>دخول سريع بالرمز الافتراضي ({defaultPin})</span>
          </button>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-full py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/15"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>العودة للرئيسية / اختيار دور آخر</span>
            </button>
          )}

          <p className="text-[10px] text-white/50">
            🔒 منطقة محمية للموظفين والإدارة فقط لمنع الدخول غير المصرح به
          </p>
        </div>
      </motion.div>
    </div>
  );
};
