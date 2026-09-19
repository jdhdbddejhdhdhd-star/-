import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface NoResultsProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export const NoResults: React.FC<NoResultsProps> = ({ searchQuery, onClearSearch }) => {
  return (
    <div className="py-16 px-4 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-[#7A153E]/10 text-[#7A153E] flex items-center justify-center mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-stone-800 mb-1">
        لا توجد أصناف مطابقة لبحثك "{searchQuery}"
      </h3>
      <p className="text-xs text-stone-500 max-w-xs mb-5">
        تأكد من كتابة الكلمة بشكل صحيح، أو تصفح الأقسام الرئيسية مباشرة
      </p>
      <button
        onClick={onClearSearch}
        className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5 text-[#7A153E]" />
        <span>مسح البحث وعرض كل الأصناف</span>
      </button>
    </div>
  );
};
