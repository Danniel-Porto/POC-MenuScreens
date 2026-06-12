function getPingColor(ping) {
  if (ping <= 60) return 'text-emerald-300'
  if (ping <= 120) return 'text-amber-300'
  return 'text-rose-300'
}

function PlayerRow({ player, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-focusable="true"
      className={`grid w-full grid-cols-[1.8fr_0.6fr_1fr_0.8fr] items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        isSelected
          ? 'border-white bg-white text-slate-950'
          : 'border-white/20 bg-black/20 text-slate-100 hover:border-white/50 hover:bg-black/30'
      }`}
    >
      <div className="min-w-0">
        <p className="truncate font-medium">{player.name}</p>
        <p className="truncate text-xs opacity-80">{player.platform}</p>
      </div>
      <p className={`text-xs font-semibold ${isSelected ? 'text-slate-700' : getPingColor(player.ping)}`}>
        {player.ping}ms
      </p>
      <p className="truncate text-xs">{player.vehicle}</p>
      <p className="justify-self-end text-xs font-semibold">{player.isReady ? 'Pronto' : 'Aguardando'}</p>
    </button>
  )
}

export default PlayerRow
