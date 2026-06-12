import { useMemo, useState } from 'react'
import useControllerInput from '../../hooks/useControllerInput.js'
import {
  dayTimes,
  gameModes,
  profile,
  sessionVisibilities,
  tracks,
  vehicleClasses,
  weatherOptions,
} from './data/mockData.js'
import useUnityLobbyState from './state/useUnityLobbyState.js'

function glassPanelClass(extra = '') {
  return `rounded-2xl border border-white/15 bg-slate-900/55 backdrop-blur-md ${extra}`
}

function focusButtonClass({ primary = false, danger = false } = {}) {
  if (primary) {
    return 'min-h-12 rounded-xl border border-white bg-white px-4 py-3 text-sm font-semibold tracking-wide text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'
  }
  if (danger) {
    return 'min-h-11 rounded-xl border border-red-300/65 bg-red-400/8 px-4 py-2.5 text-sm font-medium text-red-100 transition hover:bg-white hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'
  }
  return 'min-h-11 rounded-xl border border-white/55 bg-white/3 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'
}

function currencyFormatter(value) {
  return new Intl.NumberFormat('pt-BR').format(value)
}

function pingColor(ping) {
  if (ping <= 50) return 'text-emerald-300'
  if (ping <= 100) return 'text-amber-300'
  return 'text-rose-300'
}

function cycle(options, value, step) {
  const index = options.findIndex((option) => option === value)
  const nextIndex = (index + step + options.length) % options.length
  return options[nextIndex]
}

function ModalCard({ title, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
      <div className={`${glassPanelClass('w-full max-w-3xl p-5')}`}>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

function UnityRacingLobbyPrototype() {
  const lobby = useUnityLobbyState()
  const { players, hostPlayer, events, session, matchType, isHostView, actions } = lobby
  const [selectedPlayerId, setSelectedPlayerId] = useState(players[0]?.id || null)
  const [activeEventId, setActiveEventId] = useState(events[0]?.id || null)
  const [modal, setModal] = useState(null)

  const selectedPlayer = useMemo(
    () => players.find((player) => player.id === selectedPlayerId) || players[0] || null,
    [players, selectedPlayerId],
  )
  const activeEvent = useMemo(
    () => events.find((event) => event.id === activeEventId) || events[0] || null,
    [activeEventId, events],
  )

  const moveFocus = (step) => {
    const nodes = Array.from(document.querySelectorAll('[data-focusable="true"]:not([disabled])'))
    if (nodes.length === 0) return
    const currentIndex = nodes.indexOf(document.activeElement)
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + step + nodes.length) % nodes.length
    nodes[nextIndex].focus()
  }

  useControllerInput({
    up: () => moveFocus(-1),
    down: () => moveFocus(1),
    left: () => moveFocus(-1),
    right: () => moveFocus(1),
    confirm: () => {
      const current = document.activeElement
      if (current && typeof current.click === 'function') current.click()
    },
    back: () => setModal((current) => current || 'leave'),
    previousTab: () => {
      if (!activeEvent) return
      const eventIds = events.map((event) => event.id)
      setActiveEventId(cycle(eventIds, activeEvent.id, -1))
    },
    nextTab: () => {
      if (!activeEvent) return
      const eventIds = events.map((event) => event.id)
      setActiveEventId(cycle(eventIds, activeEvent.id, 1))
    },
  })

  return (
    <main
      className="min-h-screen bg-slate-900 text-white"
      style={{
        backgroundImage:
          'radial-gradient(circle at 85% 15%, rgba(129,140,160,0.24), rgba(10,15,25,0) 42%), linear-gradient(180deg, #1f2630 0%, #111722 100%)',
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col p-5 md:p-8">
        <header className={`${glassPanelClass('mb-4 grid grid-cols-1 gap-3 p-4 md:grid-cols-[1.1fr_1fr]')}`}>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-lg font-semibold">
              {profile.avatarLabel}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Perfil</p>
              <p className="text-lg font-semibold">{profile.nickname}</p>
              <p className="text-sm text-slate-300">Creditos: CR {currencyFormatter(profile.currency)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <div className="rounded-xl border border-white/15 bg-black/25 p-3">
              <p className="text-[11px] uppercase text-slate-300">Sessao</p>
              <p className="text-sm font-medium">{session.name}</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/25 p-3">
              <p className="text-[11px] uppercase text-slate-300">Visibilidade</p>
              <p className="text-sm font-medium">{session.visibility}</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/25 p-3">
              <p className="text-[11px] uppercase text-slate-300">Tipo</p>
              <p className="text-sm font-medium">{matchType === 'single' ? 'Partida unica' : 'Campeonato'}</p>
            </div>
            <button
              type="button"
              data-focusable="true"
              onClick={actions.toggleHostView}
              className={focusButtonClass()}
            >
              {isHostView ? 'Visao Host' : 'Visao Piloto'}
            </button>
          </div>
        </header>

        <section className="grid flex-1 grid-cols-1 gap-4 xl:grid-cols-[320px_1fr_380px]">
          <aside className={`${glassPanelClass('flex flex-col gap-3 p-4')}`}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Acoes da sessao</p>
              <h2 className="mt-1 text-lg font-semibold">Controle da corrida</h2>
            </div>
            <button type="button" data-focusable="true" className={focusButtonClass({ primary: true })} onClick={() => setModal('start')}>
              Iniciar partida
            </button>
            <button
              type="button"
              data-focusable="true"
              className={focusButtonClass()}
              onClick={() => setModal('session-options')}
            >
              Opcoes da sessao
            </button>
            <button type="button" data-focusable="true" className={focusButtonClass()} onClick={() => setModal('match-config')}>
              Configurar partida
            </button>
            <button type="button" data-focusable="true" className={focusButtonClass()} onClick={() => setModal('session-config')}>
              Configurar sessao
            </button>
            <button
              type="button"
              data-focusable="true"
              className={focusButtonClass({ danger: true })}
              disabled={!isHostView || !selectedPlayer || selectedPlayer.isHost}
              onClick={() => setModal('kick')}
            >
              Expulsar selecionado
            </button>
            <button type="button" data-focusable="true" className={focusButtonClass({ danger: true })} onClick={() => setModal('leave')}>
              Sair da sessao
            </button>
            <div className="mt-auto rounded-xl border border-white/15 bg-black/25 p-3 text-xs text-slate-300">
              <p className="font-semibold text-slate-200">Navegacao</p>
              <p>A selecionar • B voltar • D-pad mover foco • LB/RB trocar evento</p>
            </div>
          </aside>

          <section className={`${glassPanelClass('flex flex-col p-4')}`}>
            <header className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Jogadores</p>
                <h2 className="text-xl font-semibold">Roster da corrida</h2>
              </div>
              <p className="text-sm text-slate-300">{players.length}/12 conectados</p>
            </header>
            <div className="grid flex-1 content-start gap-2 overflow-y-auto pr-1">
              {players.map((player) => {
                const selected = selectedPlayer?.id === player.id
                return (
                  <button
                    key={player.id}
                    type="button"
                    data-focusable="true"
                    onClick={() => setSelectedPlayerId(player.id)}
                    className={`grid grid-cols-[1.4fr_0.9fr_1fr_0.5fr] items-center gap-2 rounded-xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                      selected
                        ? 'border-white bg-white text-slate-900'
                        : 'border-white/20 bg-black/25 text-slate-100 hover:border-white/50 hover:bg-black/35'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{player.name}</p>
                      <p className="truncate text-xs opacity-80">
                        {player.isHost ? 'Host' : 'Piloto'} • {player.platform}
                      </p>
                    </div>
                    <p className="truncate text-sm">{player.selectedClass}</p>
                    <p className="truncate text-sm">{player.selectedCar}</p>
                    <p className={`text-right text-xs font-semibold ${selected ? 'text-slate-700' : pingColor(player.ping)}`}>
                      {player.ping}ms
                    </p>
                  </button>
                )
              })}
            </div>
          </section>

          <aside className={`${glassPanelClass('flex flex-col gap-3 p-4')}`}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Detalhes do lobby</p>
              <h2 className="text-xl font-semibold">Pre-race briefing</h2>
            </div>

            <div className="rounded-xl border border-white/15 bg-black/25 p-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-300">Host atual</p>
              <p className="mt-1 font-medium">{hostPlayer?.name}</p>
              <p className="text-sm text-slate-300">
                Classe {hostPlayer?.selectedClass} • Carro {hostPlayer?.selectedCar}
              </p>
            </div>

            <div className="rounded-xl border border-white/15 bg-black/25 p-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-300">Track preview</p>
              <div
                className="mt-2 h-28 rounded-lg border border-white/10 bg-slate-800/80"
                style={{
                  backgroundImage:
                    'linear-gradient(120deg, rgba(148,163,184,0.35), rgba(30,41,59,0.5) 60%), radial-gradient(circle at 30% 30%, rgba(226,232,240,0.25), rgba(15,23,42,0.1))',
                }}
              />
              <p className="mt-2 text-sm font-medium">{activeEvent?.track || '-'}</p>
              <p className="text-xs text-slate-300">
                {activeEvent?.weather || '-'} • {activeEvent?.timeOfDay || '-'}
              </p>
            </div>

            <div className="rounded-xl border border-white/15 bg-black/25 p-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-300">Resumo do evento</p>
              {activeEvent ? (
                <div className="mt-2 space-y-2">
                  <p className="text-sm">
                    {activeEvent.name} • {activeEvent.mode}
                  </p>
                  <p className="text-xs text-slate-300">
                    Classe {activeEvent.vehicleClass} • {matchType === 'single' ? 'Partida unica' : 'Campeonato'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.values(activeEvent.dynamicOptions)
                      .filter((option) => option.visible !== false)
                      .map((option) => (
                        <span key={option.key} className="rounded-lg bg-white/12 px-2 py-1 text-[11px] text-slate-100">
                          {option.label}: {typeof option.value === 'boolean' ? (option.value ? 'Sim' : 'Nao') : option.value}
                        </span>
                      ))}
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-300">Sem evento selecionado.</p>
              )}
            </div>
          </aside>
        </section>
      </div>

      {modal === 'session-options' ? (
        <ModalCard title="Opcoes da sessao">
          <div className="grid gap-2 md:grid-cols-3">
            <button type="button" data-focusable="true" className={focusButtonClass()} onClick={() => setModal('session-config')}>
              Settings
            </button>
            <button type="button" data-focusable="true" className={focusButtonClass()} onClick={() => setModal(null)}>
              Opcoes gerais
            </button>
            <button type="button" data-focusable="true" className={focusButtonClass({ danger: true })} onClick={() => setModal('leave')}>
              Leave
            </button>
          </div>
          <div className="mt-3">
            <button type="button" data-focusable="true" className={focusButtonClass()} onClick={() => setModal(null)}>
              Fechar
            </button>
          </div>
        </ModalCard>
      ) : null}

      {modal === 'session-config' ? (
        <ModalCard title="Configurar sessao">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-xs uppercase text-slate-300">Nome da sessao</span>
              <input
                className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                value={session.name}
                onChange={(event) => actions.updateSession({ name: event.target.value })}
              />
            </label>
            <div className="space-y-1">
              <span className="text-xs uppercase text-slate-300">Visibilidade</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  data-focusable="true"
                  className={focusButtonClass()}
                  onClick={() => actions.updateSession({ visibility: cycle(sessionVisibilities, session.visibility, -1) })}
                >
                  -
                </button>
                <div className="flex-1 rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2 text-sm">{session.visibility}</div>
                <button
                  type="button"
                  data-focusable="true"
                  className={focusButtonClass()}
                  onClick={() => actions.updateSession({ visibility: cycle(sessionVisibilities, session.visibility, 1) })}
                >
                  +
                </button>
              </div>
            </div>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={session.hasPassword}
                onChange={(event) =>
                  actions.updateSession({ hasPassword: event.target.checked, password: event.target.checked ? session.password : '' })
                }
              />
              <span className="text-sm">Sessao protegida por senha</span>
            </label>
            {session.hasPassword ? (
              <label className="space-y-1">
                <span className="text-xs uppercase text-slate-300">Senha</span>
                <input
                  type="password"
                  className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                  value={session.password}
                  onChange={(event) => actions.updateSession({ password: event.target.value })}
                />
              </label>
            ) : null}
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" data-focusable="true" className={focusButtonClass()} onClick={() => setModal(null)}>
              Aplicar
            </button>
            <button type="button" data-focusable="true" className={focusButtonClass({ danger: true })} onClick={() => setModal(null)}>
              Cancelar
            </button>
          </div>
        </ModalCard>
      ) : null}

      {modal === 'match-config' && activeEvent ? (
        <ModalCard title="Configurar partida">
          <div className="space-y-3">
            <div className="grid gap-2 md:grid-cols-2">
              <button
                type="button"
                data-focusable="true"
                className={focusButtonClass()}
                onClick={() => actions.setMatchType(matchType === 'single' ? 'championship' : 'single')}
              >
                Tipo: {matchType === 'single' ? 'Partida unica' : 'Campeonato'}
              </button>
              <button type="button" data-focusable="true" className={focusButtonClass()} onClick={actions.addEvent}>
                Adicionar evento
              </button>
            </div>

            <div className="grid gap-2">
              {events.map((event, index) => (
                <div key={event.id} className="rounded-xl border border-white/12 bg-black/25 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <button
                      type="button"
                      data-focusable="true"
                      className={`${focusButtonClass()} !min-h-9`}
                      onClick={() => setActiveEventId(event.id)}
                    >
                      Etapa {index + 1}: {event.mode} / {event.track}
                    </button>
                    <div className="flex gap-1">
                      <button type="button" data-focusable="true" className={`${focusButtonClass()} !min-h-9`} onClick={() => actions.reorderEvent(event.id, -1)}>
                        ↑
                      </button>
                      <button type="button" data-focusable="true" className={`${focusButtonClass()} !min-h-9`} onClick={() => actions.reorderEvent(event.id, 1)}>
                        ↓
                      </button>
                      <button
                        type="button"
                        data-focusable="true"
                        className={`${focusButtonClass({ danger: true })} !min-h-9`}
                        disabled={events.length <= 1}
                        onClick={() => actions.removeEvent(event.id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/12 bg-black/20 p-3">
              <p className="mb-2 text-sm font-semibold">Editor do evento ativo</p>
              <div className="grid gap-2 md:grid-cols-2">
                <button
                  type="button"
                  data-focusable="true"
                  className={focusButtonClass()}
                  onClick={() => actions.updateEvent(activeEvent.id, { mode: cycle(gameModes, activeEvent.mode, 1) })}
                >
                  Modo: {activeEvent.mode}
                </button>
                <button
                  type="button"
                  data-focusable="true"
                  className={focusButtonClass()}
                  onClick={() => actions.updateEvent(activeEvent.id, { track: cycle(tracks, activeEvent.track, 1) })}
                >
                  Pista: {activeEvent.track}
                </button>
                <button
                  type="button"
                  data-focusable="true"
                  className={focusButtonClass()}
                  onClick={() => actions.updateEvent(activeEvent.id, { timeOfDay: cycle(dayTimes, activeEvent.timeOfDay, 1) })}
                >
                  Horario: {activeEvent.timeOfDay}
                </button>
                <button
                  type="button"
                  data-focusable="true"
                  className={focusButtonClass()}
                  onClick={() => actions.updateEvent(activeEvent.id, { weather: cycle(weatherOptions, activeEvent.weather, 1) })}
                >
                  Clima: {activeEvent.weather}
                </button>
                <button
                  type="button"
                  data-focusable="true"
                  className={focusButtonClass()}
                  onClick={() => actions.updateEvent(activeEvent.id, { vehicleClass: cycle(vehicleClasses, activeEvent.vehicleClass, 1) })}
                >
                  Classe: {activeEvent.vehicleClass}
                </button>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {Object.values(activeEvent.dynamicOptions)
                  .filter((option) => option.visible !== false)
                  .map((option) => {
                    if (option.type === 'toggle') {
                      return (
                        <button
                          key={option.key}
                          type="button"
                          data-focusable="true"
                          className={focusButtonClass()}
                          onClick={() => actions.updateEventOption(activeEvent.id, option.key, !option.value)}
                        >
                          {option.label}: {option.value ? 'Sim' : 'Nao'}
                        </button>
                      )
                    }
                    return (
                      <button
                        key={option.key}
                        type="button"
                        data-focusable="true"
                        className={focusButtonClass()}
                        onClick={() =>
                          actions.updateEventOption(activeEvent.id, option.key, cycle(option.options, option.value, 1))
                        }
                      >
                        {option.label}: {option.value}
                      </button>
                    )
                  })}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button type="button" data-focusable="true" className={focusButtonClass()} onClick={() => setModal(null)}>
              Fechar configuracao
            </button>
          </div>
        </ModalCard>
      ) : null}

      {modal === 'kick' && selectedPlayer ? (
        <ModalCard title="Expulsar jogador">
          <p className="text-sm text-slate-200">
            Remover <strong>{selectedPlayer.name}</strong> da sessao?
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              data-focusable="true"
              className={focusButtonClass({ danger: true })}
              onClick={() => {
                actions.kickPlayer(selectedPlayer.id)
                setModal(null)
              }}
            >
              Confirmar expulsao
            </button>
            <button type="button" data-focusable="true" className={focusButtonClass()} onClick={() => setModal(null)}>
              Cancelar
            </button>
          </div>
        </ModalCard>
      ) : null}

      {modal === 'start' ? (
        <ModalCard title="Iniciar partida">
          <p className="text-sm text-slate-200">
            Pronto para iniciar {matchType === 'single' ? 'a partida unica' : 'o campeonato'} com {events.length} evento(s)?
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" data-focusable="true" className={focusButtonClass({ primary: true })} onClick={() => setModal(null)}>
              Confirmar inicio
            </button>
            <button type="button" data-focusable="true" className={focusButtonClass()} onClick={() => setModal(null)}>
              Voltar
            </button>
          </div>
        </ModalCard>
      ) : null}

      {modal === 'leave' ? (
        <ModalCard title="Sair da sessao">
          <p className="text-sm text-slate-200">Deseja sair da sessao atual?</p>
          <div className="mt-4 flex gap-2">
            <button type="button" data-focusable="true" className={focusButtonClass({ danger: true })} onClick={() => setModal(null)}>
              Confirmar saida
            </button>
            <button type="button" data-focusable="true" className={focusButtonClass()} onClick={() => setModal(null)}>
              Continuar na sessao
            </button>
          </div>
        </ModalCard>
      ) : null}
    </main>
  )
}

export default UnityRacingLobbyPrototype
