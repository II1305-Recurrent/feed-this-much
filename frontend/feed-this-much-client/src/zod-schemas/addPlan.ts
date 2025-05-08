
import { z } from "zod";

export const addPlanSchema = z.object({
    title: z.string().min(1, "Please give this plan a name, it will be used to display your plans"),
    petname: z.number({
        required_error: "Please choose a pet",
    }),
    foodname: z.number({
        required_error: "Please choose a food",
    }),
    isSecondFoodRequired: z.boolean({
        required_error: "Must be true or false",
    }),
    secondfoodname: z.number().optional(),
}).superRefine((data, ctx) => {

    // Controls if second food is required or not
    if (data.isSecondFoodRequired == true && !data.secondfoodname) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You need to select the second food",
            path: ["secondfoodname"]
        });
    }

    // checks if not the same as first food if it is required
    if (data.isSecondFoodRequired == true && data.secondfoodname == data.foodname) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You need to select two different foods",
            path: ["secondfoodname"]
        });
    }

});

export type addPlanSchemaType = typeof addPlanSchema._type
