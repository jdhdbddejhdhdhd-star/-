import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  UtensilsCrossed,
  Flame,
  Star,
  Award,
  ChevronLeft,
  Clock,
  Heart,
  Phone,
  MapPin,
  Coffee,
  IceCream,
  Layers,
  ArrowLeft,
  ShoppingBag,
  Info,
} from 'lucide-react';
import { MenuItem, Category, Order } from '../types';
import { CATEGORIES, MENU_ITEMS, BRANCHES } from '../data/menuData';
import { DEFAULT_FALLBACK_IMAGE } from './SafeImage';

interface HomeScreenProps {
  tableNumber: string;
  onNavigateToMenu: (categoryId?: string) => void;
  onSelectProduct: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onOpenBranches: () => void;
  currentOrder: Order | null;
  onOpenOrderStatus: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  tableNumber,
  onNavigateToMenu,
  onSelectProduct,
  onQuickAdd,
  onOpenBranches,
  currentOrder,
  onOpenOrderStatus,
}) => {
  // Select authentic signature items for featured display
  const signatureItems = React.useMemo(() => {
    // Specific high-interest items: Crepe with cocoa, Eastern Kunafa, Special Dubai cake, Italian Gelato
    const ids = ['cr-2', 'sw-4', 'sw-1', 'sc-7', 'wf-3', 'sw-5', 'cr-1', 'sc-1'];
    return ids
      .map((id) => MENU_ITEMS.find((item) => item.id === id))
      .filter((item): item is MenuItem => item !== undefined);
  }, []);

  // Eastern sweets spotlight items
  const easternSweets = React.useMemo(() => {
    return MENU_ITEMS.filter((item) => item.categoryId === 'sweets').slice(0, 4);
  }, []);

  // Crepes spotlight items
  const crepeSpotlights = React.useMemo(() => {
    // Highlight cocoa crepe (cr-2), Italian crepe (cr-1), and lotus (cr-5)
    return MENU_ITEMS.filter((item) => ['cr-2', 'cr-1', 'cr-8', 'cr-11'].includes(item.id));
  }, []);

  return (
    <div className="space-y-6 pb-8" dir="rtl">
      {/* 1. Luxury Welcome Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4A0A24] via-[#6B1237] to-[#8C1B4A] text-white p-5 sm:p-7 shadow-xl shadow-stone-900/10 border border-[#9A2254]/30"
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-rose-100 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>أهلاً بكم في مثلجات الإيطالي</span>
              <span className="inline-block w-1 h-1 rounded-full bg-white/40" />
              <span className="font-black text-amber-300">
                طاولة {tableNumber}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white drop-shadow-sm font-serif">
              طعمٌ إيطالي أصيل..
              <br />
              <span className="text-amber-200">ولمسات شرقية فاخرة</span>
            </h1>

            <p className="text-xs sm:text-sm text-rose-100/90 max-w-md leading-relaxed">
              تذوّق أشهى المثلجات والحلويات الساخنة، والكريب الغني بالكاكاو، والوافل البلجيكي مع أجود أنواع القشطة والفستق الحلبي.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto pt-2 sm:pt-0">
            <button
              onClick={() => onNavigateToMenu('favorites')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#4A0A24] font-black text-sm px-5 py-3 rounded-2xl shadow-lg shadow-amber-400/20 active:scale-95 transition-all"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>تصفح المنيو الكامل</span>
            </button>

            <button
              onClick={() => onNavigateToMenu('favorites')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-4 py-3 rounded-2xl border border-white/20 backdrop-blur-sm active:scale-95 transition-all"
            >
              <Star className="w-4 h-4 text-amber-300" />
              <span>الطلبات المفضلة</span>
            </button>
          </div>
        </div>

        {/* Highlight features pill strip */}
        <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs text-rose-100/90 font-medium">
          <div className="flex items-center justify-center gap-1.5 py-1">
            <span className="text-amber-300 font-bold">✓</span>
            <span>تحضير فوري طازج</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1 border-x border-white/10">
            <span className="text-amber-300 font-bold">✓</span>
            <span>كاكاو بلجيكي نقي</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1">
            <span className="text-amber-300 font-bold">✓</span>
            <span>فستق حلبي طبيعي</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Visual Categories Navigation Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 rounded-full bg-[#7A153E]" />
            <h2 className="text-lg font-black text-stone-900 tracking-tight">
              أقسام المنيو الرئيسية
            </h2>
          </div>
          <button
            onClick={() => onNavigateToMenu('favorites')}
            className="text-xs font-bold text-[#7A153E] hover:underline flex items-center gap-1"
          >
            <span>عرض كل الأقسام</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {CATEGORIES.slice(0, 10).map((category) => (
            <motion.button
              key={category.id}
              onClick={() => onNavigateToMenu(category.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden rounded-2xl bg-stone-900 border border-stone-200/80 text-right shadow-sm hover:shadow-lg hover:border-[#7A153E] transition-all group flex flex-col justify-end h-36 p-3.5 cursor-pointer"
            >
              {/* Category Image with smooth zoom on hover */}
              <img
                src={category?.bannerImage || 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80'}
                alt={category?.nameAr || 'قسم'}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = DEFAULT_FALLBACK_IMAGE;
                }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out brightness-90"
              />
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* Category Badge */}
              <div className="relative z-10 flex items-center justify-between w-full mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-amber-200 border border-white/20">
                  {category?.id === 'favorites' ? '⭐ مميز' : 'قسم رئيسي'}
                </span>
              </div>

              {/* Text info */}
              <div className="relative z-10">
                <h3 className="text-sm sm:text-base font-black text-white group-hover:text-amber-300 transition-colors drop-shadow-sm leading-tight">
                  {category?.nameAr}
                </h3>
                <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5 font-medium">
                  {category?.description || 'أشهى الأصناف الطازجة'}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* 3. Eastern Sweets Featured Section (حلويات شرقية - كنافة وزنود الست) */}
      <section className="space-y-3 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/5 p-4 sm:p-5 rounded-3xl border border-amber-200/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍯</span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-stone-900 leading-tight">
                روائع الحلويات الشرقية
              </h2>
              <p className="text-xs text-stone-600">
                كنافة ساخنة بالقشطة والجبن وزنود الست المقرمشة بالفستق الحلبي
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToMenu('sweets')}
            className="text-xs font-bold text-[#7A153E] hover:underline flex items-center gap-1 whitespace-nowrap"
          >
            <span>المزيد</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {easternSweets.map((sweet) => (
            <motion.div
              key={sweet?.id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-sm flex flex-col group cursor-pointer"
              onClick={() => onSelectProduct(sweet)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={sweet?.image || DEFAULT_FALLBACK_IMAGE}
                  alt={sweet?.nameAr || 'حلويات'}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = DEFAULT_FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {sweet?.badge && (
                  <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                    {sweet.badge}
                  </span>
                )}
              </div>

              <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-stone-900 line-clamp-1 group-hover:text-[#7A153E]">
                    {sweet?.nameAr}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {sweet?.description}
                  </p>
                </div>

                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="text-xs sm:text-sm font-black text-[#7A153E]">
                    {(sweet?.price ?? 0).toLocaleString('ar-IQ')} د.ع
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(sweet);
                    }}
                    className="p-1.5 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-500 hover:text-white active:scale-90 transition-all text-xs font-bold"
                    title="إضافة سريعة"
                  >
                    + أضف
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Crepe & Cocoa Masterpieces Section (كريب الكاكاو والنوتيلا المميز) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🥞</span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-stone-900 leading-tight">
                تشكيلة الكريب الغنية بالكاكاو والشوكولاتة
              </h2>
              <p className="text-xs text-stone-600">
                كريب رقيق مسكوب بالشوكولاتة البلجيكية والنوتيلا والفواكه الطازجة
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToMenu('crepes')}
            className="text-xs font-bold text-[#7A153E] hover:underline flex items-center gap-1 whitespace-nowrap"
          >
            <span>كل الكريب</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {crepeSpotlights.map((crepe) => (
            <motion.div
              key={crepe?.id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col group cursor-pointer"
              onClick={() => onSelectProduct(crepe)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={crepe?.image || DEFAULT_FALLBACK_IMAGE}
                  alt={crepe?.nameAr || 'كريب'}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = DEFAULT_FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {crepe?.badge && (
                  <span className="absolute top-2 right-2 bg-[#7A153E] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                    {crepe.badge}
                  </span>
                )}
              </div>

              <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-stone-900 line-clamp-1 group-hover:text-[#7A153E]">
                    {crepe?.nameAr}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {crepe?.description}
                  </p>
                </div>

                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="text-xs sm:text-sm font-black text-[#7A153E]">
                    {(crepe?.price ?? 0).toLocaleString('ar-IQ')} د.ع
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(crepe);
                    }}
                    className="p-1.5 rounded-xl bg-rose-50 text-[#7A153E] hover:bg-[#7A153E] hover:text-white active:scale-90 transition-all text-xs font-bold"
                    title="إضافة سريعة"
                  >
                    + أضف
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Signature Best-Sellers (الأكثر طلباً وتواقيع المحل) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-black text-stone-900 tracking-tight">
              تواقيع مثلجات الإيطالي والأكثر طلباً
            </h2>
          </div>
          <button
            onClick={() => onNavigateToMenu('favorites')}
            className="text-xs font-bold text-[#7A153E] hover:underline flex items-center gap-1"
          >
            <span>استعراض المفضلة</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {signatureItems.slice(0, 4).map((item) => (
            <motion.div
              key={item?.id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col group cursor-pointer"
              onClick={() => onSelectProduct(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={item?.image || DEFAULT_FALLBACK_IMAGE}
                  alt={item?.nameAr || 'صنف'}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = DEFAULT_FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {item?.badge && (
                  <span className="absolute top-2 right-2 bg-[#7A153E] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-stone-900 line-clamp-1 group-hover:text-[#7A153E]">
                    {item?.nameAr}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {item?.description}
                  </p>
                </div>

                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="text-xs sm:text-sm font-black text-[#7A153E]">
                    {(item?.price ?? 0).toLocaleString('ar-IQ')} د.ع
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(item);
                    }}
                    className="p-1.5 rounded-xl bg-stone-100 text-stone-800 hover:bg-[#7A153E] hover:text-white active:scale-90 transition-all text-xs font-bold"
                    title="إضافة سريعة"
                  >
                    + أضف
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Branches & Order Info Quick Card */}
      <section className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#7A153E]" />
              <h3 className="text-sm font-black text-stone-900">
                فروع مثلجات الإيطالي في محافظة ذي قار
              </h3>
            </div>
            <p className="text-xs text-stone-500">
              خدمتكم شرف لنا في جميع فروعنا (الشطرة، قلعة سكر، الرفاعي)
            </p>
          </div>

          <button
            onClick={onOpenBranches}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-[#7A153E] hover:text-white text-stone-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>عرض أرقام الفروع والتوصيل</span>
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          {BRANCHES.map((b) => (
            <div key={b.name} className="p-2.5 rounded-xl bg-stone-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-800">{b.name}</span>
                <p className="text-[10px] text-stone-500">{b.address}</p>
              </div>
              <a
                href={`tel:${b.phone}`}
                className="text-[11px] font-bold text-[#7A153E] hover:underline"
              >
                {b.phone}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
