function ActionBar({ hints }) {
  return (
    <footer className="mt-4 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-xs text-slate-200">
      <div className="flex flex-wrap items-center gap-3">
        {hints.map((hint) => (
          <p key={hint.label} className="inline-flex items-center gap-1.5">
            <span className="rounded border border-white/30 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">
              {hint.button}
            </span>
            <span>{hint.label}</span>
          </p>
        ))}
      </div>
    </footer>
  )
}

export default ActionBar
