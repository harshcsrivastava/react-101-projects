import { useEffect, useState, type ReactNode } from 'react';
import type {
  ClockMode,
  ClockType,
  ThemeKey,
  TimeFormat,
} from '../themePresets';
import { themeOrder, themePresets } from '../themePresets';
import Stopwatch from '../modes/Stopwatch';
import Timer from '../modes/Timer';

interface ClockApplicationShellProps {
  currentMode: ClockMode;
  currentTheme: ThemeKey;
  clockType: ClockType;
  showSeconds: boolean;
  timeFormat: TimeFormat;
  controlsHidden: boolean;
  isFullscreen: boolean;
  onModeChange: (mode: ClockMode) => void;
  onThemeChange: (theme: ThemeKey) => void;
  onClockTypeChange: (clockType: ClockType) => void;
  onToggleShowSeconds: () => void;
  onToggleTimeFormat: () => void;
  onToggleControlsHidden: () => void;
  onToggleFullscreen: () => void;
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

function ChipButton({
  active,
  children,
  onClick,
  className,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:px-4 sm:text-[11px]',
        className
      )}
    >
      {children}
    </button>
  );
}

function ThemeChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'inline-flex items-center rounded-full border px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:px-3 sm:py-2 sm:text-[10px]',
        active ? 'ring-1 ring-inset ring-current' : 'opacity-80'
      )}
    >
      {label}
    </button>
  );
}

function FullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M9 3H3v6m12-6h6v6M9 21H3v-6m12 6h6v-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExitFullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M9 9H3V3m12 6h6V3M9 15H3v6m12-6h6v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M3 12c1.7-4.3 5.1-7 9-7s7.3 2.7 9 7c-1.7 4.3-5.1 7-9 7s-7.3-2.7-9-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 4l16 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M3 12c1.7-4.3 5.1-7 9-7s7.3 2.7 9 7c-1.7 4.3-5.1 7-9 7s-7.3-2.7-9-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ClockDigits({
  clockType,
  showSeconds,
  timeFormat,
}: {
  clockType: ClockType;
  showSeconds: boolean;
  timeFormat: TimeFormat;
}) {
  
const [time, setTime] = useState(new Date());
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

useEffect(() => {
  const interval = setInterval(() => setTime(new Date()), 1000)
  
  return () => clearInterval(interval)
}, [])

console.log(time)
  // const value =
  //   timeFormat === '12hr'
  //     ? showSeconds
  //       ? '09 : 41 : 08'
  //       : '09 : 41'
  //     : showSeconds
  //       ? '21 : 41 : 08'
  //       : '21 : 41';
const value = time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: showSeconds ? "2-digit" : undefined,
          hour12: timeFormat === "12hr" ? true : false,
          timeZone: userTimeZone,
        })
  // if (clockType === 'analog') {
  //   return (
  //     <div className="relative aspect-square w-full max-w-[26rem] sm:max-w-[32rem]">
  //       <div className="absolute inset-0 rounded-full border border-current/12" />
  //       <div className="absolute inset-[13%] rounded-full border border-current/8" />
  //       <div
  //         className="absolute left-1/2 top-1/2 h-[28%] w-[0.45rem] origin-bottom -translate-x-1/2 rounded-full bg-current"
  //         style={{ transform: 'translate(-50%, -100%) rotate(18deg)' }}
  //       />
  //       <div
  //         className="absolute left-1/2 top-1/2 h-[36%] w-[0.28rem] origin-bottom -translate-x-1/2 rounded-full bg-current/80"
  //         style={{ transform: 'translate(-50%, -100%) rotate(96deg)' }}
  //       />
  //       {showSeconds ? (
  //         <div
  //           className="absolute left-1/2 top-1/2 h-[40%] w-[0.16rem] origin-bottom -translate-x-1/2 rounded-full bg-rose-400 shadow-[0_0_16px_currentColor]"
  //           style={{ transform: 'translate(-50%, -100%) rotate(188deg)' }}
  //         />
  //       ) : null}
  //       <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
  //     </div>
  //   );
  // }

  if (clockType === "analog") {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate angles
  const hourAngle = (hours % 12) * 30 + minutes * 0.5; // 30° per hour + fraction
  const minuteAngle = minutes * 6 + seconds * 0.1;     // 6° per minute + fraction
  const secondAngle = seconds * 6;                     // 6° per second

  return (
    <div className="relative aspect-square w-full max-w-[26rem] sm:max-w-[32rem]">
      {/* Outer rings */}
      <div className="absolute inset-0 rounded-full border border-current/12" />
      <div className="absolute inset-[13%] rounded-full border border-current/8" />

      {/* Hour hand */}
      <div
        className="absolute left-1/2 top-1/2 h-[28%] w-[0.45rem] origin-bottom -translate-x-1/2 rounded-full bg-current"
        style={{ transform: `translate(-50%, -100%) rotate(${hourAngle}deg)` }}
      />

      {/* Minute hand */}
      <div
        className="absolute left-1/2 top-1/2 h-[36%] w-[0.28rem] origin-bottom -translate-x-1/2 rounded-full bg-current/80"
        style={{ transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)` }}
      />

      {/* Second hand (optional) */}
      {showSeconds && (
        <div
          className="absolute left-1/2 top-1/2 h-[40%] w-[0.16rem] origin-bottom -translate-x-1/2 rounded-full bg-rose-400 shadow-[0_0_16px_currentColor]"
          style={{ transform: `translate(-50%, -100%) rotate(${secondAngle}deg)` }}
        />
      )}

      {/* Center dot */}
      <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
    </div>
  );
}


  return (
    <div className="w-full text-center">
      <div
        className="font-mono text-[clamp(2.9rem,8vw,6.3rem)] font-black leading-none tracking-[0.04em] tabular-nums sm:text-[clamp(3.4rem,9vw,7.2rem)]"
        aria-label={`Current time ${value}`}
      >
        {value}
      </div>
    </div>
  );
}

function ModeSurface({ currentMode }: { currentMode: ClockMode }) {
  if (currentMode === 'timer') {
    return <Timer />;
  }

  if (currentMode === 'stopwatch') {
    return <Stopwatch />;
  }

  return null;
}

function ModeDock({
  currentMode,
  onModeChange,
}: {
  currentMode: ClockMode;
  onModeChange: (mode: ClockMode) => void;
}) {
  const inactiveModes = (['clock', 'timer', 'stopwatch'] as ClockMode[]).filter(
    (mode) => mode !== currentMode
  );

  return (
    <div className="flex items-center gap-2">
      {inactiveModes.map((mode) => (
        <ChipButton
          key={mode}
          active={false}
          onClick={() => onModeChange(mode)}
        >
          {mode}
        </ChipButton>
      ))}
    </div>
  );
}

export default function ClockApplicationShell({
  currentMode,
  currentTheme,
  clockType,
  showSeconds,
  timeFormat,
  controlsHidden,
  isFullscreen,
  onModeChange,
  onThemeChange,
  onClockTypeChange,
  onToggleShowSeconds,
  onToggleTimeFormat,
  onToggleControlsHidden,
  onToggleFullscreen,
}: ClockApplicationShellProps) {
  const theme = themePresets[currentTheme];

  if (isFullscreen) {
    return (
      <div
        className={cx(
          'relative h-screen w-screen select-none overflow-hidden',
          theme.shellClass,
          currentTheme
        )}
      >
        {currentTheme === 'font-theme-sakura' ? (
          <>
            {/* Background image with soft blur */}
            <img
              src="/sakura-bg.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-90 blur-[0.5px] saturate-110 contrast-105"
            />

            {/* Gentle radial + gradient overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,182,193,0.18)_0,rgba(255,182,193,0.08)_22%,transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,245,247,0.9)_62%,rgba(255,240,245,1))] " />

            {/* Subtle blossom texture */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-20 blur-xl [background-image:radial-gradient(circle_at_1px_1px,rgba(255,200,220,0.4)_1px,transparent_0),radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:48px_48px,96px_96px] [background-position:0_0,24px_24px]" />

            {/* Accent glow layers */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-25 blur-2xl [background-image:radial-gradient(circle_at_40%_40%,rgba(255,182,193,0.26)_0,transparent_18%),radial-gradient(circle_at_60%_60%,rgba(255,105,180,0.18)_0,transparent_16%),radial-gradient(circle_at_30%_60%,rgba(255,192,203,0.12)_0,transparent_18%)]" />

            {/* Sakura foreground with smooth float */}
            <img
              src="/sakura.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-[-15%] z-10 w-[52vw] max-w-[50rem] opacity-95 drop-shadow-[0_0_36px_rgba(255,182,193,0.24)] blur-[2px] backdrop-blur-[20px] animate-float"
            />
          </>
        ) : null}
        <div
          className={cx(
            'relative flex h-full w-full items-center  z-200 justify-center',
            currentTheme === 'font-theme-sakura' ? 'text-[#EFA3B0]' : ''
          )}
        >
          {currentMode === 'clock' ? (
            <ClockDigits
              clockType={clockType}
              showSeconds={showSeconds}
              timeFormat={timeFormat}
            />
          ) : (
            <ModeSurface currentMode={currentMode} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cx(
        'relative h-screen w-screen select-none overflow-hidden',
        theme.shellClass,
        currentTheme
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:20px_20px]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-24 blur-3xl [background-image:linear-gradient(rgba(255,255,255,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.11)_1px,transparent_1px),radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_46%)] [background-size:56px_56px,56px_56px,100%_100%] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.95),rgba(0,0,0,0.4)_42%,rgba(0,0,0,0.08)_76%,transparent_100%)]" />
      {currentTheme === 'font-theme-Minecraft' ? (
        <>
          <div className="pointer-events-none absolute inset-0 z-0 opacity-58 blur-2xl [background-image:radial-gradient(circle_at_1px_1px,rgba(255,233,120,0.42)_1px,transparent_0)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.95),rgba(0,0,0,0.24)_45%,rgba(0,0,0,0.03))]" />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-20 blur-2xl [background-image:radial-gradient(circle_at_center,rgba(255,209,90,0.16)_0,transparent_22%),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:70%_70%,64px_64px,64px_64px]" />
          <img
            src="/sword.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[3%] top-[13%] z-0 w-[48vw] max-w-[44rem] rotate-[-14deg] opacity-92 blur-[1.35px] drop-shadow-[0_0_34px_rgba(255,204,51,0.26)]"
          />
          <img
            src="/hammer.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[8%] top-[-60%] z-0 w-[24vw] max-w-[22rem] rotate-[12deg] opacity-60 blur-[1.35px] drop-shadow-[0_0_26px_rgba(255,84,84,0.2)]"
          />
        </>
      ) : null}

      {currentTheme === 'font-theme-sakura' ? (
        <>
          {/* Background image with soft blur */}
          <img
            src="/sakura-bg.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-90 blur-[0.5px] saturate-110 contrast-105"
          />

          {/* Gentle radial + gradient overlay */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,182,193,0.18)_0,rgba(255,182,193,0.08)_22%,transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,245,247,0.9)_62%,rgba(255,240,245,1))] " />

          {/* Subtle blossom texture */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-20 blur-xl [background-image:radial-gradient(circle_at_1px_1px,rgba(255,200,220,0.4)_1px,transparent_0),radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:48px_48px,96px_96px] [background-position:0_0,24px_24px]" />

          {/* Accent glow layers */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-25 blur-2xl [background-image:radial-gradient(circle_at_40%_40%,rgba(255,182,193,0.26)_0,transparent_18%),radial-gradient(circle_at_60%_60%,rgba(255,105,180,0.18)_0,transparent_16%),radial-gradient(circle_at_30%_60%,rgba(255,192,203,0.12)_0,transparent_18%)]" />

          {/* Sakura foreground with smooth float */}
          <img
            src="/sakura.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[-15%] bottom-[-60%] z-10 w-[52vw] max-w-[50rem] opacity-95 drop-shadow-[0_0_36px_rgba(255,182,193,0.24)] animate-float"
          />
        </>
      ) : null}

      {currentTheme === 'font-theme-samurai' ? (
        <>
          {/* Background image with reduced blur */}
          <img
            src="/temple-bg.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-75 saturate-125 contrast-110"
          />

          {/* Radial + gradient overlay */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,112,52,0.14)_0,rgba(255,112,52,0.06)_18%,transparent_44%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.68)_62%,rgba(0,0,0,0.9))] backdrop-blur-xs" />

          {/* Patterned texture overlay */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-20 blur-2xl [background-image:radial-gradient(circle_at_1px_1px,rgba(255,202,127,0.4)_1px,transparent_0),radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:54px_54px,96px_96px] [background-position:0_0,24px_24px]" />

          {/* Accent radial glows */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-30 blur-3xl [background-image:radial-gradient(circle_at_45%_44%,rgba(255,146,74,0.26)_0,transparent_18%),radial-gradient(circle_at_62%_60%,rgba(255,78,47,0.18)_0,transparent_16%),radial-gradient(circle_at_30%_60%,rgba(255,197,117,0.12)_0,transparent_18%)]" />

          {/* Samurai foreground with floating effect */}
          <img
            src="/samurai.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[-2%] bottom-[-4%] z-10 w-[56vw] max-w-[54rem] opacity-90 blur-[0.6px] drop-shadow-[0_0_46px_rgba(255,91,43,0.24)] animate-float"
          />
        </>
      ) : null}

      {currentTheme === 'font-theme-indian' ? (
        <>
          <div className="pointer-events-none absolute inset-0 z-0 opacity-52 blur-3xl [background-image:radial-gradient(circle_at_50%_45%,rgba(255,202,123,0.26)_0,rgba(255,202,123,0.16)_11%,transparent_35%),radial-gradient(circle_at_50%_45%,rgba(80,180,160,0.22)_0,rgba(80,180,160,0.12)_18%,transparent_46%),repeating-conic-gradient(from 0deg at 50% 45%,rgba(255,184,92,0.18)_0deg 8deg,rgba(0,0,0,0)_8deg 16deg),repeating-radial-gradient(circle at 50% 45%,rgba(255,255,255,0.12)_0 1px,transparent 1px 18px)] [background-size:100%_100%] [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.96),rgba(0,0,0,0.24)_66%,transparent_88%)]" />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-20 blur-2xl [background-image:radial-gradient(circle_at_20%_28%,rgba(255,138,94,0.18)_0,transparent_14%),radial-gradient(circle_at_80%_22%,rgba(255,196,90,0.16)_0,transparent_12%),radial-gradient(circle_at_15%_82%,rgba(83,166,141,0.16)_0,transparent_14%),radial-gradient(circle_at_82%_80%,rgba(255,244,214,0.12)_0,transparent_13%)]" />
          <img
            src="/bird.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[1%] bottom-[-1%] z-0 w-[34vw] max-w-[28rem] opacity-84 blur-[0.6px] drop-shadow-[0_0_32px_rgba(255,170,92,0.22)]"
          />
        </>
      ) : null}

      <div className="relative z-10 flex h-full w-full flex-col">
        {!controlsHidden ? (
          <header className="absolute left-0 right-0 top-0 z-20 px-3 pt-3 sm:px-4 lg:px-6 lg:pt-4">
            <div
              className={cx(
                'mx-auto flex w-fit max-w-[calc(100vw-1.5rem)] items-center justify-center rounded-[1rem] px-3 py-2 sm:px-4 sm:py-3',
                theme.chromeClass
              )}
            >
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                {themeOrder.map((themeKey) => (
                  <ThemeChip
                    key={themeKey}
                    label={themePresets[themeKey].label}
                    active={currentTheme === themeKey}
                    onClick={() => onThemeChange(themeKey)}
                  />
                ))}
              </div>
            </div>
          </header>
        ) : null}

        <main
          className={cx(
            'relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 sm:px-4 lg:px-6',
            controlsHidden ? 'pt-0 pb-0' : 'pb-[6rem] pt-[6rem]'
          )}
        >
          {currentMode === 'clock' ? (
            <div
              className={cx(
                'relative flex h-full min-h-0 w-full items-center justify-center',
                theme.stageClass
              )}
            >
              <ClockDigits
                clockType={clockType}
                showSeconds={showSeconds}
                timeFormat={timeFormat}
              />
            </div>
          ) : (
            <div
              className={cx(
                'relative flex h-full min-h-0 w-full items-center justify-center',
                theme.stageClass
              )}
            >
              <ModeSurface currentMode={currentMode} />
            </div>
          )}
        </main>

        {!isFullscreen ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3 pb-3 sm:px-4 lg:px-6 lg:pb-4">
            <div className="flex items-end justify-between gap-3">
              {!controlsHidden ? (
                <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-transparent px-0 py-0">
                  <ModeDock
                    currentMode={currentMode}
                    onModeChange={onModeChange}
                  />
                </div>
              ) : null}

              <div className="pointer-events-auto flex items-center rounded-full bg-transparent px-0 py-0">
                {!controlsHidden ? (
                  <button
                    type="button"
                    aria-pressed={isFullscreen}
                    aria-label={
                      isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'
                    }
                    onClick={onToggleFullscreen}
                    className={cx(
                      'inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:px-4 sm:text-[11px]',
                      'border-0 bg-transparent',
                      isFullscreen ? theme.buttonActiveClass : ''
                    )}
                  >
                    {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
                    fullscreen
                  </button>
                ) : null}
              </div>

              {!controlsHidden ? (
                <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-transparent px-0 py-0">
                  <ChipButton
                    active={clockType === 'analog'}
                    onClick={() =>
                      onClockTypeChange(
                        clockType === 'analog' ? 'digital' : 'analog'
                      )
                    }
                    className={cx(
                      'border-0 bg-transparent',
                      clockType === 'analog'
                        ? 'bg-white/10 text-inherit'
                        : 'opacity-80'
                    )}
                  >
                    {clockType}
                  </ChipButton>
                  <ChipButton
                    active={showSeconds}
                    onClick={onToggleShowSeconds}
                    className={cx(
                      'border-0 bg-transparent',
                      showSeconds ? 'bg-white/10 text-inherit' : 'opacity-80'
                    )}
                  >
                    seconds
                  </ChipButton>
                  <ChipButton
                    active={timeFormat === '24hr'}
                    onClick={onToggleTimeFormat}
                    className={cx(
                      'border-0 bg-transparent',
                      timeFormat === '24hr'
                        ? 'bg-white/10 text-inherit'
                        : 'opacity-80'
                    )}
                  >
                    {timeFormat}
                  </ChipButton>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {!isFullscreen ? (
          <button
            type="button"
            aria-pressed={controlsHidden}
            aria-label={controlsHidden ? 'Show controls' : 'Hide controls'}
            onClick={onToggleControlsHidden}
            className="absolute bottom-3 right-3 z-30 inline-flex items-center justify-center rounded-full border border-white/12 bg-black/20 p-2 text-current backdrop-blur-md transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:bottom-4 sm:right-4"
          >
            <EyeIcon hidden={controlsHidden} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
