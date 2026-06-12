import ActionBar from '../../../components/game-ui/ActionBar.jsx'
import FocusGroup from '../../../components/game-ui/FocusGroup.jsx'
import FocusableButton from '../../../components/game-ui/FocusableButton.jsx'
import { SelectField, TextField, ToggleField } from '../../../components/game-ui/FormFields.jsx'
import Panel from '../../../components/game-ui/Panel.jsx'
import { visibilityOptions } from '../data/mockData.js'

function SessionConfigScreen({ lobbyState, onBack }) {
  const { session, actions, isHost } = lobbyState

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Panel title="Configuração da sessão">
        <div className="grid gap-3 lg:grid-cols-2">
          <TextField
            label="Nome da sessão"
            value={session.name}
            onChange={(name) => actions.updateSession({ name })}
            placeholder="Digite o nome da sessão"
          />
          <SelectField
            label="Visibilidade"
            value={session.visibility}
            options={visibilityOptions}
            onChange={(visibility) => actions.updateSession({ visibility })}
          />
          <ToggleField
            label="Proteger com senha"
            checked={session.hasPassword}
            onChange={(hasPassword) =>
              actions.updateSession({
                hasPassword,
                password: hasPassword ? session.password : '',
              })
            }
          />
          {session.hasPassword ? (
            <TextField
              label="Senha da sessão"
              type="password"
              value={session.password}
              onChange={(password) => actions.updateSession({ password })}
              placeholder="Digite uma senha"
            />
          ) : null}
        </div>

        <FocusGroup className="mt-4 grid gap-2 sm:grid-cols-2">
          <FocusableButton icon="settings" label="Aplicar e voltar" onPress={onBack} disabled={!isHost} />
          <FocusableButton icon="exit" label="Cancelar" onPress={onBack} />
        </FocusGroup>
      </Panel>

      <ActionBar hints={[{ button: 'A', label: 'Aplicar' }, { button: 'B', label: 'Voltar ao lobby' }]} />
    </div>
  )
}

export default SessionConfigScreen
