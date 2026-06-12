import { useEffect, useRef } from 'react'

function ModalOverlay({ title, children, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const focusables = modalRef.current?.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')
    if (focusables?.[0]) {
      focusables[0].focus()
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose?.()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div ref={modalRef} className="w-full max-w-lg rounded-xl border border-white/20 bg-slate-900/95 p-5">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  )
}

export default ModalOverlay
