import RacingLobbyPrototype from './racing-lobby/RacingLobbyPrototype.jsx'

export const prototypes = [
  {
    id: 'racing-lobby',
    title: 'Lobby Principal',
    description: 'Entrada do jogo com navegacao base e modal de setup de corrida.',
    tags: ['menu', 'modal', 'fluxo-inicial'],
    component: RacingLobbyPrototype,
  },
]

export function getPrototypeById(id) {
  return prototypes.find((prototype) => prototype.id === id)
}
