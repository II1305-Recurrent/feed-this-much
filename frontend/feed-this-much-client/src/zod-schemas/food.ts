
import { z } from "zod";


export const addFoodSchema = z.object({

    foodname: z.string().min(2, "Food name must be at least 2 characters."),


})

export type addFoodSchemaType = typeof addFoodSchema._type
