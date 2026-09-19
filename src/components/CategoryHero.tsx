import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Dices, RefreshCw } from 'lucide-react';
import { Category } from '../types';

interface CategoryHeroProps {
  category: Category;
  itemCount: number;
  onShuffle?: () => void;
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({ category, itemCount, onShuffle }) => {
  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative rounded-3xl overflow-hidden mb-5 bg-gradient-to-r from-[#4E0A24] via-[#7A153E] to-[#610E30] text-white p-5 sm:p-6 shadow-md shadow-[#7A153E]/10"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/30 pointer-events-none" />

      {category.bannerImage && (
        <div className="absolute -left-4 -bottom-6 w-36 h-36 rounded-full overflow-hidden opacity-20 pointer-events-none blur-xs">
          <img
            src={category.bannerImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="relative z-10 text-right flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-xs text-[#FBE4C8] font-bold mb-2">
            <Sparkles className="w-3 h-3 text-[#E0A96D]" />
            <span>مثلجات الإيطالي</span>
            <span>•</span>
            <span>{itemCount} صنف معروض</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1">
            {category.nameAr}
          </h1>

          {category.description && (
            <p className="text-white/80 text-xs sm:text-sm max-w-md font-medium leading-relaxed">
              {category.description}
            </p>
          )}
        </div>

        {category.id === 'favorites' && onShuffle && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onShuffle}
            type="button"
            className="self-start sm:self-center flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Dices className="w-4 h-4 text-[#FBE4C8]" />
            <span>تحديث الطلبات العشوائية</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
