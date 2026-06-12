import ActionBar from '../../../components/game-ui/ActionBar.jsx'
import FocusGroup from '../../../components/game-ui/FocusGroup.jsx'
import FocusableButton from '../../../components/game-ui/FocusableButton.jsx'
import { SelectField, ToggleField } from '../../../components/game-ui/FormFields.jsx'
import Panel from '../../../components/game-ui/Panel.jsx'
import { circuits, gameModes, timeOfDayOptions, vehicleCategories } from '../data/mockData.js'

function cycleOption(options, currentValue, direction) {
  const currentIndex = options.findIndex((option) => option === currentValue)
  const nextIndex = (currentIndex + direction + options.length) % options.length
  return options[nextIndex]
}

function EventEditorScreen({ lobbyState, eventId, onBack }) {
  const { events, actions, isHost } = lobbyState
  const event = events.find((item) => item.id === eventId) || events[0]

  if (!event) {
    return (
      <Panel title="Evento não encontrado">
        <FocusableButton icon="exit" label="Voltar" onPress={onBack} />
      </Panel>
    )
  }

  const dynamicFields = Object.values(event.dynamicOptions || {})

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Panel title={`Editor - ${event.name}`}>
        <div className="grid gap-3 lg:grid-cols-2">
          <SelectField label="Modo de jogo" value={event.mode} options={gameModes} onChange={(mode) => actions.updateEvent(event.id, { mode })} />
          <SelectField
            label="Circuito"
            value={event.circuit}
            options={circuits}
            onChange={(circuit) => actions.updateEvent(event.id, { circuit })}
          />
          <SelectField
            label="Hora do dia"
            value={event.timeOfDay}
            options={timeOfDayOptions}
            onChange={(timeOfDay) => actions.updateEvent(event.id, { timeOfDay })}
          />
          <SelectField
            label="Categoria de veículos"
            value={event.category}
            options={vehicleCategories}
            onChange={(category) => actions.updateEvent(event.id, { category })}
          />
        </div>

        <div className="mt-4 space-y-3 rounded-lg border border-white/15 bg-black/20 p-3">
          <h3 className="text-sm font-semibold text-white">Configurações dinâmicas</h3>
          {dynamicFields.map((field) => {
            if (field.visible === false) return null

            if (field.type === 'toggle') {
              return (
                <ToggleField
                  key={field.key}
                  label={field.label}
                  checked={Boolean(field.value)}
                  onChange={(next) => actions.updateDynamicOption(event.id, field.key, next)}
                />
              )
            }

            return (
              <SelectField
                key={field.key}
                label={field.label}
                value={field.value}
                options={field.options}
                onChange={(value) => actions.updateDynamicOption(event.id, field.key, value)}
              />
            )
          })}
        </div>

        <FocusGroup className="mt-4 grid gap-2 sm:grid-cols-2">
          <FocusableButton
            icon="event"
            label="Ajuste rápido - valor anterior"
            onPress={() => {
              const firstSelectable = dynamicFields.find((field) => field.visible !== false && field.type !== 'toggle')
              if (!firstSelectable) return
              const nextValue = cycleOption(firstSelectable.options, firstSelectable.value, -1)
              actions.updateDynamicOption(event.id, firstSelectable.key, nextValue)
            }}
            disabled={!isHost}
          />
          <FocusableButton
            icon="event"
            label="Ajuste rápido - próximo valor"
            onPress={() => {
              const firstSelectable = dynamicFields.find((field) => field.visible !== false && field.type !== 'toggle')
              if (!firstSelectable) return
              const nextValue = cycleOption(firstSelectable.options, firstSelectable.value, 1)
              actions.updateDynamicOption(event.id, firstSelectable.key, nextValue)
            }}
            disabled={!isHost}
          />
          <FocusableButton icon="exit" label="Voltar" onPress={onBack} />
        </FocusGroup>
      </Panel>

      <ActionBar hints={[{ button: 'A', label: 'Selecionar/Alterar' }, { button: 'B', label: 'Voltar' }]} />
    </div>
  )
}

export default EventEditorScreen
