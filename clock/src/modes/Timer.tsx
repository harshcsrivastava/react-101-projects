import { useState, useEffect, useRef, useCallback } from "react";

function Timer() {
  const [time, setTime] = useState<number | null>(null);
  const [left, setLeft] = useState("25");
  const [right, setRight] = useState("00");
  const [isStarted, setIsStarted] = useState(false);

  // useRef typed for browser setInterval (number ID)
  const intervalRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  // Input handlers
  const handleLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
    setLeft(val || "00");
  };

  const handleRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
    setRight(val || "00");
  };

  // Start countdown
  const handleStart = useCallback(() => {
    const totalSeconds = Number(left || "0") * 60 + Number(right || "0");
    if (totalSeconds <= 0) return; // prevent invalid start

    setTime(totalSeconds);
    setIsStarted(true);
    endTimeRef.current = Date.now() + totalSeconds * 1000;

    try {
      localStorage.setItem("endTime", String(endTimeRef.current));
    } catch {
      console.warn("LocalStorage unavailable");
    }

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      if (!endTimeRef.current) return;
      const remaining = Math.max(
        Math.floor((endTimeRef.current - Date.now()) / 1000),
        0
      );
      setTime(remaining);
      setLeft(
        `${Math.floor(remaining / 60) < 10 ? "0" : ""}${Math.floor(
          remaining / 60
        )}`
      );
      setRight(
        `${remaining % 60 < 10 ? "0" : ""}${remaining % 60}`
      );
      if (remaining === 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 1000);
  }, [left, right]);

  // Pause countdown
  const handlePause = useCallback(() => {
    setIsStarted(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    try {
      localStorage.removeItem("endTime");
    } catch {}
  }, []);

  // Reset countdown
  const handleReset = () => {
    setLeft("01");
    setRight("00");
    setTime(null);
    setIsStarted(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    endTimeRef.current = null;
    try {
      localStorage.removeItem("endTime");
    } catch {}
  };

  // Restore countdown from localStorage
  useEffect(() => {
    try {
      const savedEnd = localStorage.getItem("endTime");
      if (savedEnd) {
        const remaining = Math.floor((Number(savedEnd) - Date.now()) / 1000);
        if (remaining > 0) {
          setTime(remaining);
          setIsStarted(true);
          endTimeRef.current = Number(savedEnd);

          intervalRef.current = window.setInterval(() => {
            const r = Math.max(
              Math.floor((endTimeRef.current! - Date.now()) / 1000),
              0
            );
            setTime(r);
            if (r === 0 && intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
              localStorage.removeItem("endTime");
            }
          }, 1000);
        } else {
          localStorage.removeItem("endTime");
        }
      }
    } catch {
      console.warn("LocalStorage unavailable");
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Spacebar listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        isStarted ? handlePause() : handleStart();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isStarted, handleStart, handlePause]);

  return (
    <section className="flex h-full min-h-0 w-full items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-[1rem] font-semibold uppercase tracking-[0.5em] opacity-70">
          timer
        </p>
        <div className="font-mono text-[clamp(3.2rem,20vw,10rem)] font-black leading-none tabular-nums flex items-center gap-4">
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={
              time !== null
                ? `${Math.floor(time / 60) < 10 ? "0" : ""}${Math.floor(
                    time / 60
                  )}`
                : left
            }
            disabled={isStarted}
            onChange={handleLeftChange}
            className="w-44  bg-transparent text-center focus:outline-none leading-[1.2] h-auto py-1"
          />
          <span className="select-none text-[0.9em]">:</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={
              time !== null
                ? `${time % 60 < 10 ? "0" : ""}${time % 60}`
                : right
            }
            disabled={isStarted}
            onChange={handleRightChange}
            className="w-44  bg-transparent text-center focus:outline-none leading-[1.2] h-auto py-1"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {["Start", "Pause", "Reset"].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                if (label === "Start") handleStart();
                if (label === "Pause") handlePause();
                if (label === "Reset") handleReset();
              }}
              disabled={label === "Start" ? isStarted : false}
              className="rounded-full border border-current/18 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.35em] transition hover:bg-current/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timer;
