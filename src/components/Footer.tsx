import React from 'react';
import { MapPin, Instagram, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  tableNumber?: string;
  onOpenBranches?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  tableNumber,
  onOpenBranches,
}) => {
  return (
    <footer className="mt-16 border-t border-[#7A153E]/10 bg-white/80 backdrop-blur-md py-10 text-center text-xs text-stone-500">
      <div className="max-w-md mx-auto px-4 space-y-5">
        <div className="flex justify-center">
          <BrandLogo size="md" />
        </div>

        <p className="text-stone-600 leading-relaxed font-medium">
          المنيو الإلكتروني التفاعلي المعتمد لمثلجات وحلويات الإيطالي.
          <br />
          كل الأصناف طازجة 100% ومحضرة بأجود المكونات الإيطالية والبلجيكية.
        </p>

        {/* Instagram Link Banner */}
        <div className="py-1">
          <a
            href="https://www.instagram.com/al_italy_icecream"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-xs shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Instagram className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <div className="text-right leading-tight">
              <span className="block text-[11px] opacity-90 font-medium">تابعنا على إنستغرام</span>
              <span className="block text-xs font-black tracking-wide" dir="ltr">@al_italy_icecream</span>
            </div>
            <Heart className="w-3.5 h-3.5 text-white/80 fill-white/80 animate-pulse mr-1" />
          </a>
        </div>

        {/* Branch Quick Modal Button */}
        {onOpenBranches && (
          <div className="flex items-center justify-center">
            <button
              onClick={onOpenBranches}
              className="hover:underline text-[#7A153E] font-bold flex items-center gap-1.5 cursor-pointer text-xs"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>فروعنا (الشطرة، قلعة سكر، الرفاعي)</span>
            </button>
          </div>
        )}

        {tableNumber && (
          <div className="pt-2 text-[11px] text-stone-400">
            طاولة رقم {tableNumber} • الأسعار بالدينار العراقي (د.ع)
          </div>
        )}
      </div>
    </footer>
  );
};
