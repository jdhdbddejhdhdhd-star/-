import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  FolderPlus,
  Save,
  Image as ImageIcon,
  Sparkles,
  IceCream,
  Coffee,
  Cookie,
  Cake,
  CupSoda,
  Star,
  Check,
} from 'lucide-react';
import { Category } from '../types';

const CATEGORY_ICON_OPTIONS = [
  { name: 'IceCream', label: 'مثلجات', icon: IceCream },
  { name: 'Sparkles', label: 'مميز', icon: Sparkles },
  { name: 'Cookie', label: 'كوكيز وكريب', icon: Cookie },
  { name: 'Cake', label: 'كيك وحلويات', icon: Cake },
  { name: 'Coffee', label: 'قهوة ساخنة', icon: Coffee },
  { name: 'CupSoda', label: 'مشروبات وعصائر', icon: CupSoda },
  { name: 'Star', label: 'نجمة', icon: Star },
];

interface CategoryEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit: Category | null;
  itemsCountInCategory?: number;
  onSaveCategory: (cat: Category) => Promise<void>;
  onDeleteCategory?: (categoryId: string) => Promise<void>;
}

export const CategoryEditorModal: React.FC<CategoryEditorModalProps> = ({
  isOpen,
  onClose,
  categoryToEdit,
  itemsCountInCategory = 0,
  onSaveCategory,
  onDeleteCategory,
}) => {
  const [nameAr, setNameAr] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [iconName, setIconName] = useState<string>('IceCream');
  const [bannerImage, setBannerImage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (categoryToEdit) {
      setNameAr(categoryToEdit.nameAr || '');
      setId(categoryToEdit.id || '');
      setDescription(categoryToEdit.description || '');
      setIconName(categoryToEdit.iconName || 'IceCream');
      setBannerImage(categoryToEdit.bannerImage || '');
    } else {
      setNameAr('');
      setId('');
      setDescription('');
      setIconName('Sparkles');
      setBannerImage('');
    }
    setErrorMsg(null);
  }, [categoryToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim()) {
      setErrorMsg('يرجى إدخال اسم القائمة أو القسم');
      return;
    }

    const generatedId = id.trim()
      ? id.trim().toLowerCase().replace(/\s+/g, '-')
      : `cat-${Date.now()}`;

    setIsSubmitting(true);
    try {
      await onSaveCategory({
        id: generatedId,
        nameAr: nameAr.trim(),
        iconName: iconName || 'Sparkles',
        description: description.trim() || undefined,
        bannerImage: bannerImage.trim() || undefined,
      });
      onClose();
    } catch (err) {
      console.error('Error saving category:', err);
      setErrorMsg('حدث خطأ أثناء حفظ القائمة');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!categoryToEdit || !onDeleteCategory) return;

    let confirmText = `هل أنت متأكد من حذف قائمة "${categoryToEdit.nameAr}"؟`;
    if (itemsCountInCategory > 0) {
      confirmText += `\n\nتنبيه: تحتوي هذه القائمة على (${itemsCountInCategory}) أصناف حالياً! سيتم حذف القائمة من شريط التنقل.`;
    }

    if (confirm(confirmText)) {
      setIsSubmitting(true);
      try {
        await onDeleteCategory(categoryToEdit.id);
        onClose();
      } catch (err) {
        console.error('Error deleting category:', err);
        setErrorMsg('فشل حذف القائمة');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs" dir="rtl">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#2D0616] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-black text-sm">
                {categoryToEdit ? `تعديل القائمة: ${categoryToEdit.nameAr}` : 'إضافة قائمة / قسم جديد للمنيو'}
              </h3>
              <p className="text-[11px] text-rose-200/80">
                {categoryToEdit ? 'تعديل بيانات القائمة أو حذفها' : 'إنشاء قسم جديد يظهر في شريط الأقسام والمنيو'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Category Name */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              اسم القائمة / القسم بالعربية *
            </label>
            <input
              type="text"
              required
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              placeholder="مثال: وافل وكريب فاخر، مشروبات طاقة، بوكسات الجمعات..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
            />
          </div>

          {/* ID Identifier */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              معرف القائمة بالإنجليزية (ID فريد)
            </label>
            <input
              type="text"
              value={id}
              disabled={Boolean(categoryToEdit)}
              onChange={(e) => setId(e.target.value)}
              placeholder="مثال: family-boxes (سيتم توليده تلقائياً إن ترك فارغاً)"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E] disabled:bg-stone-100 disabled:text-stone-500 font-mono"
            />
            {categoryToEdit && (
              <p className="text-[10px] text-stone-400 mt-0.5">لا يمكن تغيير المعرف البرمجي بعد الإنشاء لربط الأصناف به</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              وصف مختصر للقائمة (يظهر في ترويسة القسم)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="مثال: ألذ تشكيلة من الوافل الطازج والمقرمش مع الفواكه والبلجيكي..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
            />
          </div>

          {/* Icon Choice */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              رمز / أيقونة القائمة:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORY_ICON_OPTIONS.map((opt) => {
                const IconComp = opt.icon;
                const isSelected = iconName === opt.name;
                return (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setIconName(opt.name)}
                    className={`p-2 rounded-xl border text-center flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#7A153E] bg-[#7A153E]/5 text-[#7A153E] font-black'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span className="text-[10px]">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Banner Image URL with Quick Deletion */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-stone-700">
                صورة غلاف القائمة (Banner Image URL)
              </label>
              {bannerImage && (
                <button
                  type="button"
                  onClick={() => setBannerImage('')}
                  className="text-[11px] text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>حذف غلاف القائمة</span>
                </button>
              )}
            </div>
            <input
              type="url"
              value={bannerImage}
              onChange={(e) => setBannerImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
            />
            {bannerImage && (
              <div className="mt-2 w-full h-20 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 relative">
                <img
                  src={bannerImage}
                  alt="غلاف"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
            {categoryToEdit && onDeleteCategory ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black border border-rose-200 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>حذف القائمة</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-[#7A153E] hover:bg-[#961D4E] text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'جاري الحفظ...' : categoryToEdit ? 'تحديث القائمة' : 'إضافة القائمة'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
