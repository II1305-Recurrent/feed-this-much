"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { getRequest, postRequest } from "@/utils/fetchApi";


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

import { addPlanSchema, type addPlanSchemaType } from "@/zod-schemas/addPlan"
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

function AddPlanForm() {

    const router = useRouter();
    const [pets, setPets] = useState([]);
    const [foods, setFoods] = useState([]);

    async function getFoods() {
        const response = await getRequest({ path: '/api/get-foods/' });
        if (response.ok) {
            if (response.payload !== "No food yet") {
                setFoods(response.payload);
                console.log("Foods fetched", response.payload);
            }
        }

    }

    async function getPets() {

        const response = await getRequest({ path: '/api/get-pets/' });

        if (response.ok) {
            if (response.payload !== "No pets yet!") {
                setPets(response.payload);
                console.log("Pets fetched", response.payload);
            }
        }

    }

    useEffect(() => {
        getPets();
        getFoods();
        console.log(pets);
    }, []);

    // To Toggle the Second Food
    const [secondFood, setSecondFood] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof addPlanSchema>>({
        resolver: zodResolver(addPlanSchema),
        defaultValues: {
            title: "Default title", //maybe generate random number based on ids of previous plans?
            foodname: null,
            petname: null,
        },
    })

    async function onSubmit(values: z.infer<typeof addPlanSchema>) {
        const form_schema_mapping = {
            foodname: "food_id",
            title: "plan_title",
            petname: "pet_id"
        };
        const data: Record<string, any> = {};
        for (const [formKey, apiKey] of Object.entries(form_schema_mapping)) {
            data[apiKey] = values[formKey as keyof typeof values];
        }

        const response = await postRequest({ path: '/api/generate-plan/', body: data });

        if (response.ok) {
            console.log("Plan submitted");
            const newPlanId = response.payload?.id; // getting the new plan id
            console.log("Plan submitted with ID:", newPlanId);

            if (newPlanId) {
                // Navigate to the display plan page using the new plan ID
                router.push(`/displayplan?id=${newPlanId}`);
            } else {
                console.error("Failed to retrieve plan ID from the response.");
                router.push('/home');
            }
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            <FormLabel className={undefined}>Plan Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a name for the plan" {...field} />
                            </FormControl>
                            <FormDescription className={undefined}>
                                Use a memorable name for the plan. This will be used later to identify your plans.
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
                            <FormLabel className={undefined}>Pet Name</FormLabel>
                            <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                                <FormControl>
                                    <SelectTrigger className={undefined} >
                                        <SelectValue placeholder="Select pet" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className={undefined} >
                                    {pets.map((item) => <SelectItem key={item.id} className={undefined} value={item.id.toString()}>{item.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormDescription className={undefined}>
                                Choose which pet the plan is for.
                            </FormDescription>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="foodname"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            <FormLabel className={undefined}>Food Name</FormLabel>
                            <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                                <FormControl>
                                    <SelectTrigger className={undefined} >
                                        <SelectValue placeholder="Select food" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className={undefined} >
                                    {foods.map((item) => <SelectItem key={item.id} className={undefined} value={item.id.toString()}>{item.food_name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormDescription className={undefined}>
                                Choose which food the plan is using.
                            </FormDescription>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                {
                    !secondFood && (
                        <Button variant="outline" className={undefined} size={undefined} onClick={() => setSecondFood(true)}>
                            Add Another Food
                        </Button>
                    )
                }
                {
                    secondFood && (
                        <div>
                            <Button variant="outline" className={undefined} size={undefined} onClick={() => setSecondFood(false)}>
                                Remove Other Food
                            </Button>
                            <FormField
                                control={form.control}
                                name="secondfoodname"
                                render={({ field }) => (
                                    <FormItem className={undefined}>
                                        <FormLabel className={undefined}>Second Food Name</FormLabel>
                                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                                            <FormControl>
                                                <SelectTrigger className={undefined} >
                                                    <SelectValue placeholder="Select food" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className={undefined} >
                                                {foods.map((item) => <SelectItem key={item.id} className={undefined} value={item.id.toString()}>{item.food_name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className={undefined}>
                                            Choose a second food the plan is using.
                                        </FormDescription>
                                        <FormMessage className={undefined} />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )
                }

                <Button type="submit" className="bg-[var(--custom-blue)] hover:bg-blue-700 text-white px-8 py-3 rounded-lg w-full max-w-xs mx-auto !mt-2" variant={undefined} size={undefined}>Submit</Button>
            </form>
        </Form>
    )

}

export default AddPlanForm;
