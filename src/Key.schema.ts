export default {
  type: 'object',
  required: ['className', 'data'],
  properties: {
    className: { const: 'Key' },
    data: {
      type: 'object',
      required: [],
      properties: {},
    },
  },
  additionalProperties: false,
}
