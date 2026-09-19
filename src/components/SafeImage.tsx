import React, { useState } from 'react';

// Crisp inline SVG fallback for sweets & ice cream with brand colors
export const DEFAULT_FALLBACK_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A0A24" />
      <stop offset="50%" stop-color="#7A153E" />
      <stop offset="100%" stop-color="#250311" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE4C4" />
      <stop offset="100%" stop-color="#E0A96D" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#brandGrad)" />
  <circle cx="200" cy="120" r="65" fill="#ffffff" opacity="0.08" />
  <!-- Dessert / Ice Cream stylized silhouette -->
  <g transform="translate(160, 65) scale(0.8)">
    <path d="M50 15C46 15 43 18 45 22C47 26 53 26 55 23C57 20 54 15 50 15Z" fill="url(#goldGrad)" />
    <path d="M38 30C34 32 35 38 40 40C46 42 56 41 61 38C66 35 64 29 58 28C51 27 43 28 38 30Z" fill="#ffffff" opacity="0.95" />
    <path d="M28 46C24 49 26 56 32 58C40 60 60 60 68 57C75 54 75 47 68 44C58 40 38 42 28 46Z" fill="#ffffff" />
    <path d="M22 60C20 63 22 69 28 70C37 72 63 72 72 70C78 68 79 62 74 59C65 55 32 56 22 60Z" fill="#ffffff" opacity="0.95" />
    <path d="M26 71L32 89C33 92 36 94 40 94H60C64 94 67 92 68 89L74 71C65 73 35 73 26 71Z" fill="url(#goldGrad)" />
  </g>
  <text x="200" y="210" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="900" fill="#FFE4C4" text-anchor="middle">
    مثلجات وحلويات الإيطالي
  </text>
  <text x="200" y="235" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#ffffff" opacity="0.7" text-anchor="middle">
    طازج 100% • جودة إيطالية
  </text>
</svg>
`)}`;

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  className = '',
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If no source provided, fallback immediately
  const effectiveSrc = hasError || !src ? fallbackSrc : src;

  return (
    <div className="relative w-full h-full overflow-hidden bg-stone-100 flex items-center justify-center">
      {/* Shimmer skeleton loader until loaded */}
      {!imageLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 animate-pulse z-0" />
      )}

      <img
        src={effectiveSrc}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setHasError(true);
          setImageLoaded(true);
        }}
        className={`${className} transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
