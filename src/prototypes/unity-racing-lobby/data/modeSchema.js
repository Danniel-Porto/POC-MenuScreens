export const modeSchema = {
  Corrida: [
    { key: 'qualify', label: 'Qualify', type: 'toggle', defaultValue: true },
    {
      key: 'qualifyTime',
      label: 'Tempo do qualify',
      type: 'select',
      options: ['5 min', '10 min', '15 min'],
      defaultValue: '10 min',
      dependsOn: { key: 'qualify', value: true },
    },
    { key: 'laps', label: 'Voltas', type: 'select', options: ['3', '5', '8', '12'], defaultValue: '5' },
  ],
  Rally: [
    { key: 'stages', label: 'Etapas', type: 'select', options: ['2', '4', '6'], defaultValue: '4' },
    {
      key: 'surface',
      label: 'Superficie',
      type: 'select',
      options: ['Asfalto', 'Terra', 'Neve'],
      defaultValue: 'Terra',
    },
  ],
  'Contra o tempo': [
    { key: 'attempts', label: 'Tentativas', type: 'select', options: ['1', '2', '3'], defaultValue: '2' },
    {
      key: 'penalty',
      label: 'Penalidade atalho',
      type: 'select',
      options: ['2 s', '5 s', '10 s'],
      defaultValue: '5 s',
    },
  ],
  Drift: [
    { key: 'roundTime', label: 'Tempo round', type: 'select', options: ['60 s', '90 s', '120 s'], defaultValue: '90 s' },
    { key: 'multiplier', label: 'Multiplicador', type: 'select', options: ['1x', '1.5x', '2x'], defaultValue: '1.5x' },
  ],
}

export function makeDynamicOptions(mode) {
  const schema = modeSchema[mode] || []
  return schema.reduce((result, field) => {
    const visible = field.dependsOn ? result[field.dependsOn.key]?.value === field.dependsOn.value : true
    result[field.key] = {
      key: field.key,
      label: field.label,
      type: field.type,
      options: field.options || [],
      value: field.defaultValue,
      visible,
    }
    return result
  }, {})
}

export function refreshDynamicVisibility(options, mode) {
  const schema = modeSchema[mode] || []
  return schema.reduce((result, field) => {
    const existing = options[field.key]
    const visible = field.dependsOn ? result[field.dependsOn.key]?.value === field.dependsOn.value : true
    result[field.key] = {
      ...existing,
      key: field.key,
      label: field.label,
      type: field.type,
      options: field.options || [],
      value: existing?.value ?? field.defaultValue,
      visible,
    }
    return result
  }, {})
}
