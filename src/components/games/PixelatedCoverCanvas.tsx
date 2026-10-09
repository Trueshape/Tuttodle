import React, { useRef, useEffect, useState } from 'react';

interface PixelatedCoverCanvasProps {
  src: string;
  fallbackSrc?: string;
  isGameOver: boolean;
  className?: string;
  pixelCols?: number;
  pixelRows?: number;
  onNaturalAspectDetected?: (aspect: number, isLandscape: boolean) => void;
}

export const PixelatedCoverCanvas: React.FC<PixelatedCoverCanvasProps> = ({
  src,
  fallbackSrc,
  isGameOver,
  className = '',
  pixelCols = 24,
  pixelRows = 32,
  onNaturalAspectDetected,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSrc, setActiveSrc] = useState<string>(src);

  useEffect(() => {
    setActiveSrc(src);
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !activeSrc) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;
    let hasLoaded = false;

    const drawPixelated = (imageElement: HTMLImageElement) => {
      if (!isMounted || !canvasRef.current) return;
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;

      // Canvas offscreen per il downsampling autentico in pixel art
      const offscreen = document.createElement('canvas');
      offscreen.width = pixelCols;
      offscreen.height = pixelRows;
      const offCtx = offscreen.getContext('2d');

      if (offCtx) {
        const naturalW = imageElement.naturalWidth || imageElement.width || 1;
        const naturalH = imageElement.naturalHeight || imageElement.height || 1;

        // Disegna l'intera copertina originale sul canvas offscreen
        offCtx.drawImage(imageElement, 0, 0, naturalW, naturalH, 0, 0, pixelCols, pixelRows);

        // Disattiva il filtro di smoothing per mantenere blocchi di pixel netti e definiti (retro pixel art)
        ctx.imageSmoothingEnabled = false;
        const ctxWithPrefixes = ctx as unknown as Record<string, boolean>;
        ctxWithPrefixes['mozImageSmoothingEnabled'] = false;
        ctxWithPrefixes['webkitImageSmoothingEnabled'] = false;
        ctxWithPrefixes['msImageSmoothingEnabled'] = false;

        ctx.clearRect(0, 0, w, h);
        // Scala la versione pixellata a piena risoluzione sul canvas visibile
        ctx.drawImage(offscreen, 0, 0, pixelCols, pixelRows, 0, 0, w, h);
      }
    };

    const handleImageLoaded = (imgObj: HTMLImageElement) => {
      if (hasLoaded || !isMounted) return;
      hasLoaded = true;
      if (imgObj.naturalWidth && imgObj.naturalHeight) {
        const aspect = imgObj.naturalWidth / imgObj.naturalHeight;
        onNaturalAspectDetected?.(aspect, aspect > 1.05);
      }
      drawPixelated(imgObj);
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.onload = () => {
      handleImageLoaded(img);
    };

    img.onerror = () => {
      if (fallbackSrc && fallbackSrc !== activeSrc && isMounted) {
        setActiveSrc(fallbackSrc);
        const fallbackImg = new Image();
        fallbackImg.crossOrigin = 'anonymous';
        fallbackImg.referrerPolicy = 'no-referrer';
        fallbackImg.onload = () => {
          handleImageLoaded(fallbackImg);
        };
        fallbackImg.src = fallbackSrc;
      }
    };

    img.src = activeSrc;

    if (img.complete && img.naturalWidth > 0) {
      handleImageLoaded(img);
    }

    return () => {
      isMounted = false;
    };
  }, [activeSrc, fallbackSrc, pixelCols, pixelRows, onNaturalAspectDetected]);

  // Dimensioni native del canvas proporzionate a pixelCols e pixelRows
  const canvasWidth = pixelCols * 15;
  const canvasHeight = pixelRows * 15;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Canvas Pixellato autentico (senza alcun filtro blur CSS e allineato 1:1 con la griglia) */}
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="w-full h-full object-fill select-none pointer-events-none"
        style={{
          imageRendering: 'pixelated',
        }}
      />

      {/* Immagine HD originale nitida visibile a fine partita con fade-in */}
      <img
        src={activeSrc}
        alt="Videogame Cover HD"
        className={`absolute inset-0 w-full h-full object-fill select-none pointer-events-none transition-opacity duration-700 ease-out ${
          isGameOver ? 'opacity-100' : 'opacity-0'
        }`}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={(e) => {
          if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackSrc;
            setActiveSrc(fallbackSrc);
          }
        }}
      />
    </div>
  );
};
