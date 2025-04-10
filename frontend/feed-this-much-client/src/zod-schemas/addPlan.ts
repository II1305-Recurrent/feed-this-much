
import { z } from "zod";

export const addPlanSchema = z.object({
    title: z.string().min(1, "Please give this plan a name, it will be used to display your plans"),
    petname: z.number({
        required_error: "Please choose a pet",
    }),
    foodname: z.array(z.number(), {
        required_error: "Please select at least one food",
    })
        .min(1, "Please select at least one food"),
})

export type addPlanSchemaType = typeof addPlanSchema._type
