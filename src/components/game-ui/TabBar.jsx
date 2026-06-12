function TabBar({ tabs, activeTab, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Abas do lobby">
      {tabs.map((tab) => {
        const active = tab.id === activeTab
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            data-focusable="true"
            className={`rounded-lg border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
              active
                ? 'border-white bg-white text-slate-950'
                : 'border-white/40 text-white hover:border-white/70 hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default TabBar
