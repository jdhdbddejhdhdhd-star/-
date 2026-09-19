import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  Save,
  Tag,
  FolderPlus,
  DollarSign,
  AlignLeft,
  Sparkles,
  Upload,
} from 'lucide-react';
import { MenuItem, Category } from '../types';
import { DEFAULT_FALLBACK_IMAGE } from './SafeImage';

interface MenuEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  itemToEdit: MenuItem | null;
  onSaveItem: (item: MenuItem) => Promise<void>;
  onDeleteItem?: (itemId: string) => Promise<void>;
  onSaveCategory: (cat: Category) => Promise<void>;
}

export const MenuEditorModal: React.FC<MenuEditorModalProps> = ({
  isOpen,
  onClose,
  categories,
  itemToEdit,
  onSaveItem,
  onDeleteItem,
  onSaveCategory,
}) => {
  const [activeTab, setActiveTab] = useState<'item' | 'category'>('item');

  // Item form state
  const [nameAr, setNameAr] = useState<string>(itemToEdit?.nameAr || '');
  const [categoryId, setCategoryId] = useState<string>(
    itemToEdit?.categoryId || categories[0]?.id || 'ice-cream'
  );
  const [price, setPrice] = useState<number>(itemToEdit?.price || 3000);
  const [description, setDescription] = useState<string>(itemToEdit?.description || '');
  const [image, setImage] = useState<string>(
    itemToEdit?.image || 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=80'
  );
  const [badge, setBadge] = useState<string>(itemToEdit?.badge || '');

  // Category form state
  const [newCatId, setNewCatId] = useState<string>('');
  const [newCatNameAr, setNewCatNameAr] = useState<string>('');
  const [newCatIcon, setNewCatIcon] = useState<string>('Sparkles');
  const [newCatDesc, setNewCatDesc] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync when itemToEdit changes
  React.useEffect(() => {
    if (itemToEdit) {
      setNameAr(itemToEdit.nameAr);
      setCategoryId(itemToEdit.categoryId);
      setPrice(itemToEdit.price);
      setDescription(itemToEdit.description || '');
      setImage(itemToEdit.image);
      setBadge(itemToEdit.badge || '');
      setActiveTab('item');
    } else {
      setNameAr('');
      setPrice(3000);
      setDescription('');
      setBadge('');
    }
  }, [itemToEdit]);

  if (!isOpen) return null;

  const handleSaveItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim()) return;

    setIsSubmitting(true);
    try {
      const id = itemToEdit?.id || `custom-${Date.now()}`;
      await onSaveItem({
        id,
        nameAr: nameAr.trim(),
        categoryId,
        price: Number(price),
        description: description.trim(),
        image: image.trim() || 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=80',
        badge: badge.trim() || undefined,
        flavors: itemToEdit?.flavors,
        sauces: itemToEdit?.sauces,
        sizes: itemToEdit?.sizes,
      });
      onClose();
    } catch (err) {
      console.error('Error saving item:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatNameAr.trim()) return;

    setIsSubmitting(true);
    try {
      const generatedId = newCatId.trim() || `cat-${Date.now()}`;
      await onSaveCategory({
        id: generatedId,
        nameAr: newCatNameAr.trim(),
        iconName: newCatIcon || 'Sparkles',
        description: newCatDesc.trim() || undefined,
      });
      setNewCatNameAr('');
      setNewCatId('');
      setNewCatDesc('');
      setActiveTab('item');
    } catch (err) {
      console.error('Error saving category:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs" dir="rtl">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#4A0A24] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="font-black text-sm">
              {itemToEdit ? `تعديل صنف: ${itemToEdit.nameAr}` : 'إضافة وتعديل أصناف وقوائم المنيو'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 bg-stone-50 p-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('item')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'item' ? 'bg-white text-[#7A153E] shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {itemToEdit ? 'تعديل الصنف' : 'إضافة صنف جديد'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('category')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'category' ? 'bg-white text-[#7A153E] shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            إضافة قسم / قائمة جديدة
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'item' ? (
            <form onSubmit={handleSaveItemSubmit} className="space-y-4">
              {/* Item Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">اسم الصنف باللغة العربية *</label>
                <input
                  type="text"
                  required
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  placeholder="مثال: وافل شوكولاتة بلجيكية دبل"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">القسم / القائمة *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E] bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">السعر (دينار عراقي) *</label>
                  <input
                    type="number"
                    required
                    step="250"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">وصف الصنف والمكونات</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف مشهي للمكونات وطريقة التقديم..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
                />
              </div>

              {/* Image URL & Upload & Delete */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-stone-700">صورة الصنف</label>
                  {image && image !== DEFAULT_FALLBACK_IMAGE && (
                    <button
                      type="button"
                      onClick={() => setImage(DEFAULT_FALLBACK_IMAGE)}
                      className="text-[11px] text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>حذف الصورة</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="رابط صورة مباشر https://..."
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
                    />
                    <label className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 border border-stone-200">
                      <Upload className="w-3.5 h-3.5 text-[#7A153E]" />
                      <span>رفع صورة</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const res = event.target?.result as string;
                              if (res) setImage(res);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {image && (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 group">
                      <img
                        src={image}
                        alt="معاينة"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = DEFAULT_FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Badge */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">شارة مميزة (اختياري)</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="مثال: الأكثر طلباً، توقيع المحل، حصري"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-3 flex items-center justify-between gap-3 border-t border-stone-100">
                {itemToEdit && onDeleteItem && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (confirm(`هل أنت متأكد من حذف الصنف "${itemToEdit.nameAr}"؟`)) {
                        setIsSubmitting(true);
                        await onDeleteItem(itemToEdit.id);
                        onClose();
                      }
                    }}
                    className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>حذف الصنف</span>
                  </button>
                )}

                <div className="flex items-center gap-2 mr-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-stone-500 hover:bg-stone-100 text-xs font-bold cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-[#7A153E] hover:bg-[#961D4E] text-white text-xs font-black flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSubmitting ? 'جاري الحفظ...' : 'حفظ الصنف'}</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSaveCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">اسم القسم / القائمة الجديدة *</label>
                <input
                  type="text"
                  required
                  value={newCatNameAr}
                  onChange={(e) => setNewCatNameAr(e.target.value)}
                  placeholder="مثال: حلويات دبي والمناسبات"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">معرف القسم بالإنجليزية (اختياري)</label>
                <input
                  type="text"
                  value={newCatId}
                  onChange={(e) => setNewCatId(e.target.value)}
                  placeholder="مثال: dubai-sweets"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">وصف القسم</label>
                <textarea
                  rows={2}
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="وصف مختصر للقسم يظهر في الترويسة..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-stone-500 hover:bg-stone-100 text-xs font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#7A153E] hover:bg-[#961D4E] text-white text-xs font-black flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>{isSubmitting ? 'جاري الحفظ...' : 'إضافة القسم للمنيو'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
