import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Check } from 'lucide-react';

interface TableModalProps {
  isOpen: boolean;
  currentTable: string;
  onClose: () => void;
  onSelectTable: (tableNum: string) => void;
}

const COMMON_TABLES = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '12', '15', '20'];

export const TableModal: React.FC<TableModalProps> = ({
  isOpen,
  currentTable,
  onClose,
  onSelectTable,
}) => {
  const [customTable, setCustomTable] = useState(currentTable);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTable.trim()) {
      onSelectTable(customTable.trim());
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-xs cursor-pointer"
        />

        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          className="relative z-10 w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 text-right"
        >
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#7A153E]/10 text-[#7A153E] flex items-center justify-center">
                <QrCode className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-sm text-stone-900">
                تحديد رقم الطاولة
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-stone-500 leading-relaxed">
            يتم التعرف على رقم الطاولة تلقائياً من رمز الـ QR الملصق على طاولتك. يمكنك تعديل الرقم هنا عند الحاجة:
          </p>

          {/* Quick Table Grid */}
          <div>
            <span className="text-[11px] font-bold text-stone-700 block mb-2">
              طاولات الصالة السريعة:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {COMMON_TABLES.map((tbl) => {
                const isSelected = tbl === currentTable;
                return (
                  <button
                    key={tbl}
                    type="button"
                    onClick={() => {
                      onSelectTable(tbl);
                      onClose();
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#7A153E] text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                    }`}
                  >
                    طاولة {tbl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Table Input */}
          <form onSubmit={handleSubmit} className="pt-2 border-t border-stone-100 space-y-2">
            <label className="block text-[11px] font-bold text-stone-700">
              أو أدخل رقم طاولة آخر:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customTable}
                onChange={(e) => setCustomTable(e.target.value)}
                placeholder="رقم الطاولة"
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#7A153E] text-center font-bold"
              />
              <button
                type="submit"
                className="py-2 px-4 rounded-xl bg-[#7A153E] text-white text-xs font-bold hover:bg-[#911849] transition-colors cursor-pointer"
              >
                حفظ
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
