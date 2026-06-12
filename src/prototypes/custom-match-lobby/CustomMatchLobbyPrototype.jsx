import { useMemo, useState } from 'react'
import GameShell from '../../components/game-ui/GameShell.jsx'
import useLobbyState from './state/useLobbyState.js'
import ChampionshipListScreen from './screens/ChampionshipListScreen.jsx'
import EventEditorScreen from './screens/EventEditorScreen.jsx'
import LobbyScreen from './screens/LobbyScreen.jsx'
import MatchConfigScreen from './screens/MatchConfigScreen.jsx'
import SessionConfigScreen from './screens/SessionConfigScreen.jsx'

function CustomMatchLobbyPrototype() {
  const lobbyState = useLobbyState()
  const [screenStack, setScreenStack] = useState([{ name: 'lobby', params: {} }])

  const currentScreen = screenStack[screenStack.length - 1]

  const pushScreen = (name, params = {}) => {
    setScreenStack((previousStack) => [...previousStack, { name, params }])
  }

  const popScreen = () => {
    setScreenStack((previousStack) => {
      if (previousStack.length === 1) return previousStack
      return previousStack.slice(0, -1)
    })
  }

  const openEditorForSingle = () => {
    const firstEvent = lobbyState.events[0]
    if (!firstEvent) return
    pushScreen('event-editor', { eventId: firstEvent.id })
  }

  const screenView = useMemo(() => {
    switch (currentScreen.name) {
      case 'match-config':
        return (
          <MatchConfigScreen
            lobbyState={lobbyState}
            onBack={popScreen}
            onGoSingleEditor={openEditorForSingle}
            onGoChampionship={() => pushScreen('championship')}
          />
        )
      case 'championship':
        return (
          <ChampionshipListScreen
            lobbyState={lobbyState}
            onBack={popScreen}
            onEditEvent={(eventId) => pushScreen('event-editor', { eventId })}
          />
        )
      case 'event-editor':
        return <EventEditorScreen lobbyState={lobbyState} eventId={currentScreen.params.eventId} onBack={popScreen} />
      case 'session-config':
        return <SessionConfigScreen lobbyState={lobbyState} onBack={popScreen} />
      case 'lobby':
      default:
        return (
          <LobbyScreen
            lobbyState={lobbyState}
            onOpenMatchConfig={() => pushScreen('match-config')}
            onOpenSessionConfig={() => pushScreen('session-config')}
          />
        )
    }
  }, [currentScreen.name, currentScreen.params.eventId, lobbyState])

  return (
    <GameShell title="Lobby de Partida Personalizada" subtitle="Navegação otimizada para controle e D-pad.">
      {screenView}
    </GameShell>
  )
}

export default CustomMatchLobbyPrototype
