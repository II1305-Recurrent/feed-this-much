import { z } from "zod";

export const activitySchema = z.object({
    activityLevel: z.coerce.number().int(),
})

export type activitySchemaType = typeof activitySchema._type
