import { z } from "zod";

export const activitySchema = z.object({
    activityLevel: z.enum(["catlow", "catmoderate", "cathigh", "catkitten", "doglow", "dogmoderatelow", "dogmoderatehigh", "doghigh", "dogveryhigh"], {
        required_error: "You need to select an activity level.",
    }),
})

export type activitySchemaType = typeof activitySchema._type
