
import { z } from "zod";

export const addPlanSchema = z.object({
    title: z.string().min(1, "Please give this plan a name, it will be used to display your plans"),
    petId: z.coerce.number({
        required_error: "Please choose a pet",
    }).min(1, "Please select a pet"),
    foodId: z.coerce.number({
        required_error: "Please choose a food",
    }).min(1, "Please select a food"),
    numberOfFoods: z.coerce.number({
        required_error: "Must be a number", // 1 for a single food, 2 for a second food and so on
    }),
    // SECOND FOOD ENTRIES - ALL CONDITIONALLY OPTIONAL, SEE SUPERREFINE SECTION
    secondFoodId: z.coerce.number().optional(),
    splitType: z.string().optional(), // either "percentage" or "portion" split
    splitMainFoodId: z.coerce.number().optional(), // the id of the food that has a fixed portion
    splitAmount: z.coerce.number().optional(), // the amount of the percentage of food 1 
    fixedServingsAmount: z.coerce.number().optional(), // the number of servings of food set by splitMainFoodID
}).superRefine((data, ctx) => {

    // Controls if second food is required or not
    if (data.numberOfFoods == 2 && data.secondFoodId == 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You need to select the second food",
            path: ["secondFoodId"]
        });
    }

    // checks if not the same as first food if it is required
    if (data.numberOfFoods == 2 && data.secondFoodId == data.foodId) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You need to select two different foods",
            path: ["secondFoodId"]
        });
    }

    // sets splitType to required if second food required
    if (data.numberOfFoods > 1 && data.splitType == "") {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You need to choose a way to mix your foods - either by percentage or by choosing a fixed amount of one.",
            path: ["splitType"]
        });
    }

    // if splitType is by fixed portion, make setting a main food mandatory
    if (data.numberOfFoods > 1 && data.splitType == "portion" && !data.splitMainFoodId) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You need to choose a food to set a number of servings.",
            path: ["splitMainFoodId"]
        });
    }

    // if splitType is by fixed portion, makes sure the chosen food is food one or food two
    if (
        data.numberOfFoods > 1 &&
        data.splitType === "portion" &&
        data.splitMainFoodId !== data.foodId &&
        data.splitMainFoodId !== data.secondFoodId
    ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You need to choose one of your previously selected foods.",
            path: ["splitMainFoodId"]
        });
    }

    // sets splitAmount to required if second food required
    if (data.numberOfFoods > 1 && !data.splitAmount) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You need to set an amount.",
            path: ["splitAmount"]
        });
    }

    // sets fixedServingsAmount to required if split type is  required
    if (
        data.numberOfFoods > 1 &&
        data.splitType === "portion" &&
        !data.fixedServingsAmount) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You need to set a number of servings.",
            path: ["fixedServingsAmount"]
        });
    }

});

export type addPlanSchemaType = typeof addPlanSchema._type