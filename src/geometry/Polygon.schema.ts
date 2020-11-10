import pointSchema from "./Point.schema";

export default {
  type: "object",
  required: ["className", "data",],
  properties: {
    className: { const: "Polygon" },
    data: {
      type: "object",
      required: ["points"],
      properties: {
        points: {
          type: "array",
          items: pointSchema,
          minItems: 3,
        },
      },
    },
  },
  additionalProperties: false,
};