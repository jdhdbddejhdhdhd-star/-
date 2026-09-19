import React, { useState } from 'react';
import { ShieldAlert, QrCode, ArrowRight, Lock, KeyRound } from 'lucide-react';
import { generateTableToken } from '../lib/tableQr';

interface AccessDeniedScreenProps {
  onUnlockWithCode: (tableNumber: string, token: string) => void;
}

export const AccessDeniedScreen: React.FC<AccessDeniedScreenProps> = ({ onUnlockWithCode }) => {
  const [manualTable, setManualTable] = useState<string>('');
  const [manualToken, setManualToken] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tNum = parseInt(manualTable, 10);
    if (isNaN(tNum) || tNum < 1 || tNum > 100) {
      setErrorMsg('يرجى إدخال رقم طاولة صحيح بين 1 و 100');
      return;
    }
    const expected = generateTableToken(tNum);
    if (manualToken.trim().toUpperCase() !== expected.toUpperCase()) {
      setErrorMsg('رمز أمان الطاولة غير صحيح! اطلب المساعدة من الكاشير أو امسح الرمز من الطاولة.');
      return;
    }
    onUnlockWithCode(manualTable, manualToken.trim().toUpperCase());
  };

  return (
    <div className="min-h-screen bg-[#2D0616] text-white flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-300 border border-rose-500/30 mx-auto flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black font-serif text-white">
            الدخول مخصص عبر رمز QR فقط
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed">
            أهلاً بكم في مثلجات وحلويات الإيطالي. للطلب والاستمتاع بتجربتنا، يرجى مسح ملصق رمز QR الموجود على طاولتكم بواسطة كاميرا الهاتف.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-xs text-rose-100 flex items-center gap-3 text-right">
          <QrCode className="w-8 h-8 text-amber-300 shrink-0" />
          <span>
            كل طاولة من 1 إلى 100 مزودة برمز مشفر خاص يتيح إرسال الطلبات إلى الويتر والكاشير مباشرة.
          </span>
        </div>

        {/* Manual Table Code Entry (Emergency fallback for customer or waiter assistance) */}
        <div className="border-t border-white/10 pt-4 text-right">
          <details className="group">
            <summary className="text-xs text-amber-300 font-bold cursor-pointer hover:underline flex items-center justify-between">
              <span>هل مسح الكاميرا لا يعمل معك؟ أدخل كود الطاولة يدوياً</span>
              <KeyRound className="w-3.5 h-3.5" />
            </summary>
            <form onSubmit={handleManualSubmit} className="mt-3 space-y-3 bg-black/20 p-3.5 rounded-2xl">
              <div>
                <label className="block text-[11px] text-stone-300 mb-1">رقم الطاولة (1 - 100):</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={manualTable}
                  onChange={(e) => setManualTable(e.target.value)}
                  placeholder="مثال: 5"
                  className="w-full px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-300 mb-1">كود أمان الطاولة المطبوع أسفل QR:</label>
                <input
                  type="text"
                  required
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  placeholder="مثال: TAB5-XXXXXX"
                  className="w-full px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300 uppercase font-mono"
                />
              </div>

              {errorMsg && <p className="text-[11px] text-rose-400 font-bold">{errorMsg}</p>}

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#2D0616] font-black text-xs transition-all cursor-pointer"
              >
                تأكيد ودخول المنيو
              </button>
            </form>
          </details>
        </div>
      </div>
    </div>
  );
};
