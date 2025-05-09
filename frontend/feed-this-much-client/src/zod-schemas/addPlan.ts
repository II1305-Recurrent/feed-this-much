
import { z } from "zod";

export const addPlanSchema = z.object({
    title: z.string().min(1, "Please give this plan a name, it will be used to display your plans"),
    petname: z.number({
        required_error: "Please choose a pet",
    }),
    foodname: z.number({
        required_error: "Please choose a food",
    }),
    numberOfFoods: z.number({
        required_error: "Must be a number", // 1 for a single food, 2 for a second food and so on
    }),
    // SECOND FOOD ENTRIES - ALL CONDITIONALLY OPTIONAL, SEE SUPERREFINE SECTION
    secondfoodname: z.number().optional(),
    splitType: z.string().optional(), // either percentage or portion split
    splitMainFood: z.number().optional(), // the id of the food that has a fixed portion
    splitAmount: z.coerce.number().optional(), // the amount of either the percentage of food 1 OR the number of portions of splitMainFood
}).superRefine((data, ctx) => {

    // Controls if second food is required or not
    if (data.numberOfFoods == 2 && !data.secondfoodname) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You need to select the second food",
            path: ["secondfoodname"]
        });
    }

    // checks if not the same as first food if it is required
    if (data.numberOfFoods == 2 && data.secondfoodname == data.foodname) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You need to select two different foods",
            path: ["secondfoodname"]
        });
    }

    // sets 

});

export type addPlanSchemaType = typeof addPlanSchema._type
