import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Check, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { DEFAULT_FALLBACK_IMAGE } from './SafeImage';

interface ProductCardProps {
  item: MenuItem;
  index: number;
  onOpenDetails: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  quantityInCart?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  index,
  onOpenDetails,
  onQuickAdd,
  quantityInCart = 0,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Safe pricing with optional chaining
  const safePrice = typeof item?.price === 'number' && Number.isFinite(item.price) ? item.price : 0;
  const safeName = item?.nameAr || 'صنف المنيو';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    // If item has selectable sizes, flavors, or options, open details modal instead
    if (
      (item?.sizes && item.sizes.length > 0) ||
      (item?.flavors && item.flavors.length > 0) ||
      (item?.options && item.options.length > 0)
    ) {
      onOpenDetails(item);
      return;
    }

    onQuickAdd(item);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const hasCustomizations = Boolean(
    (item?.sizes && item.sizes.length > 0) ||
    (item?.flavors && item.flavors.length > 0) ||
    (item?.options && item.options.length > 0)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.38,
        delay: Math.min(index * 0.04, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => onOpenDetails(item)}
      className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#7A153E]/10 shadow-[0_3px_12px_rgba(122,21,62,0.04)] hover:shadow-[0_8px_24px_rgba(122,21,62,0.1)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {/* Shimmer skeleton while loading */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 animate-pulse z-0" />
        )}

        <img
          src={imageError || !item?.image ? DEFAULT_FALLBACK_IMAGE : item.image}
          alt={safeName}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
          className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70 group-hover:opacity-60 transition-opacity pointer-events-none" />

        {/* Badge */}
        {item?.badge && (
          <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#7A153E] text-white shadow-sm shadow-black/20 border border-white/20">
              <Sparkles className="w-2.5 h-2.5 text-[#FBE4C8]" />
              <span>{item.badge}</span>
            </span>
          </div>
        )}

        {/* In Cart Indicator */}
        {quantityInCart > 0 && (
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-600 text-white text-[10px] sm:text-xs font-black flex items-center justify-center shadow-md border border-white">
              {quantityInCart}
            </span>
          </div>
        )}

        {/* Order Name & Price Embedded Directly On The Image */}
        <div className="absolute bottom-0 inset-x-0 p-2 sm:p-2.5 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-6 sm:pt-8">
          <div className="flex items-end justify-between gap-1 sm:gap-1.5">
            <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-md border border-white/25 text-white font-black text-[10px] sm:text-xs shadow-md line-clamp-1 flex items-center gap-1 sm:gap-1.5 max-w-[65%]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0A96D] shrink-0 animate-pulse" />
              <span className="truncate">{safeName}</span>
            </div>
            <span className="shrink-0 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg sm:rounded-xl bg-[#7A153E] text-white text-[9px] sm:text-[11px] font-black border border-white/25 shadow-md">
              {item?.sizes && item.sizes.length > 0 ? (
                <span>يبدأ {safePrice.toLocaleString('ar-IQ')}</span>
              ) : (
                <span>{safePrice.toLocaleString('ar-IQ')} د.ع</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-2.5 sm:p-3.5 flex flex-col flex-1 justify-between gap-2">
        <div>
          <h3 className="font-bold text-xs sm:text-sm md:text-base text-[#2E0B19] group-hover:text-[#7A153E] transition-colors leading-snug line-clamp-1">
            {safeName}
          </h3>

          {item?.description && (
            <p className="text-[11px] sm:text-[12px] text-[#6A4E58] line-clamp-2 mt-0.5 sm:mt-1 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Action Button & Pricing Row */}
        <div className="flex items-center justify-between pt-1 border-t border-[#7A153E]/5 mt-auto">
          <div className="text-[10px] sm:text-[11px] text-[#9A6273] font-medium">
            {hasCustomizations ? 'خيارات مخصصة' : 'طلب سريع'}
          </div>

          <button
            onClick={handleQuickAdd}
            className={`relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-250 active:scale-95 cursor-pointer ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-sm'
                : hasCustomizations
                ? 'bg-[#7A153E]/10 text-[#7A153E] hover:bg-[#7A153E] hover:text-white'
                : 'bg-[#7A153E] text-white hover:bg-[#911849] shadow-sm shadow-[#7A153E]/20'
            }`}
            title={hasCustomizations ? 'تخصيص الطلب' : 'إضافة إلى السلة'}
          >
            {isAdded ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1 text-[11px]"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>تمت الإضافة</span>
              </motion.div>
            ) : hasCustomizations ? (
              <span className="text-[11px]">اختيار</span>
            ) : (
              <div className="flex items-center gap-1 text-[11px]">
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>إضافة</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
