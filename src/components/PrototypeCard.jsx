import { Link } from 'react-router-dom'

function PrototypeCard({ id, title, description, tags = [] }) {
  return (
    <Link
      to={`/prototype/${id}`}
      className="group block rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-400/60 hover:bg-slate-900"
    >
      <h2 className="text-lg font-semibold text-white group-hover:text-cyan-300">{title}</h2>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}

export default PrototypeCard
