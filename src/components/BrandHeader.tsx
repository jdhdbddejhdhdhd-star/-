import React from 'react';
import { motion } from 'motion/react';
import { QrCode, Search, ShoppingBag, MapPin, Sparkles, X, Home, UtensilsCrossed } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface BrandHeaderProps {
  tableNumber: string;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenBranches: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
  onResetToTop?: () => void;
  currentView?: 'home' | 'menu';
  onSelectView?: (view: 'home' | 'menu') => void;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  tableNumber,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenBranches,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  onToggleSearch,
  onResetToTop,
  currentView = 'home',
  onSelectView,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F7]/95 backdrop-blur-md border-b border-[#7A153E]/10 transition-all pt-[env(safe-area-inset-top,0px)]">
      {/* Top row with Logo, Segmented View Switcher, and Primary Actions */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Brand Logo - clicking returns to home */}
        <button
          onClick={() => {
            if (onSelectView) onSelectView('home');
            if (onResetToTop) onResetToTop();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 sm:gap-3 text-right cursor-pointer shrink-0"
        >
          <BrandLogo size="md" />
        </button>

        {/* View Switcher Segmented Control */}
        {onSelectView && (
          <div className="flex items-center p-1 rounded-2xl bg-stone-200/80 border border-stone-300/40 text-[11px] sm:text-xs font-black shadow-inner">
            <button
              onClick={() => {
                onSelectView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'bg-[#7A153E] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Home className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>الرئيسية</span>
            </button>
            <button
              onClick={() => {
                onSelectView('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl transition-all cursor-pointer ${
                currentView === 'menu'
                  ? 'bg-[#7A153E] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <UtensilsCrossed className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>المنيو</span>
            </button>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Table Indicator Badge (Locked to table, non-editable by customer) */}
          <div
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl sm:rounded-full bg-[#7A153E]/10 border border-[#7A153E]/20 text-[#7A153E] text-[11px] sm:text-xs font-black select-none shrink-0"
            title={`طاولة رقم ${tableNumber} - مثبتة بالصالة`}
          >
            <QrCode className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7A153E]" />
            <span className="hidden xs:inline">طاولة</span>
            <span>{tableNumber}</span>
          </div>

          {/* Branches info button */}
          <button
            onClick={onOpenBranches}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="معلومات الفروع والتوصيل"
            aria-label="الفروع"
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7A153E]" />
          </button>

          {/* Search Toggle */}
          <button
            onClick={() => {
              if (!isSearchOpen && onSelectView) {
                // When opening search, automatically navigate to menu view to see matches
                onSelectView('menu');
              }
              onToggleSearch();
            }}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-full border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
              isSearchOpen
                ? 'bg-[#7A153E] text-white border-[#7A153E]'
                : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700'
            }`}
            title="البحث في المنيو"
            aria-label="البحث"
          >
            {isSearchOpen ? (
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>

          {/* Cart Icon Button with Counter Animation */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl sm:rounded-2xl bg-[#7A153E] hover:bg-[#911849] text-white text-xs font-bold shadow-md shadow-[#7A153E]/25 transition-all active:scale-95 cursor-pointer shrink-0"
            aria-label="سلة الطلبات"
          >
            <motion.div
              key={cartCount}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.div>

            {cartCount > 0 && (
              <motion.span
                key={`badge-${cartCount}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white text-[#7A153E] px-1.5 py-0.2 rounded-full text-[10px] sm:text-[11px] font-black"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {isSearchOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden border-t border-[#7A153E]/10 bg-white px-4 py-2.5"
        >
          <div className="max-w-4xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن جيلاتو، كريب، موهيتو، كنافة، قهوة، بان كيك..."
              autoFocus
              className="w-full py-2.5 pr-10 pl-9 text-xs sm:text-sm rounded-xl bg-stone-100 border border-stone-200 focus:outline-none focus:border-[#7A153E] focus:bg-white text-stone-900 placeholder-stone-400 transition-colors"
            />
            <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};
