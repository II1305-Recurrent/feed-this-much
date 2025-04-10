
import { z } from "zod";

export const addPetSchema = z.object({
    name: z.string().min(2, "Pet name must be at least 2 characters."),
    dob: z.string().date("Please enter a date in the format YYYY-MM-DD"),
    current_weight: z.coerce
        .number({
            required_error: "Weight is required",
            invalid_type_error: "Weight must be a number",
        })
        .max(343, "Weight must be no more than 343 lbs. If your animal weighs more than this, call the Guinness World Records!")
        .positive("Weight must be greater than 0"),
    species: z.enum(["cat", "dog"], {
        required_error: "You need to select either a dog or a cat.",
    }),
    expected_weight: z.coerce
        .number({
            required_error: "An expected weight is required for all dogs up to 1 year old",
            invalid_type_error: "Expected weight must be a number",
        })
        .max(343, "Weight must be no more than 343 lbs. If your animal will weigh more than this, call the Guinness World Records!")
        .positive("Weight must be greater than 0"),
    neutered: z.boolean({
        required_error: "An answer is required",
        invalid_type_error: "Neutered must be a boolean",
    }),
    weight_unit: z.enum(["kg", "lb"], {
        required_error: "Selecting a unit is required"
    }),
    condition_score: z.coerce.number().int(),
    activity_level: z.enum(["catlow", "catmoderate", "cathigh", "catkitten", "doglow", "dogmoderatelow", "dogmoderatehigh", "doghigh", "dogveryhigh"], {
        required_error: "You need to select an activity level.",
    }),
})

export type addPetSchemaType = typeof addPetSchema._type
