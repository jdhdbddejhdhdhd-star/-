import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  IceCream,
  Sparkles,
  Award,
  Grid,
  Layers,
  Disc,
  Coins,
  Cookie,
  Cake,
  Flame,
  Wine,
  CupSoda,
  GlassWater,
  Citrus,
  Apple,
  Coffee,
  FlameKindling,
  Zap,
  Package,
  Snowflake,
  Heart,
  LucideIcon,
} from 'lucide-react';
import { Category } from '../types';

// Map icon names to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  IceCream,
  Sparkles,
  Award,
  Grid,
  Layers,
  Disc,
  Coins,
  Cookie,
  Cake,
  Flame,
  Wine,
  CupSoda,
  GlassWater,
  Citrus,
  Apple,
  Coffee,
  FlameKindling,
  Zap,
  Package,
  Snowflake,
  Heart,
};

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  categoryCounts,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll selected category into view smoothly
  useEffect(() => {
    if (activeBtnRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeBtnRef.current;

      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      // Calculate scroll offset considering RTL
      const offset =
        button.offsetLeft -
        container.offsetLeft -
        container.clientWidth / 2 +
        button.clientWidth / 2;

      container.scrollTo({
        left: offset,
        behavior: 'smooth',
      });
    }
  }, [activeCategoryId]);

  return (
    <div className="sticky top-[86px] sm:top-[96px] z-30 bg-[#FAF6F7]/95 backdrop-blur-md border-b border-[#7A153E]/10 py-2 shadow-xs">
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto px-3 sm:px-4 scrollbar-none no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          const IconComp = ICON_MAP[cat.iconName] || Sparkles;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              ref={isActive ? activeBtnRef : null}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-250 select-none cursor-pointer ${
                isActive
                  ? 'text-white shadow-md shadow-[#7A153E]/25'
                  : 'text-[#5C3241] bg-white/80 border border-[#7A153E]/10 hover:bg-white hover:text-[#7A153E]'
              }`}
            >
              {/* Active sliding pill background */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#7A153E] to-[#911849] rounded-full -z-10"
                />
              )}

              {cat.bannerImage ? (
                <img
                  src={cat.bannerImage}
                  alt={cat.nameAr}
                  referrerPolicy="no-referrer"
                  className={`w-4 h-4 rounded-full object-cover shrink-0 border ${
                    isActive ? 'border-amber-200' : 'border-[#7A153E]/20'
                  }`}
                />
              ) : (
                <IconComp
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-[#FBE4C8]' : 'text-[#7A153E]/70'
                  }`}
                />
              )}

              <span>{cat.nameAr}</span>

              {count > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#7A153E]/10 text-[#7A153E]'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
