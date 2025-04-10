
import { z } from "zod";

export const addPlanSchema = z.object({
    title: z.string().min(1, "Please give this plan a name, it will be used to display your plans"),
    petname: z.number({
      required_error: "Please choose a pet",
    }),
    // dateOfBirth: z.string().date("Please enter a date in the format YYYY-MM-DD"),
    // currentWeight: z.coerce
    // .number({
    //   required_error: "Weight is required",
    //   invalid_type_error: "Weight must be a number",
    // })
    // .max(343, "Weight must be no more than 343 lbs. If your animal weighs more than this, call the Guinness World Records!")
    // .positive("Weight must be greater than 0"),
    // species: z.enum(["cat", "dog"], {
    //   required_error: "You need to select either a dog or a cat.",
    // }),
    // neutered: z.enum(["yes", "no"], {
    //   required_error: "You need to select either yes or no.",
    // }),
    // isKg: z.enum(["Kgs", "lbs"], {
    //   required_error: "Selecting a unit is required"
    // }),
    // bodyConditionScore: z.coerce.number().int(),
    // activityLevel: z.coerce.number().int(),
    foodname: z.array(z.number(), {
      required_error: "Please select at least one food",
    })
    .min(1, "Please select at least one food"),
})

export type addPlanSchemaType = typeof addPlanSchema._type
