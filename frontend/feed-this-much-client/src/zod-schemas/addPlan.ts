
import { z } from "zod";

export const addPlanSchema = z.object({
    title: z.string().min(1, "Please give this plan a name, it will be used to display your plans"),
    petname: z.number({
        required_error: "Please choose a pet",
    }),
    foodname: z.number({
        required_error: "Please choose a food",
    }),
})

export type addPlanSchemaType = typeof addPlanSchema._type
