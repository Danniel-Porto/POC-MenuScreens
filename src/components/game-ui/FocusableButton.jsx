import Icon from './Icon.jsx'

function FocusableButton({
  icon,
  label,
  onPress,
  variant = 'default',
  disabled = false,
  className = '',
  type = 'button',
  ...rest
}) {
  const danger = variant === 'danger'
  const baseClass =
    'group inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50'
  const toneClass = danger
    ? 'border-rose-300/70 text-rose-100 hover:bg-white hover:text-rose-700 focus-visible:bg-white focus-visible:text-rose-700'
    : 'border-white/60 text-white hover:bg-white hover:text-slate-950 focus-visible:bg-white focus-visible:text-slate-950'

  return (
    <button
      type={type}
      onClick={onPress}
      disabled={disabled}
      data-focusable="true"
      className={`${baseClass} ${toneClass} ${className}`}
      {...rest}
    >
      {icon ? <Icon name={icon} className="h-4 w-4 shrink-0" /> : null}
      <span>{label}</span>
    </button>
  )
}

export default FocusableButton
