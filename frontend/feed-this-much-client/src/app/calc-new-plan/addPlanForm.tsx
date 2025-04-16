"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
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

import { addPlanSchema, type addPlanSchemaType } from "@/zod-schemas/addPlan"
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

function AddPlanForm() {
    const router = useRouter();
    const [pets, setPets] = useState([]);
    const [foods, setFoods] = useState([]);


    const debug = true; //for testing purposes
    let base_url = 'https://api.feedthismuch.com';
    if (debug) {
        base_url = 'http://localhost:8000';
    }

    function getCookie(name: string): string | null {
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith(name + '='))
            ?.split('=')[1];
        return cookieValue ?? null;
    }

    async function getFoods() {
        try {
            const csrftoken = getCookie('csrftoken');
            const response = await fetch(base_url.concat('/api/get-foods/'), {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                credentials: 'include',
            });

            if (response.ok) {
                const foods = await response.json();
                if (foods !== "No food yet!"){
                setFoods(foods);
                }
                console.log('Foods fetched successfully:', foods);
                //window.location.href = '/home';
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (err) {
            console.error('Request failed', err);
        }

    }


    async function getPets() {

        try {
            const csrftoken = getCookie('csrftoken');
            const response = await fetch(base_url.concat('/api/get-pets/'), {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                credentials: 'include',
            });

            if (response.ok) {
                const pets = await response.json();
                if (pets != "No pets yet!"){
                setPets(pets);
                }
                console.log('Pets fetched successfully:', pets);
                //window.location.href = '/home';
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (err) {
            console.error('Request failed', err);
        }

    }

    useEffect(() => {
        getPets();
        getFoods();
        console.log(pets);
    }, []);

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
        console.log(values.foodname);
        router.push('/home');
        const form_schema_mapping = {
            foodname: "food_id",
            title: "plan_title",
            petname: "pet_id"
        };
        const data: Record<string, any> = {};
        for (const [formKey, apiKey] of Object.entries(form_schema_mapping)) {
            data[apiKey] = values[formKey as keyof typeof values];
        }
        try {
            const csrftoken = getCookie('csrftoken');
            const response = await fetch(base_url.concat('/api/generate-plan/'), {
                method: 'POST',
                headers: {
                    'Content-Type': ' application/json',
                    'X-CSRFToken': csrftoken,
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Info sent to generator');
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (err) {
            console.error('Request failed', err);
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
                <Button type="submit" className="bg-[var(--custom-blue)] hover:bg-blue-700 text-white px-8 py-3 rounded-lg w-full max-w-xs mx-auto !mt-2" variant={undefined} size={undefined}>Submit</Button>
            </form>
        </Form>
    )

}

export default AddPlanForm;
