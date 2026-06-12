function Panel({ title, rightSlot, children, className = '' }) {
  return (
    <section
      className={`rounded-xl border border-[var(--lobby-border)] bg-[var(--lobby-panel)] p-4 backdrop-blur-sm ${className}`}
    >
      {title || rightSlot ? (
        <header className="mb-3 flex items-center justify-between gap-2">
          {title ? <h2 className="text-base font-semibold tracking-wide text-white">{title}</h2> : <span />}
          {rightSlot}
        </header>
      ) : null}
      {children}
    </section>
  )
}

export default Panel
