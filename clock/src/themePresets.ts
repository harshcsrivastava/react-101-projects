export type ClockMode = 'clock' | 'timer' | 'stopwatch';
export type ClockType = 'analog' | 'digital';
export type TimeFormat = '12hr' | '24hr';

export type ThemeKey =
  | 'font-theme-dark'
  | 'font-theme-light'
  | 'font-theme-chai'
  | 'font-theme-Minecraft'
  | 'font-theme-indian'
  | 'font-theme-sakura'
  | 'font-theme-samurai';

export interface ThemePreset {
  label: string;
  shellClass: string;
  stageClass: string;
  panelClass: string;
  chromeClass: string;
  chipClass: string;
  buttonClass: string;
  buttonActiveClass: string;
  displayClass: string;
  accentClass: string;
  strokeClass: string;
  railClass: string;
  accentAssetClass?: string;
  secondaryAssetClass?: string;
}

export const themePresets: Record<ThemeKey, ThemePreset> = {
  'font-theme-dark': {
    label: 'Pure Dark',
    shellClass: 'bg-[#09090b] text-zinc-100',
    stageClass: 'bg-[#0f0f14]/92 shadow-[0_32px_100px_rgba(0,0,0,0.72)]',
    panelClass: 'border border-white/8 bg-white/[0.03]',
    chromeClass: 'border-white/10 bg-white/[0.04] text-zinc-100',
    chipClass: 'border-white/10 bg-white/[0.04] text-zinc-200',
    buttonClass: 'border border-white/10 bg-white/[0.04] text-zinc-100',
    buttonActiveClass:
      'border-white/20 bg-white/8 text-white ring-1 ring-white/10',
    displayClass: 'text-zinc-50',
    accentClass: 'text-emerald-300',
    strokeClass: 'text-transparent [-webkit-text-fill-color:transparent]',
    railClass: 'text-zinc-300',
  },
  'font-theme-light': {
    label: 'Pure Light',
    shellClass: 'bg-[#fdfdfc] text-zinc-950',
    stageClass: 'bg-white shadow-[0_30px_90px_rgba(15,23,42,0.08)]',
    panelClass: 'border border-zinc-950/8 bg-white',
    chromeClass: 'border-zinc-950/10 bg-zinc-950/[0.03] text-zinc-900',
    chipClass: 'border-zinc-950/10 bg-white text-zinc-700',
    buttonClass: 'border border-zinc-950/10 bg-white text-zinc-900',
    buttonActiveClass:
      'border-zinc-950/30 bg-zinc-950/[0.05] text-zinc-950 ring-1 ring-zinc-950/10',
    displayClass: 'text-zinc-950',
    accentClass: 'text-zinc-900',
    strokeClass: 'text-transparent [-webkit-text-fill-color:transparent]',
    railClass: 'text-zinc-700',
  },
  'font-theme-chai': {
    label: 'Chai Theme',
    shellClass:
      'bg-[radial-gradient(circle_at_top_right,_rgba(255,219,182,0.94),_rgba(255,246,236,0.98)_34%,_#fffaf3_100%)] text-zinc-950',
    stageClass:
      'rounded-[1.5rem] bg-[linear-gradient(180deg,_rgba(255,255,255,0.76),_rgba(255,249,240,0.9))] shadow-[0_24px_70px_rgba(168,103,58,0.12)] backdrop-blur-xl',
    panelClass: 'rounded-[1.25rem] border border-amber-900/8 bg-white/72',
    chromeClass: 'border-amber-900/10 bg-white/72 text-zinc-900',
    chipClass: 'border-amber-900/14 bg-white/80 text-zinc-700',
    buttonClass: 'border border-amber-900/12 bg-white/84 text-zinc-950',
    buttonActiveClass:
      'border-amber-900/24 bg-amber-50/70 text-amber-950 ring-1 ring-amber-900/10',
    displayClass: 'text-zinc-950',
    accentClass: 'text-amber-950',
    strokeClass: 'text-transparent [-webkit-text-fill-color:transparent]',
    railClass: 'text-zinc-700',
  },
  'font-theme-Minecraft': {
    label: 'Minecraft',
    shellClass:
      'bg-[radial-gradient(circle_at_center,_rgba(255,207,74,0.16),transparent_30%),linear-gradient(180deg,_#3b3b3d_0%,_#161616_100%)] text-[#f6efff]',
    stageClass: 'rounded-none bg-transparent shadow-none',
    panelClass: 'rounded-none border border-[#f4d747]/18 bg-[#171717]/55',
    chromeClass: 'border-[#f4d747]/18 bg-[#1a1a1a]/62 text-[#f8f1ff]',
    chipClass: 'border-[#f4d747]/24 bg-[#1a1a1a]/70 text-[#f8f1ff]',
    buttonClass: 'border border-[#f4d747]/26 bg-[#1a1a1a]/72 text-[#f8f1ff]',
    buttonActiveClass:
      'border-[#fff26c]/35 bg-[#f4d747]/14 text-[#fff8c7] ring-1 ring-[#fff26c]/18',
    displayClass: 'text-[#fff3b0]',
    accentClass: 'text-[#ffd95c]',
    strokeClass: 'text-transparent [-webkit-text-fill-color:transparent]',
    railClass: 'text-[#efe8ff]',
  },
  'font-theme-indian': {
    label: 'Indian',
    shellClass:
      'bg-[radial-gradient(circle_at_top,_rgba(255,182,92,0.18),transparent_26%),linear-gradient(180deg,_#0f1312_0%,_#181f1d_45%,_#111511_100%)] text-[#f7e7c6]',
    stageClass: 'bg-transparent shadow-none',
    panelClass: 'bg-transparent',
    chromeClass:
      'border-[#d4a46a]/18 bg-[#151916]/55 text-[#f7e7c6] backdrop-blur-lg',
    chipClass: 'border-[#d4a46a]/18 bg-[#151916]/72 text-[#f7e7c6]',
    buttonClass: 'border border-[#d4a46a]/18 bg-[#151916]/72 text-[#f7e7c6]',
    buttonActiveClass:
      'border-[#d4a46a]/28 bg-[#d4a46a]/12 text-[#fff1cf] ring-1 ring-[#d4a46a]/12',
    displayClass: 'text-[#f7e7c6]',
    accentClass: 'text-[#efb35a]',
    strokeClass: 'text-transparent [-webkit-text-fill-color:transparent]',
    railClass: 'text-[#7a402f]',
  },
  'font-theme-sakura': {
    label: 'Sakura',
    shellClass:
      'bg-[radial-gradient(circle_at_top,rgba(255,232,241,0.96),rgba(255,255,255,0.98)_40%,#fff8f5_100%)] text-[#EFA3B0]',
    stageClass:
      'rounded-[1.75rem]  shadow-[0_20px_60px_rgba(236,72,153,0.12)] ',
    panelClass:
      'rounded-[1.5rem] border border-rose-300/20 bg-white/85 shadow-[0_0_40px_rgba(236,72,153,0.18)]',
    chromeClass:
      'border-rose-200/60 bg-white/85 backdrop-blur-xl text-[#54172e]',
    chipClass: 'border-rose-200/60 bg-white/85 text-[#7c2946]',
    buttonClass:
      'border border-rose-300/40 bg-white text-[#54172e] transition-colors duration-300 ease-in-out',
    buttonActiveClass:
      'border-rose-400/40 bg-rose-50 text-[#8a3152] ring-1 ring-rose-300/20',
    displayClass: 'text-[#54172e] font-poppins tracking-wide',
    accentClass: 'text-rose-500',
    strokeClass: 'text-transparent [-webkit-text-fill-color:transparent]',
    railClass: 'text-[#7c2946]',
  },
  'font-theme-samurai': {
    label: 'Samurai',
    shellClass:
      'bg-[radial-gradient(circle_at_top,rgba(255,120,72,0.24),transparent_28%),radial-gradient(circle_at_center,rgba(255,70,38,0.12),transparent_42%),linear-gradient(180deg,#09090d_0%,#050506_42%,#030304_100%)] text-[#fff2e6]',
    stageClass: 'bg-transparent shadow-none',
    panelClass: 'bg-transparent',
    chromeClass:
      'border-orange-400/16 bg-[#0f1014]/48 text-[#fff2e6] backdrop-blur-md',
    chipClass: 'border-orange-400/16 bg-[#0f1014]/64 text-[#ffe8d4]',
    buttonClass:
      'border border-orange-400/18 bg-[#0f1014]/68 text-[#fff2e6] transition-colors duration-300 ease-in-out',
    buttonActiveClass:
      'border-orange-300/24 bg-orange-400/14 text-[#fff3e7] ring-1 ring-orange-300/14',
    displayClass: 'text-[#fff2e6] font-orbitron tracking-wide',
    accentClass: 'text-[#ffb46a]',
    strokeClass: 'text-transparent [-webkit-text-fill-color:transparent]',
    railClass: 'text-[#ffd4d4]',
  },
};

export const themeOrder: ThemeKey[] = [
  'font-theme-dark',
  'font-theme-light',
  'font-theme-chai',
  'font-theme-Minecraft',
  'font-theme-indian',
  'font-theme-sakura',
  'font-theme-samurai',
];
