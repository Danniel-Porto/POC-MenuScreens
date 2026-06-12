const iconMap = {
  play: (
    <path d="M7 5.5v13l10-6.5z" />
  ),
  exit: (
    <path d="M3.5 4.5h10v3h-2v-1h-6v11h6v-1h2v3h-10zm10.5 5h6l-2.5-2.5 1.4-1.4L24 11l-5.1 5.4-1.4-1.4 2.5-2.5h-6z" transform="scale(0.82)" />
  ),
  settings: (
    <path d="M13.2 2.8h2.6l.4 2a8.8 8.8 0 0 1 1.7.9l1.8-1.1 1.8 1.9-1.1 1.8c.4.5.7 1.1.9 1.7l2 .4v2.6l-2 .4c-.2.6-.5 1.2-.9 1.7l1.1 1.8-1.8 1.9-1.8-1.1a8.8 8.8 0 0 1-1.7.9l-.4 2h-2.6l-.4-2a8.8 8.8 0 0 1-1.7-.9l-1.8 1.1-1.8-1.9 1.1-1.8a8.8 8.8 0 0 1-.9-1.7l-2-.4v-2.6l2-.4c.2-.6.5-1.2.9-1.7l-1.1-1.8 1.8-1.9 1.8 1.1c.5-.4 1.1-.7 1.7-.9zm1.3 6a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4" />
  ),
  player: (
    <path d="M12 4.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 10c4.7 0 8.5 2.1 8.5 4.8V21H3.5v-1.7c0-2.7 3.8-4.8 8.5-4.8" />
  ),
  boot: (
    <path d="M5 7h14v9H5zm2 2v5h10V9zm13 1.2 4.2 4.3L20 18.7l-1.4-1.4 2-2H16v-2h4.6l-2-2z" />
  ),
  trophy: (
    <path d="M7 4.5h10V7h3v2.2a4.3 4.3 0 0 1-4.2 4.3c-.5 1.6-1.7 2.8-3.3 3.3v2.2h3.7V21H7.8v-2h3.7v-2.2a5.6 5.6 0 0 1-3.3-3.3A4.3 4.3 0 0 1 4 9.2V7h3zm10 4.5v.2a6.3 6.3 0 0 1-.1 1.4 2.3 2.3 0 0 0 2.1-2.2V9zM7 9H6v.4c0 1.1.9 2 2.1 2.2A6.2 6.2 0 0 1 7 9.2z" />
  ),
  lock: (
    <path d="M8 10V7.8a4 4 0 1 1 8 0V10h1.5v10h-11V10zm2 0h4V7.8a2 2 0 1 0-4 0z" />
  ),
  event: (
    <path d="M6 5h12v2H6zm0 5h12v2H6zm0 5h8v2H6zM4 4h2v14H4zm14 0h2v14h-2z" />
  ),
}

function Icon({ name, className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      {iconMap[name] ?? iconMap.settings}
    </svg>
  )
}

export default Icon
