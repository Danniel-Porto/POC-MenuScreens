import { makeDynamicOptions } from './modeSchema.js'

export const gameModes = ['Corrida', 'Rally', 'Contra o tempo', 'Drift']
export const tracks = ['Interlagos', 'Nurburgring', 'Spa-Francorchamps', 'Suzuka', 'Laguna Seca']
export const dayTimes = ['Manha', 'Tarde', 'Noite', 'Por do sol']
export const vehicleClasses = ['GT3', 'Prototipo', 'Rally', 'Touring']
export const weatherOptions = ['Limpo', 'Nublado', 'Chuva leve', 'Tempestade']
export const sessionVisibilities = ['Publica', 'Privada', 'Apenas amigos']

export const profile = {
  avatarLabel: 'DR',
  nickname: 'DannielRacing',
  currency: 128450,
}

export const playersSeed = [
  { id: 'p1', name: 'DannielRacing', ping: 24, selectedClass: 'GT3', selectedCar: 'Apex GT-R', platform: 'PC', isHost: true, ready: true },
  { id: 'p2', name: 'LiaTurbo', ping: 38, selectedClass: 'GT3', selectedCar: 'Falcon V8', platform: 'Xbox', isHost: false, ready: true },
  { id: 'p3', name: 'NikoDrift', ping: 67, selectedClass: 'Touring', selectedCar: 'Nova RS', platform: 'PC', isHost: false, ready: false },
  { id: 'p4', name: 'StormRally', ping: 89, selectedClass: 'Rally', selectedCar: 'Terra X', platform: 'PlayStation', isHost: false, ready: true },
  { id: 'p5', name: 'JadeCircuit', ping: 118, selectedClass: 'Prototipo', selectedCar: 'Lynx LMH', platform: 'PC', isHost: false, ready: false },
  { id: 'p6', name: 'RoadGhost', ping: 54, selectedClass: 'GT3', selectedCar: 'Asterion S', platform: 'PC', isHost: false, ready: true },
]

export function buildEvent(index) {
  return {
    id: `event-${Date.now()}-${index}`,
    name: `Evento ${index}`,
    mode: 'Corrida',
    track: tracks[0],
    timeOfDay: dayTimes[2],
    weather: weatherOptions[0],
    vehicleClass: vehicleClasses[0],
    dynamicOptions: makeDynamicOptions('Corrida'),
  }
}

export const eventsSeed = [buildEvent(1)]
