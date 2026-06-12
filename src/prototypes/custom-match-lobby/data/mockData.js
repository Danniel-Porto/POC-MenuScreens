import { buildDynamicOptions } from './gameModeSchema.js'

export const gameModes = ['Corrida', 'Rally', 'Contra o tempo', 'Drift']
export const circuits = ['Interlagos', 'Nurburgring', 'Spa-Francorchamps', 'Laguna Seca', 'Suzuka']
export const timeOfDayOptions = ['Manhã', 'Tarde', 'Noite', 'Por do sol']
export const vehicleCategories = ['GT3', 'Formula', 'Rally', 'Stock']
export const visibilityOptions = ['Publica', 'Privada', 'Apenas amigos']

export const availableVehicles = ['Astra GT3', 'Bolt XR', 'Vortex R', 'Falcon S', 'Drift K2']

export const initialPlayers = [
  { id: 'p1', name: 'Danniel', ping: 22, vehicle: 'Astra GT3', platform: 'PC', isReady: true, isHost: true },
  { id: 'p2', name: 'LiaRacer', ping: 41, vehicle: 'Bolt XR', platform: 'Xbox', isReady: true, isHost: false },
  { id: 'p3', name: 'TurboNiko', ping: 58, vehicle: 'Falcon S', platform: 'PlayStation', isReady: false, isHost: false },
  { id: 'p4', name: 'Ren_MX', ping: 89, vehicle: 'Vortex R', platform: 'PC', isReady: true, isHost: false },
  { id: 'p5', name: 'GhostDrift', ping: 130, vehicle: 'Drift K2', platform: 'Xbox', isReady: false, isHost: false },
  { id: 'p6', name: 'JadeTrack', ping: 72, vehicle: 'Astra GT3', platform: 'PC', isReady: true, isHost: false },
]

export function createDefaultEvent(index = 1) {
  return {
    id: `event-${Date.now()}-${index}`,
    name: `Evento ${index}`,
    mode: 'Corrida',
    circuit: circuits[0],
    timeOfDay: timeOfDayOptions[2],
    category: vehicleCategories[0],
    dynamicOptions: buildDynamicOptions('Corrida'),
  }
}

export const initialEvents = [createDefaultEvent(1)]
