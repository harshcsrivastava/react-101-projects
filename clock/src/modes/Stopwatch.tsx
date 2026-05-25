/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useCallback, useEffect, useRef, useState } from 'react';


function Stopwatch() {
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setStopwatchRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Run interval only when running
  useEffect(() => {
    if (!isStopwatchRunning) return;
    const inter = setInterval(() => {
      setStopwatchTime((prev) => prev + 1);
    }, 1000);

    intervalRef.current = inter;
    return () => clearInterval(inter);
  }, [isStopwatchRunning, setStopwatchTime]);

  const handleStart = useCallback(() => {
    setStopwatchRunning(true);
  }, [setStopwatchRunning]);

  const handlePause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStopwatchRunning(false);
  }, [setStopwatchRunning]);

  const handleReset = useCallback(() => {
    setStopwatchTime(0);
    setStopwatchRunning(false);
  }, [setStopwatchTime, setStopwatchRunning]);

  // Spacebar listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        isStopwatchRunning ? handlePause() : handleStart();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handlePause, handleStart, isStopwatchRunning]);

  // Defensive: ensure stopwatchTime is always a valid number
  const safeTime = Number.isFinite(stopwatchTime) ? stopwatchTime : 0;

  return (
    <section className="flex h-full min-h-0 w-full items-center justify-center px-3 sm:px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] opacity-60">
          stopwatch
        </p>
        <div className="font-mono text-[clamp(3.2rem,10vw,6rem)] font-black leading-none tabular-nums">
          {`${Math.floor(safeTime / 3600) <= 9 ? '0' : ''}${Math.floor(safeTime / 3600)}`}
          :
          {`${Math.floor(safeTime / 60) % 60 <= 9 ? '0' : ''}${Math.floor(safeTime / 60) % 60}`}
          :
          {`${safeTime % 60 <= 9 ? '0' : ''}${safeTime % 60}`}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {['Start', 'Pause', 'Reset'].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                if (label === 'Start') handleStart();
                if (label === 'Pause') handlePause();
                if (label === 'Reset') handleReset();
              }}
              disabled={label === 'Start' ? isStopwatchRunning : false}
              className="rounded-full border border-current/18 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] transition hover:bg-current/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stopwatch;
