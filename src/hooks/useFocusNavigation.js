import { useEffect } from 'react'

function useFocusNavigation(containerRef, { orientation = 'vertical', onBack } = {}) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const getItems = () =>
      Array.from(container.querySelectorAll('[data-focusable="true"]:not([disabled])'))

    const focusAt = (index) => {
      const items = getItems()
      if (items.length === 0) return
      const safeIndex = ((index % items.length) + items.length) % items.length
      items[safeIndex].focus()
    }

    const ensureInitialFocus = () => {
      const activeInside = container.contains(document.activeElement)
      if (activeInside) return
      focusAt(0)
    }

    const onKeyDown = (event) => {
      const items = getItems()
      if (items.length === 0) return

      const currentIndex = items.indexOf(document.activeElement)
      const activeIndex = currentIndex === -1 ? 0 : currentIndex

      if (event.key === 'Escape' && onBack) {
        event.preventDefault()
        onBack()
        return
      }

      if (orientation === 'horizontal') {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          focusAt(activeIndex + 1)
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          focusAt(activeIndex - 1)
        }
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        focusAt(activeIndex + 1)
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        focusAt(activeIndex - 1)
      }
    }

    const onFocusIn = () => ensureInitialFocus()

    window.addEventListener('keydown', onKeyDown)
    container.addEventListener('mouseenter', onFocusIn)
    ensureInitialFocus()

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      container.removeEventListener('mouseenter', onFocusIn)
    }
  }, [containerRef, onBack, orientation])
}

export default useFocusNavigation
