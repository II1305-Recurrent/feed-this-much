
import { z } from "zod";

export const addPetSchema = z.object({
    petname: z.string().min(2, "Pet name must be at least 2 characters."),
    dateOfBirth: z.string().date("Please enter a date in the format YYYY-MM-DD"),
})

export type addPetSchemaType = typeof addPetSchema._type
