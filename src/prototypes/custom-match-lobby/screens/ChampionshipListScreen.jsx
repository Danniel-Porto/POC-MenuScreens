import ActionBar from '../../../components/game-ui/ActionBar.jsx'
import EventSummaryCard from '../../../components/game-ui/EventSummaryCard.jsx'
import FocusGroup from '../../../components/game-ui/FocusGroup.jsx'
import FocusableButton from '../../../components/game-ui/FocusableButton.jsx'
import Panel from '../../../components/game-ui/Panel.jsx'

function ChampionshipListScreen({ lobbyState, onBack, onEditEvent }) {
  const { events, actions, isHost } = lobbyState

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Panel title="Campeonato - Eventos">
        <div className="space-y-3">
          {events.map((event, index) => (
            <div key={event.id} className="grid gap-2 rounded-lg border border-white/10 bg-black/20 p-3">
              <EventSummaryCard event={event} indexLabel={`Etapa ${index + 1}`} />
              <FocusGroup className="grid gap-2 sm:grid-cols-4">
                <FocusableButton icon="settings" label="Editar" onPress={() => onEditEvent(event.id)} disabled={!isHost} />
                <FocusableButton icon="event" label="Subir" onPress={() => actions.reorderEvent(event.id, -1)} disabled={!isHost} />
                <FocusableButton icon="event" label="Descer" onPress={() => actions.reorderEvent(event.id, 1)} disabled={!isHost} />
                <FocusableButton
                  icon="boot"
                  label="Remover"
                  variant="danger"
                  onPress={() => actions.removeEvent(event.id)}
                  disabled={!isHost || events.length === 1}
                />
              </FocusGroup>
            </div>
          ))}
          <FocusGroup className="grid gap-2 sm:grid-cols-2">
            <FocusableButton icon="event" label="Adicionar evento" onPress={actions.addEvent} disabled={!isHost} />
            <FocusableButton icon="exit" label="Voltar" onPress={onBack} />
          </FocusGroup>
        </div>
      </Panel>
      <ActionBar hints={[{ button: 'A', label: 'Confirmar' }, { button: 'B', label: 'Voltar' }]} />
    </div>
  )
}

export default ChampionshipListScreen
