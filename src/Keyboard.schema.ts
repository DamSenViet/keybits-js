export default {
  type: 'object',
  required: ['className', 'data'],
  properties: {
    className: { const: 'Keyboard' },
    data: {
      type: 'object',
      required: [],
      properties: {},
    },
  },
  additionalProperties: false,
}
