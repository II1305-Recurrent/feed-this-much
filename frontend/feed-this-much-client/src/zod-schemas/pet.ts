
import { z } from "zod";

export const addPetSchema = z.object({
    petname: z.string().min(2, {
      message: "Pet name must be at least 2 characters.",
    }),
})

export type addPetSchemaType = typeof addPetSchema._type
