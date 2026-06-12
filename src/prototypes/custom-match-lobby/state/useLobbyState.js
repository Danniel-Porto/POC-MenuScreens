import { useMemo, useState } from 'react'
import {
  availableVehicles,
  createDefaultEvent,
  initialEvents,
  initialPlayers,
  visibilityOptions,
} from '../data/mockData.js'
import { buildDynamicOptions, updateDynamicVisibility } from '../data/gameModeSchema.js'

function useLobbyState() {
  const [isHost, setIsHost] = useState(true)
  const [players, setPlayers] = useState(initialPlayers)
  const [matchType, setMatchType] = useState('single')
  const [events, setEvents] = useState(initialEvents)
  const [session, setSession] = useState({
    name: 'Sala Noturna GT',
    visibility: visibilityOptions[0],
    hasPassword: false,
    password: '',
  })

  const hostPlayer = useMemo(() => players.find((player) => player.isHost) || players[0], [players])

  const toggleHostView = () => setIsHost((value) => !value)

  const kickPlayer = (playerId) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== playerId || player.isHost))
  }

  const cycleHostVehicle = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (!player.isHost) return player
        const currentIndex = availableVehicles.indexOf(player.vehicle)
        const nextIndex = (currentIndex + 1) % availableVehicles.length
        return { ...player, vehicle: availableVehicles[nextIndex] }
      }),
    )
  }

  const updateSession = (patch) => {
    setSession((prevSession) => ({ ...prevSession, ...patch }))
  }

  const updateMatchType = (nextType) => {
    setMatchType(nextType)
    if (nextType === 'single' && events.length > 1) {
      setEvents([events[0]])
    }
    if (nextType === 'championship' && events.length === 0) {
      setEvents([createDefaultEvent(1)])
    }
  }

  const updateEvent = (eventId, patch) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id !== eventId) return event

        if (patch.mode && patch.mode !== event.mode) {
          return {
            ...event,
            ...patch,
            dynamicOptions: buildDynamicOptions(patch.mode),
          }
        }

        return { ...event, ...patch }
      }),
    )
  }

  const updateDynamicOption = (eventId, optionKey, value) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id !== eventId) return event

        const updatedOptions = {
          ...event.dynamicOptions,
          [optionKey]: {
            ...event.dynamicOptions[optionKey],
            value,
          },
        }

        return {
          ...event,
          dynamicOptions: updateDynamicVisibility(updatedOptions, event.mode),
        }
      }),
    )
  }

  const addEvent = () => {
    setEvents((prevEvents) => [...prevEvents, createDefaultEvent(prevEvents.length + 1)])
  }

  const removeEvent = (eventId) => {
    setEvents((prevEvents) => {
      if (prevEvents.length <= 1) return prevEvents
      return prevEvents.filter((event) => event.id !== eventId)
    })
  }

  const reorderEvent = (eventId, direction) => {
    setEvents((prevEvents) => {
      const currentIndex = prevEvents.findIndex((event) => event.id === eventId)
      if (currentIndex === -1) return prevEvents

      const targetIndex = currentIndex + direction
      if (targetIndex < 0 || targetIndex >= prevEvents.length) return prevEvents

      const nextEvents = [...prevEvents]
      const [movedEvent] = nextEvents.splice(currentIndex, 1)
      nextEvents.splice(targetIndex, 0, movedEvent)
      return nextEvents
    })
  }

  return {
    isHost,
    players,
    events,
    session,
    matchType,
    hostPlayer,
    actions: {
      toggleHostView,
      kickPlayer,
      cycleHostVehicle,
      updateSession,
      updateMatchType,
      updateEvent,
      updateDynamicOption,
      addEvent,
      removeEvent,
      reorderEvent,
    },
  }
}

export default useLobbyState
