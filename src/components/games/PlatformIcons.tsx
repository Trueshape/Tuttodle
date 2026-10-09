import React from 'react';

interface PlatformIconsProps {
  platforms?: string[] | string;
  className?: string;
}

// Renders an authentic, original-styled console badge with official color scheme and emblem
export const ConsoleBadge: React.FC<{ consoleKey: string }> = ({ consoleKey }) => {
  const key = consoleKey.trim();

  // PLAYSTATION FAMILY
  if (key === 'PS1' || key === 'PlayStation 1' || key === 'PSX') {
    return (
      <span
        title="Sony PlayStation 1 (1994)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#252830] border border-[#3b404d] text-white shadow-sm hover:scale-105 transition"
      >
        {/* PS1 4-color logo icon */}
        <svg className="w-3.5 h-3.5" viewBox="0 0 32 32" fill="none">
          <path d="M12 4v16l5-2V2l-5 2z" fill="#E62E2D" />
          <path d="M17 18l5-2v-4l-5 2v4z" fill="#003791" />
          <path d="M22 12l6-2v-4l-6 2v4z" fill="#F4AC10" />
          <path d="M6 22c2 1 6 2 10 2s8-1 10-2-3-2-10-2-8 1-10 2z" fill="#00965E" />
        </svg>
        <span className="text-[10px] font-black tracking-tight text-zinc-100">PS1</span>
      </span>
    );
  }

  if (key === 'PS2' || key === 'PlayStation 2') {
    return (
      <span
        title="Sony PlayStation 2 (2000)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#001033] border border-[#0040c0]/50 text-white shadow-sm hover:scale-105 transition"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 5h7v2.5H4.5V11H9v2.5H4.5V19H2V5zm8 0h7c1.7 0 3 1.3 3 3v2c0 1.2-.7 2.2-1.7 2.7 1.2.5 1.7 1.5 1.7 2.8V16c0 1.7-1.3 3-3 3h-7V5zm2.5 2.5v3.5H16c.6 0 1-.4 1-1V8.5c0-.6-.4-1-1-1h-3.5zm0 6V16.5H16c.6 0 1-.4 1-1V14c0-.6-.4-1-1-1h-3.5z" fill="#0066FF" />
        </svg>
        <span className="text-[10px] font-black tracking-tighter text-[#4da6ff]">PS2</span>
      </span>
    );
  }

  if (key === 'PS3' || key === 'PlayStation 3') {
    return (
      <span
        title="Sony PlayStation 3 (2006)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#16161a] border border-red-950/80 text-white shadow-sm hover:scale-105 transition"
      >
        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-red-600 text-[8px] font-black text-white">
          3
        </span>
        <span className="text-[10px] font-black italic tracking-wider text-zinc-200">PS3</span>
      </span>
    );
  }

  if (key === 'PS4' || key === 'PlayStation 4') {
    return (
      <span
        title="Sony PlayStation 4 (2013)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#002466] border border-[#0055ff]/40 text-white shadow-sm hover:scale-105 transition"
      >
        <svg className="w-3 h-3 text-[#3385ff]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.5 2C7.1 2 6 3.1 6 4.5v15c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5v-15C11 3.1 9.9 2 8.5 2zm7 3.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zm0 6.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
        <span className="text-[10px] font-black tracking-tight text-[#80b3ff]">PS4</span>
      </span>
    );
  }

  if (key === 'PS5' || key === 'PlayStation 5') {
    return (
      <span
        title="Sony PlayStation 5 (2020)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-zinc-950 border border-white/30 text-white shadow-sm hover:scale-105 transition"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[10px] font-black tracking-widest text-white">PS5</span>
      </span>
    );
  }

  if (key === 'PlayStation' || key === 'PS Vita' || key === 'PSP') {
    return (
      <span
        title={key}
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-950/80 border border-blue-500/40 text-blue-300 shadow-sm hover:scale-105 transition"
      >
        <svg className="w-3 h-3 fill-current text-blue-400" viewBox="0 0 24 24">
          <path d="M8.5 2C7.1 2 6 3.1 6 4.5v15c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5v-15C11 3.1 9.9 2 8.5 2zm7 3.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z" />
        </svg>
        <span className="text-[10px] font-black">{key}</span>
      </span>
    );
  }

  // XBOX FAMILY
  if (key === 'Xbox' || key === 'Xbox Original' || key === 'Xbox (2001)') {
    return (
      <span
        title="Microsoft Xbox Original (2001)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#002b0c] border border-[#107c10]/60 text-white shadow-sm hover:scale-105 transition"
      >
        {/* Iconic Green Glowing X sphere */}
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 14.5c-1.1.6-2.4.9-3.8.9s-2.7-.3-3.8-.9c.7-1.1 1.9-2.7 3.8-4.7 1.9 2 3.1 3.6 3.8 4.7zm1.8-2c-.5-1-1.4-2.3-2.6-3.7 1.4-1.1 2.5-2.2 3.1-3 .2.4.4.9.5 1.3-.1 1.8-.4 3.6-1 5.4zm-11.2 0c-.6-1.8-.9-3.6-1-5.4.1-.4.3-.9.5-1.3.6.8 1.7 1.9 3.1 3-1.2 1.4-2.1 2.7-2.6 3.7z" fill="#52b848" />
        </svg>
        <span className="text-[10px] font-black tracking-tight text-[#66ff66]">Xbox</span>
      </span>
    );
  }

  if (key === 'Xbox 360' || key === 'X360') {
    return (
      <span
        title="Microsoft Xbox 360 (2005)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#1a2e1c] border border-[#26a63a]/50 text-white shadow-sm hover:scale-105 transition"
      >
        <div className="flex h-3 w-3 items-center justify-center rounded-full border border-[#52b848] bg-zinc-900 text-[8px] font-bold text-[#52b848]">
          ○
        </div>
        <span className="text-[10px] font-black tracking-tight text-[#80e599]">X360</span>
      </span>
    );
  }

  if (key === 'Xbox One' || key === 'XOne') {
    return (
      <span
        title="Microsoft Xbox One (2013)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#0e3314] border border-[#107c10] text-white shadow-sm hover:scale-105 transition"
      >
        <svg className="w-3 h-3 text-[#107c10]" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="#107c10" />
          <path d="M12 4l3 6h-6l3-6zm0 16l-3-6h6l-3 6z" fill="#000" />
        </svg>
        <span className="text-[10px] font-black tracking-tight text-emerald-300">XOne</span>
      </span>
    );
  }

  if (key === 'Xbox Series X/S' || key === 'Xbox Series' || key === 'XSX') {
    return (
      <span
        title="Microsoft Xbox Series X / S (2020)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#001f07] border border-[#22cc44]/70 text-white shadow-sm hover:scale-105 transition"
      >
        <span className="h-2 w-2 rounded-sm bg-[#107c10]" />
        <span className="text-[10px] font-black tracking-widest text-[#52ff77]">Series X|S</span>
      </span>
    );
  }

  // NINTENDO FAMILY
  if (key === 'NES' || key === 'Nintendo Entertainment System' || key === 'Famicom') {
    return (
      <span
        title="Nintendo Entertainment System (1985)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#252424] border border-[#d82800]/50 text-white shadow-sm hover:scale-105 transition"
      >
        <span className="h-2 w-2 rounded-sm bg-[#d82800]" />
        <span className="text-[10px] font-black tracking-wider text-zinc-100">NES</span>
      </span>
    );
  }

  if (key === 'Switch 2' || key === 'Nintendo Switch 2') {
    return (
      <span
        title="Nintendo Switch 2 (Next-Gen)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#3b0d11] border border-[#ffb800]/70 text-white shadow-sm hover:scale-105 transition"
      >
        <span className="h-2 w-2 rounded-full bg-[#ffb800]" />
        <span className="text-[10px] font-black tracking-tight text-yellow-300">Switch 2</span>
      </span>
    );
  }

  if (key === 'SNES' || key === 'Super Nintendo' || key === 'Super Famicom') {
    return (
      <span
        title="Super Nintendo Entertainment System (1990)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#252230] border border-[#6b5ca5]/50 text-white shadow-sm hover:scale-105 transition"
      >
        {/* Iconic 4 color Super Famicom / SNES buttons */}
        <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0070d2]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#ffd400]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#e60012]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#00a651]" />
        </div>
        <span className="text-[10px] font-black tracking-wider text-purple-200">SNES</span>
      </span>
    );
  }

  if (key === 'N64' || key === 'Nintendo 64') {
    return (
      <span
        title="Nintendo 64 (1996)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#1f1a33] border border-[#8555e0]/50 text-white shadow-sm hover:scale-105 transition"
      >
        {/* N64 3D colored cube symbol */}
        <svg className="w-3.5 h-3.5" viewBox="0 0 32 32">
          <path d="M16 2l12 6v14l-12 6-12-6V8l12-6z" fill="#00186b" />
          <path d="M16 2l12 6-12 6-12-6 12-6z" fill="#009944" />
          <path d="M4 8l12 6v14L4 22V8z" fill="#e60012" />
          <path d="M28 8v14l-12 6V14l12-6z" fill="#ffd400" />
        </svg>
        <span className="text-[10px] font-black tracking-tight text-amber-300">N64</span>
      </span>
    );
  }

  if (key === 'GameCube' || key === 'GC') {
    return (
      <span
        title="Nintendo GameCube (2001)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#25103a] border border-[#6b25a3] text-white shadow-sm hover:scale-105 transition"
      >
        {/* GameCube Purple G-cube */}
        <div className="flex h-3 w-3 items-center justify-center rounded bg-[#6a0dad] text-[8px] font-black text-white">
          G
        </div>
        <span className="text-[10px] font-black tracking-tight text-purple-300">GameCube</span>
      </span>
    );
  }

  if (key === 'Wii') {
    return (
      <span
        title="Nintendo Wii (2006)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#12283a] border border-[#3399cc]/50 text-white shadow-sm hover:scale-105 transition"
      >
        <span className="text-[10px] font-black tracking-tighter text-[#4dd2ff]">Wii</span>
      </span>
    );
  }

  if (key === 'Wii U') {
    return (
      <span
        title="Nintendo Wii U (2012)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#0a2333] border border-[#0099ff]/50 text-white shadow-sm hover:scale-105 transition"
      >
        <span className="text-[10px] font-black tracking-tighter text-[#4dd2ff]">
          Wii <strong className="text-cyan-400 font-black">U</strong>
        </span>
      </span>
    );
  }

  if (key === 'Switch' || key === 'Nintendo Switch') {
    return (
      <span
        title="Nintendo Switch (2017)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#330a0d] border border-[#e60012]/60 text-white shadow-sm hover:scale-105 transition"
      >
        {/* Switch Red/White Joy-Con logo */}
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#e60012">
          <path d="M11 2H6C3.8 2 2 3.8 2 6v12c0 2.2 1.8 4 4 4h5V2zm-3 8c-.8 0-1.5-.7-1.5-1.5S7.2 7 8 7s1.5.7 1.5 1.5S8.8 10 8 10zm2 7H6v-2h4v2zm3-15v20h5c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4h-5zm3 13c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
        </svg>
        <span className="text-[10px] font-black tracking-tight text-rose-300">Switch</span>
      </span>
    );
  }

  if (key === 'Game Boy' || key === 'GBC' || key === 'Game Boy Color') {
    return (
      <span
        title="Nintendo Game Boy / Color"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#252a25] border border-[#7d8b7d] text-white shadow-sm hover:scale-105 transition"
      >
        <div className="h-2 w-2 rounded-full bg-[#8b1845]" />
        <span className="text-[10px] font-black tracking-tighter text-[#9bbc0f]">GameBoy</span>
      </span>
    );
  }

  if (key === 'GBA' || key === 'Game Boy Advance') {
    return (
      <span
        title="Nintendo Game Boy Advance (2001)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#1f1a3d] border border-[#524496] text-white shadow-sm hover:scale-105 transition"
      >
        <span className="text-[10px] font-black tracking-wider text-[#9d8ff0]">GBA</span>
      </span>
    );
  }

  if (key === 'Nintendo DS' || key === 'DS') {
    return (
      <span
        title="Nintendo DS (2004)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#222429] border border-zinc-600 text-white shadow-sm hover:scale-105 transition"
      >
        <span className="text-[10px] font-black tracking-wider text-zinc-300">NDS</span>
      </span>
    );
  }

  if (key === 'Nintendo 3DS' || key === '3DS') {
    return (
      <span
        title="Nintendo 3DS (2011)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#331114] border border-[#e60012]/40 text-white shadow-sm hover:scale-105 transition"
      >
        <span className="text-[10px] font-black tracking-wider text-rose-300">3DS</span>
      </span>
    );
  }

  if (key === 'Nintendo') {
    return (
      <span
        title="Nintendo"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-rose-950/80 border border-rose-500/40 text-rose-300 shadow-sm hover:scale-105 transition"
      >
        <span className="text-[10px] font-black">Nintendo</span>
      </span>
    );
  }

  // SEGA FAMILY
  if (key === 'Dreamcast' || key === 'Sega Dreamcast') {
    return (
      <span
        title="Sega Dreamcast (1998)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#331c00] border border-[#ff6600]/60 text-white shadow-sm hover:scale-105 transition"
      >
        {/* Iconic Orange Dreamcast Swirl */}
        <svg className="w-3.5 h-3.5 text-[#ff7700]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6a6 6 0 0 1 6 6 4 4 0 0 1-4 4 2 2 0 0 1-2-2" strokeLinecap="round" />
        </svg>
        <span className="text-[10px] font-black tracking-tight text-orange-400">Dreamcast</span>
      </span>
    );
  }

  if (key === 'Mega Drive' || key === 'Genesis' || key === 'Sega Genesis') {
    return (
      <span
        title="Sega Mega Drive / Genesis (1988)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black border border-[#0055aa] text-white shadow-sm hover:scale-105 transition"
      >
        <span className="text-[10px] font-black italic tracking-widest text-[#3399ff]">SEGA</span>
      </span>
    );
  }

  // PC FAMILY
  if (key === 'PC' || key === 'Steam' || key === 'Windows') {
    return (
      <span
        title="PC (Windows / Steam / Mac)"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#0a1e2b] border border-[#1b75bb]/50 text-white shadow-sm hover:scale-105 transition"
      >
        {/* Steam / PC Display Monitor icon */}
        <svg className="w-3.5 h-3.5 text-[#42abff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        <span className="text-[10px] font-black tracking-tight text-sky-300">PC</span>
      </span>
    );
  }

  // Generic fallback
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-bold">
      {key}
    </span>
  );
};

export const PlatformIcons: React.FC<PlatformIconsProps> = ({
  platforms,
  className = '',
}) => {
  if (!platforms) return null;

  const rawList: string[] = Array.isArray(platforms)
    ? platforms
    : typeof platforms === 'string'
    ? platforms.split(/[,/•|]+/).map((s) => s.trim()).filter(Boolean)
    : [];

  if (rawList.length === 0) return null;

  return (
    <div className={`inline-flex items-center gap-1 sm:gap-1.5 justify-center flex-wrap ${className}`}>
      {rawList.map((plat, idx) => (
        <ConsoleBadge key={`${plat}-${idx}`} consoleKey={plat} />
      ))}
    </div>
  );
};
