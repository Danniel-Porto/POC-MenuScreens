import { useState } from 'react'
import PageShell from '../../components/PageShell.jsx'

const menuTabs = [
  { id: 'play', label: 'Jogar' },
  { id: 'garage', label: 'Garagem' },
  { id: 'events', label: 'Eventos' },
]

function RacingLobbyPrototype() {
  const [activeTab, setActiveTab] = useState('play')
  const [isRaceSetupOpen, setRaceSetupOpen] = useState(false)

  return (
    <PageShell
      backToHome
      title="Prototipo: Lobby Principal"
      subtitle="Tela de entrada do jogo com navegação principal e modal de configuracao de corrida."
    >
      <section className="space-y-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 md:p-6">
          <div className="mb-5 flex flex-wrap gap-2">
            {menuTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'play' ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Corrida Rapida</h2>
              <p className="text-sm text-slate-300">
                Exemplo de estado principal do lobby com CTA para abrir o fluxo de setup.
              </p>
              <button
                type="button"
                onClick={() => setRaceSetupOpen(true)}
                className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Iniciar Setup da Corrida
              </button>
            </div>
          ) : null}

          {activeTab === 'garage' ? (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Garagem</h2>
              <p className="text-sm text-slate-300">Area de customizacao do carro (placeholder).</p>
            </div>
          ) : null}

          {activeTab === 'events' ? (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Eventos</h2>
              <p className="text-sm text-slate-300">Lista de eventos ativos (placeholder).</p>
            </div>
          ) : null}
        </div>

        {isRaceSetupOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
            <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-5">
              <h3 className="text-lg font-semibold text-white">Setup de Corrida</h3>
              <p className="mt-2 text-sm text-slate-300">
                Modal de exemplo para validar subfluxo do prototipo sem sair da tela principal.
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={() => setRaceSetupOpen(false)}
                  className="rounded-md border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </PageShell>
  )
}

export default RacingLobbyPrototype
