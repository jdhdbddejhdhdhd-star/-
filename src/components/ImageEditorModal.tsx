import React, { useState } from 'react';
import {
  X,
  Trash2,
  Upload,
  Link as LinkIcon,
  Sparkles,
  Check,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';
import { DEFAULT_FALLBACK_IMAGE } from './SafeImage';

// Curated high-res dessert & ice cream images for quick selection by the cashier
const PRESET_DESSERT_IMAGES = [
  {
    name: 'آيس كريم إيطالي مشكل',
    url: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'كريب نوتيلا وفراولة',
    url: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'وافل بلجيكي فاخر',
    url: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'بان كيك مع العسل',
    url: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'تشيز كيك فراولة وتوت',
    url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'كيكة الشوكولاتة الذائبة',
    url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'بقلاوة وحلويات شرقية',
    url: 'https://images.unsplash.com/photo-1597843797221-50d4b96791d2?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'سوفليه فوندو الشوكولاتة',
    url: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'موهيتو ليمون ونعناع منعش',
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'قهوة اسبريسو إيطالية',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'عصائر وكوكتيل طبيعي',
    url: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'ميلك شيك شوكولاتة ولوتس',
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
  },
];

interface ImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  currentImageUrl?: string;
  onSaveImage: (newUrl: string) => Promise<void>;
  onDeleteImage: () => Promise<void>;
}

export const ImageEditorModal: React.FC<ImageEditorModalProps> = ({
  isOpen,
  onClose,
  title,
  currentImageUrl = '',
  onSaveImage,
  onDeleteImage,
}) => {
  const [activeMode, setActiveMode] = useState<'url' | 'upload' | 'preset'>('url');
  const [customUrl, setCustomUrl] = useState<string>(currentImageUrl || '');
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl || '');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  React.useEffect(() => {
    setCustomUrl(currentImageUrl || '');
    setPreviewUrl(currentImageUrl || '');
    setUploadError(null);
  }, [currentImageUrl, isOpen]);

  if (!isOpen) return null;

  // Handle local file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('حجم الصورة كبير جداً (الحد الأقصى 5 ميغابايت)');
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewUrl(result);
        setCustomUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsProcessing(true);
    try {
      await onSaveImage(previewUrl.trim() || DEFAULT_FALLBACK_IMAGE);
      onClose();
    } catch (err) {
      console.error('Error saving image:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (confirm(`هل أنت متأكد من حذف صورة "${title}" والرجوع للشعار الرسمي المعتمد؟`)) {
      setIsProcessing(true);
      try {
        await onDeleteImage();
        onClose();
      } catch (err) {
        console.error('Error deleting image:', err);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const isCurrentDefault = !currentImageUrl || currentImageUrl === DEFAULT_FALLBACK_IMAGE;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs" dir="rtl">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#2D0616] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-black text-sm">تعديل وحذف الصورة</h3>
              <p className="text-[11px] text-rose-200/80 truncate max-w-xs">{title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Current / Live Preview Box */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="relative w-28 h-24 rounded-2xl overflow-hidden bg-stone-200 border border-stone-300 shrink-0 shadow-inner flex items-center justify-center">
              <img
                src={previewUrl || DEFAULT_FALLBACK_IMAGE}
                alt={title}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = DEFAULT_FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-right space-y-1">
              <span className="text-[11px] font-bold text-stone-500">معاينة الصورة الحالية:</span>
              <p className="text-xs font-black text-stone-800 line-clamp-1">{title}</p>
              <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {/* Delete Image Button */}
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors cursor-pointer"
                  title="حذف الصورة والاعتماد على شعار المحل"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف الصورة</span>
                </button>

                {previewUrl !== currentImageUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl(currentImageUrl);
                      setCustomUrl(currentImageUrl);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-medium cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>تراجع</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveMode('url')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeMode === 'url' ? 'bg-white text-[#7A153E] shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>رابط صورة (URL)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('upload')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeMode === 'upload' ? 'bg-white text-[#7A153E] shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>رفع من الجهاز</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('preset')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeMode === 'preset' ? 'bg-white text-[#7A153E] shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>صور مقترحة</span>
            </button>
          </div>

          {/* Mode 1: Custom URL */}
          {activeMode === 'url' && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-stone-700">
                أدخل رابط الصورة المباشر (Direct Image URL):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    setPreviewUrl(e.target.value);
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#7A153E]"
                />
              </div>
              <p className="text-[11px] text-stone-500">
                يمكنك نسخ أي رابط صورة من الإنترنت ولصقه هنا لمعاينتها فوراً.
              </p>
            </div>
          )}

          {/* Mode 2: Upload from Device */}
          {activeMode === 'upload' && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-stone-700">
                اختر صورة من هاتفك أو حاسوبك:
              </label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 hover:border-[#7A153E] rounded-2xl p-6 cursor-pointer bg-stone-50 hover:bg-stone-100/70 transition-all">
                <Upload className="w-8 h-8 text-stone-400 mb-2" />
                <span className="text-xs font-bold text-stone-700">اضغط لاختيار صورة من الملفات</span>
                <span className="text-[10px] text-stone-500 mt-1">يدعم JPG, PNG, WebP (بحد أقصى 5MB)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {uploadError && (
                <p className="text-xs text-rose-600 font-bold">{uploadError}</p>
              )}
            </div>
          )}

          {/* Mode 3: Presets Gallery */}
          {activeMode === 'preset' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                اختر صورة عالية الدقة من مكتبة الحلويات والمثلجات المعتمدة:
              </label>
              <div className="grid grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1">
                {PRESETDESSERT_IMAGES_MAPPING.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPreviewUrl(preset.url);
                      setCustomUrl(preset.url);
                    }}
                    className={`relative rounded-xl overflow-hidden border text-right transition-all group cursor-pointer aspect-square ${
                      previewUrl === preset.url
                        ? 'border-[#7A153E] ring-2 ring-[#7A153E]/40'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1">
                      <p className="text-[10px] font-bold text-white leading-tight truncate">
                        {preset.name}
                      </p>
                    </div>
                    {previewUrl === preset.url && (
                      <div className="absolute top-1 right-1 bg-[#7A153E] text-white p-0.5 rounded-full shadow-xs">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-200 text-xs font-bold cursor-pointer"
          >
            إلغاء
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-xl bg-[#7A153E] hover:bg-[#961D4E] text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isProcessing ? 'جاري الحفظ...' : 'حفظ وتطبيق الصورة'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PRESETDESSERT_IMAGES_MAPPING = PRESET_DESSERT_IMAGES;
