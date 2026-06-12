import { useMemo, useState } from 'react'
import { buildEvent, eventsSeed, playersSeed, sessionVisibilities } from '../data/mockData.js'
import { makeDynamicOptions, refreshDynamicVisibility } from '../data/modeSchema.js'

function useUnityLobbyState() {
  const [isHostView, setIsHostView] = useState(true)
  const [players, setPlayers] = useState(playersSeed)
  const [matchType, setMatchType] = useState('single')
  const [events, setEvents] = useState(eventsSeed)
  const [session, setSession] = useState({
    name: 'Night Sprint Room',
    visibility: sessionVisibilities[0],
    hasPassword: false,
    password: '',
  })

  const hostPlayer = useMemo(() => players.find((player) => player.isHost) || players[0], [players])

  const actions = {
    toggleHostView: () => setIsHostView((current) => !current),
    kickPlayer: (playerId) =>
      setPlayers((current) => current.filter((player) => player.id !== playerId || player.isHost)),
    updateSession: (patch) => setSession((current) => ({ ...current, ...patch })),
    setMatchType: (type) => {
      setMatchType(type)
      if (type === 'single') {
        setEvents((current) => (current.length > 0 ? [current[0]] : [buildEvent(1)]))
      } else {
        setEvents((current) => (current.length > 0 ? current : [buildEvent(1)]))
      }
    },
    addEvent: () => setEvents((current) => [...current, buildEvent(current.length + 1)]),
    removeEvent: (eventId) =>
      setEvents((current) => {
        if (current.length <= 1) return current
        return current.filter((event) => event.id !== eventId)
      }),
    reorderEvent: (eventId, direction) =>
      setEvents((current) => {
        const fromIndex = current.findIndex((event) => event.id === eventId)
        if (fromIndex === -1) return current
        const toIndex = fromIndex + direction
        if (toIndex < 0 || toIndex >= current.length) return current
        const next = [...current]
        const [moved] = next.splice(fromIndex, 1)
        next.splice(toIndex, 0, moved)
        return next
      }),
    updateEvent: (eventId, patch) =>
      setEvents((current) =>
        current.map((event) => {
          if (event.id !== eventId) return event
          if (patch.mode && patch.mode !== event.mode) {
            return { ...event, ...patch, dynamicOptions: makeDynamicOptions(patch.mode) }
          }
          return { ...event, ...patch }
        }),
      ),
    updateEventOption: (eventId, optionKey, value) =>
      setEvents((current) =>
        current.map((event) => {
          if (event.id !== eventId) return event
          const options = {
            ...event.dynamicOptions,
            [optionKey]: { ...event.dynamicOptions[optionKey], value },
          }
          return {
            ...event,
            dynamicOptions: refreshDynamicVisibility(options, event.mode),
          }
        }),
      ),
  }

  return {
    isHostView,
    players,
    hostPlayer,
    matchType,
    events,
    session,
    actions,
  }
}

export default useUnityLobbyState
