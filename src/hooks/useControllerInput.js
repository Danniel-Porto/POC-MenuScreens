import { useEffect, useRef } from 'react'

const defaultMapping = {
  up: () => {},
  down: () => {},
  left: () => {},
  right: () => {},
  confirm: () => {},
  back: () => {},
  previousTab: () => {},
  nextTab: () => {},
}

function useControllerInput(mapping) {
  const actionRef = useRef({ ...defaultMapping, ...mapping })
  const providedRef = useRef(mapping || {})

  useEffect(() => {
    actionRef.current = { ...defaultMapping, ...mapping }
    providedRef.current = mapping || {}
  }, [mapping])

  useEffect(() => {
    const keyMap = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      Enter: 'confirm',
      ' ': 'confirm',
      Escape: 'back',
      Backspace: 'back',
      PageUp: 'previousTab',
      PageDown: 'nextTab',
    }

    const onKeyDown = (event) => {
      const action = keyMap[event.key]
      if (!action) return
      if (!providedRef.current[action]) return
      event.preventDefault()
      actionRef.current[action]?.()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    let animationFrameId
    const lastPressedRef = { current: {} }

    const readGamepad = () => {
      const pads = navigator.getGamepads?.() || []
      const pad = pads[0]

      if (pad) {
        const pressed = {
          up: pad.buttons[12]?.pressed,
          down: pad.buttons[13]?.pressed,
          left: pad.buttons[14]?.pressed,
          right: pad.buttons[15]?.pressed,
          confirm: pad.buttons[0]?.pressed,
          back: pad.buttons[1]?.pressed,
          previousTab: pad.buttons[4]?.pressed,
          nextTab: pad.buttons[5]?.pressed,
        }

        Object.entries(pressed).forEach(([key, value]) => {
          if (value && !lastPressedRef.current[key]) {
            actionRef.current[key]?.()
          }
        })

        lastPressedRef.current = pressed
      }

      animationFrameId = window.requestAnimationFrame(readGamepad)
    }

    animationFrameId = window.requestAnimationFrame(readGamepad)
    return () => window.cancelAnimationFrame(animationFrameId)
  }, [])
}

export default useControllerInput
