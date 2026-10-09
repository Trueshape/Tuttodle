import React from 'react';

interface PixelHeartProps {
  filled: boolean;
  size?: number;
  className?: string;
}

export const PixelHeart: React.FC<PixelHeartProps> = ({
  filled,
  size = 18,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-all duration-200 select-none ${className}`}
      style={{ shapeRendering: 'crispEdges' }}
    >
      {filled ? (
        <>
          {/* Black pixel art border */}
          <path
            d="M3 2h3v1H3V2zm7 0h3v1h-3V2zM2 3h1v2H2V3zm4 1h1v1H6V4zm3 0h1v1H9V4zm4-1h1v2h-1V3zM1 5h1v4H1V5zm13 0h1v4h-1V5zm-1 4h1v2h-1V9zm-2 2h1v1h-1v-1zm-1 1h1v1h-1v-1zm-1 1h1v1h-1v-1zm-2 1h2v1H7v-1zm-1-1h1v1H6v-1zm-1-1h1v1H5v-1zm-1-1h1v1H4v-1zm-1-1h1v1H3v-1zm-1-2h1v2H2V9z"
            fill="#09090b"
          />
          {/* Vibrant Red Heart Fill */}
          <path
            d="M3 3h3v1H3V3zm7 0h3v1h-3V3zM2 5h12v4H2V5zm1 4h10v1H3V9zm1 1h8v1H4v-1zm1 1h6v1H5v-1zm1 1h4v1H6v-1zm1 1h2v1H7v-1z"
            fill="#ef4444"
          />
          {/* Pixel Highlight / Shine */}
          <path d="M3 4h2v2H3V4zm-1 2h1v1H2V6z" fill="#fca5a5" />
        </>
      ) : (
        <>
          {/* Lost / Empty Heart Border */}
          <path
            d="M3 2h3v1H3V2zm7 0h3v1h-3V2zM2 3h1v2H2V3zm4 1h1v1H6V4zm3 0h1v1H9V4zm4-1h1v2h-1V3zM1 5h1v4H1V5zm13 0h1v4h-1V5zm-1 4h1v2h-1V9zm-2 2h1v1h-1v-1zm-1 1h1v1h-1v-1zm-1 1h1v1h-1v-1zm-2 1h2v1H7v-1zm-1-1h1v1H6v-1zm-1-1h1v1H5v-1zm-1-1h1v1H4v-1zm-1-1h1v1H3v-1zm-1-2h1v2H2V9z"
            fill="#3f3f46"
          />
          {/* Lost / Empty Heart Fill */}
          <path
            d="M3 3h3v1H3V3zm7 0h3v1h-3V3zM2 5h12v4H2V5zm1 4h10v1H3V9zm1 1h8v1H4v-1zm1 1h6v1H5v-1zm1 1h4v1H6v-1zm1 1h2v1H7v-1z"
            fill="#18181b"
            opacity="0.8"
          />
        </>
      )}
    </svg>
  );
};
