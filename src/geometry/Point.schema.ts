export default {
  type: "object",
  required: ["x", "y",],
  properties: {
    x: { type: "string" },
    y: { type: "string" },
  },
  additionalProperties: false,
};