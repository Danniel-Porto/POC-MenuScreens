import FocusableButton from './FocusableButton.jsx'

function FieldContainer({ label, children }) {
  return (
    <label className="space-y-1.5">
      <span className="block text-xs font-semibold tracking-wide text-slate-200">{label}</span>
      {children}
    </label>
  )
}

export function SelectField({ label, value, options, onChange }) {
  const currentIndex = options.findIndex((option) => option === value)

  const step = (direction) => {
    const nextIndex = (currentIndex + direction + options.length) % options.length
    onChange(options[nextIndex])
  }

  return (
    <FieldContainer label={label}>
      <div className="flex items-center gap-2">
        <FocusableButton icon="event" label="-" onPress={() => step(-1)} className="min-w-12 px-2" />
        <div className="flex-1 rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-sm text-white">{value}</div>
        <FocusableButton icon="event" label="+" onPress={() => step(1)} className="min-w-12 px-2" />
      </div>
    </FieldContainer>
  )
}

export function ToggleField({ label, checked, onChange, activeLabel = 'Ligado', inactiveLabel = 'Desligado' }) {
  return (
    <FieldContainer label={label}>
      <button
        type="button"
        data-focusable="true"
        onClick={() => onChange(!checked)}
        className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
          checked
            ? 'border-white bg-white text-slate-950'
            : 'border-white/35 bg-black/30 text-slate-100 hover:border-white/65'
        }`}
      >
        {checked ? activeLabel : inactiveLabel}
      </button>
    </FieldContainer>
  )
}

export function TextField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <FieldContainer label={label}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-white/25 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
      />
    </FieldContainer>
  )
}
