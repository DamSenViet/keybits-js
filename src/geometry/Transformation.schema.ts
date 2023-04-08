export default {
  type: "object",
  required: ["className", "data",],
  properties: {
    className: { const: "Transformation" },
    data: {
      type: "object",
      required: [
        "originX",
        "originY",
        "translateX",
        "translateY",
        "rotation",
        "scaleX",
        "scaleY",
      ],
      properties: {
        originX: { type: "string" },
        originY: { type: "string" },
        translateX: { type: "string" },
        translateY: { type: "string" },
        rotation: { type: "string" },
        scaleX: { type: "string" },
        scaleY: { type: "string" },
      },
    },
  },
  additionalProperties: false,
};