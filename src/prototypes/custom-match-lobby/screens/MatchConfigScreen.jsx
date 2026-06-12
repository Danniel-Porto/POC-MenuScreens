import ActionBar from '../../../components/game-ui/ActionBar.jsx'
import FocusGroup from '../../../components/game-ui/FocusGroup.jsx'
import FocusableButton from '../../../components/game-ui/FocusableButton.jsx'
import Panel from '../../../components/game-ui/Panel.jsx'

function MatchConfigScreen({ lobbyState, onBack, onGoSingleEditor, onGoChampionship }) {
  const { isHost, matchType, actions } = lobbyState

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Panel title="Configuração da partida">
        <p className="mb-3 text-sm text-slate-200">
          Defina se a sessão atual é uma partida única ou um campeonato com múltiplos eventos.
        </p>

        <FocusGroup className="grid gap-2 sm:grid-cols-2">
          <FocusableButton
            icon="event"
            label={matchType === 'single' ? 'Partida única (ativa)' : 'Partida única'}
            onPress={() => actions.updateMatchType('single')}
            disabled={!isHost}
          />
          <FocusableButton
            icon="trophy"
            label={matchType === 'championship' ? 'Campeonato (ativo)' : 'Campeonato'}
            onPress={() => actions.updateMatchType('championship')}
            disabled={!isHost}
          />
          <FocusableButton
            icon="settings"
            label="Editar evento da partida única"
            onPress={onGoSingleEditor}
            disabled={!isHost || matchType !== 'single'}
          />
          <FocusableButton
            icon="trophy"
            label="Gerenciar eventos do campeonato"
            onPress={onGoChampionship}
            disabled={!isHost || matchType !== 'championship'}
          />
          <FocusableButton icon="exit" label="Voltar ao lobby" onPress={onBack} />
        </FocusGroup>
      </Panel>

      <ActionBar
        hints={[
          { button: 'A', label: 'Aplicar/Entrar' },
          { button: 'B', label: 'Voltar ao lobby' },
          { button: 'D-pad', label: 'Mover foco' },
        ]}
      />
    </div>
  )
}

export default MatchConfigScreen
