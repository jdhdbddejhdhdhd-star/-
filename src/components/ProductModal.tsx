import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Check, Sparkles, MessageSquare, Info } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { DEFAULT_FALLBACK_IMAGE } from './SafeImage';
import { sanitizeOrderNotes } from '../lib/security';

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: Omit<CartItem, 'cartId'>) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [imageError, setImageError] = useState(false);

  // Selected size if item has sizes
  const [selectedSize, setSelectedSize] = useState<{ label: string; price: number } | undefined>(
    item.sizes && item.sizes.length > 0 ? item.sizes[0] : undefined
  );

  // Selected flavor if item has flavors (e.g. موهيتو، مشروبات طاقة، تشيز كيك، لاتيه)
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(
    item.flavors && item.flavors.length > 0 ? item.flavors[0] : undefined
  );

  // Selected sauce if item has sauces
  const [selectedSauce, setSelectedSauce] = useState<string | undefined>(
    item.sauces && item.sauces.length > 0 ? item.sauces[0] : undefined
  );

  // Custom order notes
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Calculate unit price based on size or base price safely
  const basePrice = typeof item.price === 'number' && Number.isFinite(item.price) ? item.price : 0;
  const unitPrice = selectedSize ? selectedSize.price : basePrice;
  const totalPrice = unitPrice * Math.max(1, quantity);

  const handleAdd = () => {
    // Sanitize note before adding to cart
    const cleanedNotes = sanitizeOrderNotes(notes);

    onAddToCart({
      item,
      selectedSize,
      selectedFlavor,
      selectedSauce,
      quantity: Math.max(1, quantity),
      notes: cleanedNotes ? cleanedNotes : undefined,
      unitPrice,
      totalPrice,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 850);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal / Bottom Sheet */}
        <motion.div
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg max-h-[92vh] sm:max-h-[85vh] bg-white rounded-t-[28px] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Top handle bar for mobile drag feeling */}
          <div className="sm:hidden absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-white/70 z-20" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 left-3.5 z-20 w-9 h-9 rounded-full bg-black/45 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 overscroll-contain">
            {/* Full-bleed Product Image */}
            <div className="relative aspect-[16/10] w-full bg-stone-900 overflow-hidden">
              <motion.img
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                src={imageError || !item.image ? DEFAULT_FALLBACK_IMAGE : item.image}
                alt={item.nameAr || 'صنف المنيو'}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

              {/* Order Name & Details Embedded Directly On Image */}
              <div className="absolute bottom-3.5 inset-x-4 z-10 flex items-center justify-between gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/25 text-white font-black text-sm sm:text-base shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E0A96D] shrink-0 animate-pulse" />
                  <span>{item.nameAr}</span>
                </div>

                {item.badge && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#7A153E] text-white shadow-md border border-white/20">
                    <Sparkles className="w-3 h-3 text-[#FBE4C8]" />
                    <span>{item.badge}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Product Body */}
            <div className="p-5 sm:p-6 space-y-5 text-right">
              {/* Header Title & Pricing */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl sm:text-2xl font-black text-[#2E0B19] leading-tight">
                    {item.nameAr}
                  </h2>
                  <div className="text-left shrink-0">
                    <span className="text-lg sm:text-xl font-black text-[#7A153E]">
                      {unitPrice.toLocaleString('ar-IQ')}{' '}
                      <span className="text-xs font-bold text-[#7A153E]/80">د.ع</span>
                    </span>
                  </div>
                </div>

                {item.description && (
                  <p className="text-sm text-[#6A4E58] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Sizes / Portions (if available) */}
              {item.sizes && item.sizes.length > 0 && (
                <div className="space-y-2.5 pt-1 border-t border-[#7A153E]/10">
                  <label className="block text-xs font-extrabold text-[#3B1522] uppercase tracking-wider">
                    اختر الحجم أو الوزن:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {item.sizes.map((sizeOption) => {
                      const isSelected = selectedSize?.label === sizeOption.label;
                      return (
                        <button
                          key={sizeOption.label}
                          type="button"
                          onClick={() => setSelectedSize(sizeOption)}
                          className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between gap-1 cursor-pointer ${
                            isSelected
                              ? 'border-[#7A153E] bg-[#7A153E]/5 shadow-xs'
                              : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-sm font-bold ${
                                isSelected ? 'text-[#7A153E]' : 'text-stone-800'
                              }`}
                            >
                              {sizeOption.label}
                            </span>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-[#7A153E] text-white flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-[#7A153E]">
                            {sizeOption.price.toLocaleString('ar-IQ')} د.ع
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Flavors Selection (if available) */}
              {item.flavors && item.flavors.length > 0 && (
                <div className="space-y-2.5 pt-1 border-t border-[#7A153E]/10">
                  <label className="block text-xs font-extrabold text-[#3B1522] uppercase tracking-wider">
                    اختر النكهة المطلوبة:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {item.flavors.map((flavor) => {
                      const isSelected = selectedFlavor === flavor;
                      return (
                        <button
                          key={flavor}
                          type="button"
                          onClick={() => setSelectedFlavor(flavor)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#7A153E] text-white shadow-sm shadow-[#7A153E]/20'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                          }`}
                        >
                          {flavor}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Notes & Custom Instructions */}
              <div className="space-y-2 pt-1 border-t border-[#7A153E]/10">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#3B1522]">
                  <MessageSquare className="w-3.5 h-3.5 text-[#7A153E]" />
                  <span>ملاحظات خاصة للكاونتر (اختياري):</span>
                </div>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثال: بدون سكر، حليب قليل الدسم، زيادة صوص..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#7A153E] focus:bg-white text-stone-800 placeholder-stone-400 transition-colors"
                />
              </div>

              {/* Order Quantity and Add to Cart Section */}
              <div className="pt-3 pb-[max(1rem,env(safe-area-inset-bottom,16px))] border-t border-[#7A153E]/10 flex items-center justify-between gap-3 sm:gap-4">
                {/* Quantity selector */}
                <div className="flex items-center gap-2 bg-stone-100 px-2 py-1.5 rounded-2xl border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-xl bg-white text-stone-700 disabled:opacity-40 disabled:hover:bg-white hover:bg-stone-50 flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
                    aria-label="إنقاص الكمية"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="w-7 text-center font-black text-stone-800 text-sm">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-xl bg-[#7A153E] text-white hover:bg-[#911849] flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
                    aria-label="زيادة الكمية"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Submit button with micro-animation */}
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-between shadow-lg cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : 'bg-gradient-to-r from-[#7A153E] to-[#911849] text-white shadow-[#7A153E]/25 hover:opacity-95 active:scale-[0.98]'
                  }`}
                >
                  {isAdded ? (
                    <div className="w-full flex items-center justify-center gap-2">
                      <Check className="w-5 h-5 stroke-[3]" />
                      <span>تمت الإضافة بنجاح ✓</span>
                    </div>
                  ) : (
                    <>
                      <span>إضافة إلى السلة</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-lg">
                        {totalPrice.toLocaleString('ar-IQ')} د.ع
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
