function formatDynamicOption(option) {
  if (typeof option.value === 'boolean') {
    return `${option.label}: ${option.value ? 'Ligado' : 'Desligado'}`
  }
  return `${option.label}: ${option.value}`
}

function EventSummaryCard({ event, indexLabel }) {
  if (!event) {
    return <p className="text-sm text-slate-300">Nenhum evento configurado.</p>
  }

  const dynamicEntries = Object.entries(event.dynamicOptions || {})
    .filter(([, option]) => option?.visible !== false)
    .map(([, option]) => option)

  return (
    <article className="space-y-2 rounded-lg border border-white/15 bg-black/25 p-3">
      <header className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-white">{indexLabel || event.name}</h3>
        <span className="rounded bg-white/15 px-2 py-0.5 text-xs text-slate-100">{event.mode}</span>
      </header>
      <p className="text-xs text-slate-200">
        {event.circuit} • {event.timeOfDay} • {event.category}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {dynamicEntries.length === 0 ? (
          <span className="text-xs text-slate-300">Sem opções extras.</span>
        ) : (
          dynamicEntries.map((option) => (
            <span key={option.key} className="rounded bg-white/12 px-2 py-0.5 text-xs text-slate-100">
              {formatDynamicOption(option)}
            </span>
          ))
        )}
      </div>
    </article>
  )
}

export default EventSummaryCard
