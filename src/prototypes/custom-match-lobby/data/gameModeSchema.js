export const gameModeSchema = {
  Corrida: [
    {
      key: 'qualify',
      label: 'Qualify',
      type: 'toggle',
      defaultValue: true,
    },
    {
      key: 'qualifyDuration',
      label: 'Tempo do Qualify',
      type: 'select',
      options: ['5 min', '10 min', '15 min'],
      defaultValue: '10 min',
      dependsOn: { key: 'qualify', value: true },
    },
    {
      key: 'laps',
      label: 'Voltas',
      type: 'select',
      options: ['3', '5', '8', '12'],
      defaultValue: '5',
    },
  ],
  Rally: [
    {
      key: 'stages',
      label: 'Etapas',
      type: 'select',
      options: ['2', '4', '6'],
      defaultValue: '4',
    },
    {
      key: 'surface',
      label: 'Superfície',
      type: 'select',
      options: ['Asfalto', 'Terra', 'Neve'],
      defaultValue: 'Terra',
    },
  ],
  'Contra o tempo': [
    {
      key: 'attempts',
      label: 'Tentativas',
      type: 'select',
      options: ['1', '2', '3'],
      defaultValue: '2',
    },
    {
      key: 'penalty',
      label: 'Penalidade por atalho',
      type: 'select',
      options: ['2 s', '5 s', '10 s'],
      defaultValue: '5 s',
    },
  ],
  Drift: [
    {
      key: 'roundDuration',
      label: 'Tempo do round',
      type: 'select',
      options: ['60 s', '90 s', '120 s'],
      defaultValue: '90 s',
    },
    {
      key: 'multiplier',
      label: 'Multiplicador',
      type: 'select',
      options: ['1x', '1.5x', '2x'],
      defaultValue: '1.5x',
    },
  ],
}

export function buildDynamicOptions(mode) {
  const schema = gameModeSchema[mode] || []

  return schema.reduce((accumulator, field) => {
    const visible = field.dependsOn
      ? accumulator[field.dependsOn.key]?.value === field.dependsOn.value
      : true

    accumulator[field.key] = {
      key: field.key,
      label: field.label,
      type: field.type,
      options: field.options || [],
      value: field.defaultValue,
      visible,
    }

    return accumulator
  }, {})
}

export function updateDynamicVisibility(dynamicOptions, mode) {
  const schema = gameModeSchema[mode] || []

  return schema.reduce((accumulator, field) => {
    const currentOption = dynamicOptions[field.key]
    const visible = field.dependsOn
      ? accumulator[field.dependsOn.key]?.value === field.dependsOn.value
      : true

    accumulator[field.key] = {
      ...currentOption,
      key: field.key,
      label: field.label,
      type: field.type,
      options: field.options || [],
      value: currentOption?.value ?? field.defaultValue,
      visible,
    }
    return accumulator
  }, {})
}
