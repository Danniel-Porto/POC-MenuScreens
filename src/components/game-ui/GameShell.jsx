function GameShell({ title, subtitle, children }) {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-slate-950 text-white"
      style={{
        backgroundImage:
          'linear-gradient(var(--lobby-bg-overlay), var(--lobby-bg-overlay)), url("/lobby-bg.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 md:px-8">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-wide md:text-3xl">{title}</h1>
            {subtitle ? <p className="max-w-3xl text-sm text-[var(--lobby-muted)]">{subtitle}</p> : null}
          </div>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </main>
  )
}

export default GameShell
