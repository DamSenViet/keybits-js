import pointSchema from "./Point.schema";

export default {
  type: "object",
  required: ["start", "end"],
  properties: {
    start: pointSchema,
    end: pointSchema,
  }
};