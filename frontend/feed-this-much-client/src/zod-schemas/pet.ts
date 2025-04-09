
import { z } from "zod";

export const addPetSchema = z.object({
    petname: z.string().min(2, "Pet name must be at least 2 characters."),
    dateOfBirth: z.string().date("Please enter a date in the format YYYY-MM-DD"),
    currentWeight: z.coerce
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .max(343, "Weight must be no more than 343 lbs. If your animal weighs more than this, call the Guinness World Records!")
    .positive("Weight must be greater than 0"),
    species: z.enum(["cat", "dog"], {
      required_error: "You need to select either a dog or a cat.",
    }),
    neutered: z.enum(["yes", "no"], {
      required_error: "You need to select either yes or no.",
    }),
    isKg: z.enum(["Kgs", "lbs"], {
      required_error: "Selecting a unit is required"
    }),
    bodyConditionScore: z.coerce.number().int(),
    activityLevel: z.coerce.number().int(),
})

export type addPetSchemaType = typeof addPetSchema._type
