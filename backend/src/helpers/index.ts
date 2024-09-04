import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";

export function zodToSwaggerSchema(zodSchema: z.ZodType<any, any, any>) {
  return generateSchema(zodSchema);
}
