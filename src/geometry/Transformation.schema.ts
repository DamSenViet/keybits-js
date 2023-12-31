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
        originX: { type: "number" },
        originY: { type: "number" },
        translateX: { type: "number" },
        translateY: { type: "number" },
        rotation: { type: "number" },
        scaleX: { type: "number" },
        scaleY: { type: "number" },
      },
    },
  },
  additionalProperties: false,
};