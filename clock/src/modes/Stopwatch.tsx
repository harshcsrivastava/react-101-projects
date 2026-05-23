function Stopwatch() {
  return (
    <section className="flex h-full min-h-0 w-full items-center justify-center px-3 sm:px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] opacity-60">
          stopwatch
        </p>
        <div className="font-mono text-[clamp(3.2rem,10vw,6rem)] font-black leading-none tabular-nums">
          00:12:48
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {['Start', 'Pause', 'Reset'].map((label) => (
            <button
              key={label}
              type="button"
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
