
import { z } from "zod";

export const addPetSchema = z.object({
    petname: z.string().min(2, "Pet name must be at least 2 characters."),
    dateOfBirth: z.string().date("Please enter a date in the format YYYY-MM-DD"),
    currentWeight: z.coerce
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .positive("Weight must be greater than 0")
})

export type addPetSchemaType = typeof addPetSchema._type
