"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"

import { addPlanSchema, type addPlanSchemaType } from "@/zod-schemas/food"

function AddPlanForm() {

    // 1. Define your form.
    const form = useForm<z.infer<typeof addPlanSchema>>({
        resolver: zodResolver(addPlanSchema),
        defaultValues: {
            foodname: "Air",
            petname: "Steve"
        },
    })

    function onSubmit(values: z.infer<typeof addPlanSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="foodname"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            <FormLabel className={undefined}>Pet Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the name of the food" {...field} />
                            </FormControl>
                            <FormDescription className={undefined}>
                                Use a memorable name or nickname for the food.
                            </FormDescription>
                            <FormMessage className={undefined} />
                        </FormItem>


                    )}
                />
                <FormField
                    control={form.control}
                    name="petname"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            <FormLabel className={undefined}>Food Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the name of the food" {...field} />
                            </FormControl>
                            <FormDescription className={undefined}>
                             Choose name
                            </FormDescription>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <Button type="submit" className={undefined} variant={undefined} size={undefined}>Submit</Button>
            </form>
        </Form>
    )

}

export default AddPlanForm;
