
import { z } from "zod";


export const addFoodSchema = z.object({

    foodname: z.string().min(2, "Food name must be at least 2 characters."),
    foodType: z.enum(["wet", "dry"], {
        required_error: "You need to select a food type.",
    }),
    foodServingType: z.enum(["tin", "sachet", "carton", "scoop"], {
        required_error: "You need to select a serving type.",
    }),
    servingWeightAmount: z.coerce
        .number({
            required_error: "A weight value is required",
            invalid_type_error: "Weight amount must be a number",
        })
        .max(10000, "Weight must be no more than 10000. If your serving has a higher weight value than this...we have questions.")
        .positive("Weight value must be greater than 0.  If your serving has no weight, you are starving your pet."),
    servingWeightUnit: z.enum(["Kgs", "grams", "lbs", "ounces"], {
        required_error: "Selecting a unit is required"
    }),
    energyAmount: z.coerce
        .number({
            required_error: "An energy value is required",
            invalid_type_error: "Energy amount must be a number",
        })
        .max(10000, "Energy must be no more than 10000. If your food has a higher energy value than this...we have questions.")
        .positive("Energy value must be greater than 0.  If your food has no energy, it is not complete pet food."),
    energyUnit: z.enum(["KJ", "kcal", "calories"], {
        required_error: "Selecting a unit is required"
    }),
    perWeightAmount: z.coerce
        .number({
            required_error: "A weight value is required",
            invalid_type_error: "Weight amount must be a number",
        })
        .max(10000, "Weight must be no more than 10000. If your food has a higher weight value than this...we have questions.")
        .positive("Weight value must be greater than 0.  If your food has no weight, it is not complete pet food."),
    weightUnit: z.enum(["Kgs", "grams", "lbs", "ounces"], {
        required_error: "Selecting a unit is required"
    }),
    proteinPercent: z.coerce
        .number({
            invalid_type_error: "Percentage must be a number",
        })
        .max(100, "Percentage cannot be more than 100%")
        .optional(),
    fatPercent: z.coerce
        .number({
            invalid_type_error: "Percentage must be a number",
        })
        .max(100, "Percentage cannot be more than 100%")
        .optional(),
})

export type addFoodSchemaType = typeof addFoodSchema._type
