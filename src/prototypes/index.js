import RacingLobbyPrototype from './racing-lobby/RacingLobbyPrototype.jsx'
import CustomMatchLobbyPrototype from './custom-match-lobby/CustomMatchLobbyPrototype.jsx'
import UnityRacingLobbyPrototype from './unity-racing-lobby/UnityRacingLobbyPrototype.jsx'

export const prototypes = [
  {
    id: 'racing-lobby',
    title: 'Lobby Principal',
    description: 'Entrada do jogo com navegacao base e modal de setup de corrida.',
    tags: ['menu', 'modal', 'fluxo-inicial'],
    component: RacingLobbyPrototype,
  },
  {
    id: 'custom-match-lobby',
    title: 'Lobby - Partida Personalizada',
    description:
      'Lobby completo com jogadores, eventos, configuracoes de host e navegacao com controle.',
    tags: ['lobby', 'multiplayer', 'controle', 'config'],
    component: CustomMatchLobbyPrototype,
  },
  {
    id: 'unity-racing-lobby',
    title: 'Lobby Unity - High Fidelity',
    description:
      'Lobby multiplayer high-fidelity com hierarquia visual forte, otimizado para controle e teclado.',
    tags: ['unity', 'lobby', 'high-fidelity', 'gamepad'],
    component: UnityRacingLobbyPrototype,
  },
]

export function getPrototypeById(id) {
  return prototypes.find((prototype) => prototype.id === id)
}
