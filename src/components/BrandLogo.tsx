import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'burgundy';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'burgundy',
}) => {
  const sizeMap = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-11 sm:h-11',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
      {/* Visual Ice Cream Cup Emblem inspired by the PDF Logo */}
      <div
        className={`${sizeMap[size]} shrink-0 relative rounded-xl sm:rounded-2xl flex items-center justify-center p-1 sm:p-1.5 shadow-sm transition-transform ${
          isLight
            ? 'bg-white/15 text-white border border-white/20 backdrop-blur-sm'
            : 'bg-gradient-to-br from-[#7A153E] to-[#4E0A24] text-white shadow-[#7A153E]/20'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Swirled Soft Serve soft curves */}
          <path
            d="M50 12C46 12 43 15 45 19C47 23 53 23 55 20C57 17 54 12 50 12Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M38 27C34 29 35 35 40 37C46 39 56 38 61 35C66 32 64 26 58 25C51 24 43 25 38 27Z"
            fill="currentColor"
            opacity="0.95"
          />
          <path
            d="M28 43C24 46 26 53 32 55C40 57 60 57 68 54C75 51 75 44 68 41C58 37 38 39 28 43Z"
            fill="currentColor"
          />
          <path
            d="M22 57C20 60 22 66 28 67C37 69 63 69 72 67C78 65 79 59 74 56C65 52 32 53 22 57Z"
            fill="currentColor"
            opacity="0.95"
          />
          {/* Gelato Cup / Base */}
          <path
            d="M26 68L32 86C33 89 36 91 40 91H60C64 91 67 89 68 86L74 68C65 70 35 70 26 68Z"
            fill="currentColor"
            opacity="0.8"
          />
          {/* Decorative cup rim stripe */}
          <path
            d="M28 72H72"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={isLight ? '0.6' : '0.4'}
          />
          {/* Heart / Sparkle accent */}
          <circle cx="50" cy="30" r="2.5" fill="#E8B86D" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-extrabold tracking-tight text-right ${
              size === 'sm'
                ? 'text-xs sm:text-sm'
                : size === 'md'
                ? 'text-sm sm:text-base md:text-lg'
                : size === 'lg'
                ? 'text-lg sm:text-2xl'
                : 'text-2xl sm:text-3xl'
            } ${isLight ? 'text-white' : 'text-[#7A153E]'}`}
          >
            مثلجات الإيطالي
          </span>
        </div>
        <span
          className={`text-[8px] sm:text-[10px] uppercase font-bold tracking-wider sm:tracking-widest ${
            isLight ? 'text-white/80' : 'text-[#A04565]'
          }`}
          style={{ fontFamily: 'sans-serif' }}
        >
          SWEETS & ICE CREAM
        </span>
      </div>
    </div>
  );
};
