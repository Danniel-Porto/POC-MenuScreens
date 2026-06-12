import { Link } from 'react-router-dom'

function PageShell({ title, subtitle, backToHome = false, children }) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <header className="mb-6 space-y-3 md:mb-8">
        {backToHome ? (
          <Link
            to="/"
            className="inline-flex items-center rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-200 transition hover:bg-slate-800"
          >
            Voltar para prototipos
          </Link>
        ) : null}
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          {title}
        </h1>
        {subtitle ? <p className="max-w-3xl text-sm text-slate-300 md:text-base">{subtitle}</p> : null}
      </header>
      {children}
    </main>
  )
}

export default PageShell
