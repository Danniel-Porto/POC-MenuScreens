import { useEffect, useMemo, useState } from 'react'
import ActionBar from '../../../components/game-ui/ActionBar.jsx'
import EventSummaryCard from '../../../components/game-ui/EventSummaryCard.jsx'
import FocusGroup from '../../../components/game-ui/FocusGroup.jsx'
import FocusableButton from '../../../components/game-ui/FocusableButton.jsx'
import ModalOverlay from '../../../components/game-ui/ModalOverlay.jsx'
import Panel from '../../../components/game-ui/Panel.jsx'
import PlayerRow from '../../../components/game-ui/PlayerRow.jsx'
import TabBar from '../../../components/game-ui/TabBar.jsx'
import useControllerInput from '../../../hooks/useControllerInput.js'

const tabs = [
  { id: 'players', label: 'Jogadores' },
  { id: 'events', label: 'Evento(s)' },
]

function LobbyScreen({ lobbyState, onOpenMatchConfig, onOpenSessionConfig }) {
  const { isHost, players, events, matchType, session, hostPlayer, actions } = lobbyState
  const [activeTab, setActiveTab] = useState('players')
  const [selectedPlayerId, setSelectedPlayerId] = useState(players[0]?.id || null)
  const [modal, setModal] = useState(null)

  useEffect(() => {
    if (!players.find((player) => player.id === selectedPlayerId)) {
      setSelectedPlayerId(players[0]?.id || null)
    }
  }, [players, selectedPlayerId])

  useControllerInput({
    previousTab: () => setActiveTab((tab) => (tab === 'players' ? 'events' : 'players')),
    nextTab: () => setActiveTab((tab) => (tab === 'players' ? 'events' : 'players')),
    back: () => setModal((current) => current || 'leave'),
  })

  const selectedPlayer = useMemo(
    () => players.find((player) => player.id === selectedPlayerId) || null,
    [players, selectedPlayerId],
  )

  const canKickSelectedPlayer = isHost && selectedPlayer && !selectedPlayer.isHost

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Panel
        title={session.name}
        rightSlot={
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded bg-white/10 px-2 py-1 text-slate-100">{session.visibility}</span>
            <button
              type="button"
              data-focusable="true"
              onClick={actions.toggleHostView}
              className="rounded border border-white/60 px-2 py-1 text-white transition hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {isHost ? 'Visão: Host' : 'Visão: Jogador'}
            </button>
          </div>
        }
      >
        <div className="grid flex-1 gap-4 lg:grid-cols-[1.35fr_1fr]">
          <Panel title="Lobby" className="min-h-[360px]">
            <div className="space-y-3">
              <TabBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
              {activeTab === 'players' ? (
                <FocusGroup className="space-y-2">
                  <div className="grid grid-cols-[1.8fr_0.6fr_1fr_0.8fr] gap-2 px-1 text-[11px] uppercase tracking-wide text-slate-300">
                    <span>Jogador</span>
                    <span>Ping</span>
                    <span>Veiculo</span>
                    <span className="text-right">Status</span>
                  </div>
                  {players.map((player) => (
                    <PlayerRow
                      key={player.id}
                      player={player}
                      isSelected={player.id === selectedPlayerId}
                      onSelect={() => setSelectedPlayerId(player.id)}
                    />
                  ))}
                </FocusGroup>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-slate-300">
                    Tipo atual: {matchType === 'single' ? 'Partida unica' : 'Campeonato'} ({events.length} evento(s))
                  </p>
                  {events.map((event, index) => (
                    <EventSummaryCard key={event.id} event={event} indexLabel={`Evento ${index + 1}`} />
                  ))}
                </div>
              )}
            </div>
          </Panel>

          <Panel title="Detalhes e ações" className="space-y-3">
            <article className="space-y-1 rounded-lg border border-white/10 bg-black/25 p-3 text-sm">
              <h3 className="text-sm font-semibold text-white">Host atual</h3>
              <p className="text-slate-100">{hostPlayer?.name}</p>
              <p className="text-xs text-slate-300">Veiculo: {hostPlayer?.vehicle}</p>
            </article>

            {selectedPlayer ? (
              <article className="space-y-1 rounded-lg border border-white/10 bg-black/25 p-3 text-sm">
                <h3 className="text-sm font-semibold text-white">Jogador selecionado</h3>
                <p>{selectedPlayer.name}</p>
                <p className="text-xs text-slate-300">
                  Ping {selectedPlayer.ping}ms • {selectedPlayer.platform}
                </p>
              </article>
            ) : null}

            <FocusGroup className="grid gap-2 sm:grid-cols-2">
              <FocusableButton icon="settings" label="Configurar partida" onPress={onOpenMatchConfig} disabled={!isHost} />
              <FocusableButton icon="lock" label="Configurar sessão" onPress={onOpenSessionConfig} disabled={!isHost} />
              <FocusableButton icon="player" label="Selecionar jogador" onPress={() => setActiveTab('players')} />
              <FocusableButton
                icon="boot"
                label="Expulsar jogador"
                variant="danger"
                disabled={!canKickSelectedPlayer}
                onPress={() => setModal('kick')}
              />
              <FocusableButton icon="play" label="Iniciar partida" onPress={() => setModal('start')} disabled={!isHost} />
              <FocusableButton icon="event" label="Trocar veículo" onPress={actions.cycleHostVehicle} />
              <FocusableButton icon="exit" label="Sair da sessão" onPress={() => setModal('leave')} />
            </FocusGroup>
          </Panel>
        </div>
      </Panel>

      <ActionBar
        hints={[
          { button: 'A', label: 'Selecionar' },
          { button: 'B', label: 'Voltar/Sair' },
          { button: 'LB/RB', label: 'Trocar aba' },
          { button: 'D-pad', label: 'Navegar foco' },
        ]}
      />

      {modal === 'kick' && selectedPlayer ? (
        <ModalOverlay title="Expulsar jogador" onClose={() => setModal(null)}>
          <p className="text-sm text-slate-200">
            Tem certeza que deseja expulsar <strong>{selectedPlayer.name}</strong> da sessão?
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <FocusableButton
              icon="boot"
              label="Confirmar expulsão"
              variant="danger"
              onPress={() => {
                actions.kickPlayer(selectedPlayer.id)
                setModal(null)
              }}
            />
            <FocusableButton icon="exit" label="Cancelar" onPress={() => setModal(null)} />
          </div>
        </ModalOverlay>
      ) : null}

      {modal === 'start' ? (
        <ModalOverlay title="Iniciar partida" onClose={() => setModal(null)}>
          <p className="text-sm text-slate-200">
            A partida será iniciada com {events.length} evento(s) no modo{' '}
            {matchType === 'single' ? 'Partida única' : 'Campeonato'}.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <FocusableButton icon="play" label="Iniciar agora" onPress={() => setModal(null)} />
            <FocusableButton icon="exit" label="Voltar" onPress={() => setModal(null)} />
          </div>
        </ModalOverlay>
      ) : null}

      {modal === 'leave' ? (
        <ModalOverlay title="Sair da sessão" onClose={() => setModal(null)}>
          <p className="text-sm text-slate-200">Você será removido do lobby atual. Deseja continuar?</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <FocusableButton icon="exit" label="Confirmar saída" variant="danger" onPress={() => setModal(null)} />
            <FocusableButton icon="play" label="Cancelar" onPress={() => setModal(null)} />
          </div>
        </ModalOverlay>
      ) : null}
    </div>
  )
}

export default LobbyScreen
