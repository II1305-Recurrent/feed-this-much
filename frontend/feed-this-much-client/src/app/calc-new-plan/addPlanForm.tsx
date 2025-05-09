"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
//import { Slider } from "@/components/ui/slider"
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Badge } from "@/components/ui/badge"; // needed for slider label

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

    // To Toggle the Split Type
    const [splitPercentageToggle, setPercentageToggle] = useState(false);
    const [splitPortionToggle, setPortionToggle] = useState(false);

    // Slider State
    const [sliderProgress, setSliderProgress] = useState([50]);

    // 1. Define your form.
    const form = useForm<z.infer<typeof addPlanSchema>>({
        resolver: zodResolver(addPlanSchema),
        defaultValues: {
            title: "Default title", //maybe generate random number based on ids of previous plans?
            foodId: null,
            petId: null,
            numberOfFoods: 1,
            secondFoodId: null,
            splitType: null, // either percentage or portion split
            splitMainFoodId: null, // the id of the food that has a fixed portion
            splitAmount: undefined, // the amount of either the percentage of food 1 OR the number of portions of splitMainFood
        },
    })

    async function onSubmit(values: z.infer<typeof addPlanSchema>) {
        // maps the frontend to the api names
        const form_schema_mapping = {
            foodId: "food_id",
            title: "plan_title",
            petId: "pet_id",
            numberOfFoods: "number_of_foods",
            secondFoodId: "second_food_id",
            splitType: "split_type",
            splitMainFoodId: "split_main_food_id",
            splitAmount: "split_amount"
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

    // Second Food Handlers - Yes, I know this is horrible, and it can only handle one extra food
    // I don't have time to worry about scalability at this point, sorry
    const handleAddSecondFood = () => {
        // Set isSecondFoodRequired to true before submitting the form
        form.setValue("numberOfFoods", 2);
        setSecondFood(true);
    };

    const handleRemoveSecondFood = () => {
        // Set isSecondFoodRequired to false before submitting the form
        // removes any previously selected second food
        form.setValue("numberOfFoods", 1);
        form.setValue("secondFoodId", null);
        form.setValue("splitType", null); // reset the previously selected split
        form.setValue("splitAmount", undefined); // reset the previously selected split amount
        setSecondFood(false);
        setPortionToggle(false);
        setPercentageToggle(false);
    };

    // Food Split Handlers
    function handleSplitChange(v) {
        form.setValue("splitType", v);
        if (v == "percentage") {
            setPercentageToggle(true);
            setPortionToggle(false);
        }
        if (v == "portion") {
            setPercentageToggle(false);
            setPortionToggle(true);
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
                        <Button variant="outline" className={undefined} size={undefined} onClick={handleAddSecondFood} >
                            Add Another Food
                        </Button>
                    )
                }
                {
                    secondFood && (
                        <div>
                            <Button variant="outline" className={undefined} size={undefined} onClick={handleRemoveSecondFood} >
                                Remove Other Food
                            </Button>
                            <FormField
                                control={form.control}
                                name="secondFoodId"
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
                            <FormField
                                control={form.control}
                                name="splitType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className={undefined}>How do you want to combine the food?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={(v) => { field.onChange(v); handleSplitChange(v) }}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="percentage" className={undefined} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Calorie percentage split e.g. 25% of one, 75% of the other
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="portion" className={undefined} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Set a fixed portion for one food e.g. one tin of one, calculate the other
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage className={undefined} />
                                    </FormItem>
                                )}
                            />
                            {
                                // PERCENTAGE SPLIT FORM INPUTS
                                splitPercentageToggle && (
                                    <FormField
                                        control={form.control}
                                        name="splitAmount"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel className={undefined}>Adjust the slider to set the percentage</FormLabel>
                                                <div className="w-full flex items-center justify-between gap-2">
                                                    <span className="text-sm text-muted-foreground">Food One</span>
                                                    <FormControl>
                                                        <SliderPrimitive.Root
                                                            defaultValue={sliderProgress}
                                                            max={100}
                                                            step={25}
                                                            onValueChange={setSliderProgress}
                                                            className="relative flex w-full touch-none select-none items-center"
                                                        >
                                                            <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[var(--custom-blue)]/20">
                                                                <SliderPrimitive.Range className="absolute h-full bg-[var(--custom-blue)]" />
                                                            </SliderPrimitive.Track>
                                                            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-[var(--custom-blue)]/50 bg-[var(--custom-blue)] shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                                                                {/* Sticky label */}
                                                                <Badge className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 -top-6 bg-[var(--custom-blue)]" variant={undefined}>
                                                                    {sliderProgress[0]}% / {100 - sliderProgress[0]}%
                                                                </Badge>
                                                            </SliderPrimitive.Thumb>
                                                        </SliderPrimitive.Root>
                                                    </FormControl>
                                                    <span className="text-sm text-muted-foreground">Food Two</span>
                                                </div>
                                                <FormMessage className={undefined} />
                                            </FormItem>
                                        )}
                                    />
                                )
                            }
                            {
                                // PORTION SPLIT FORM INPUTS
                                splitPortionToggle && (
                                    // Set the Main Food
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="splitMainFoodId"
                                            render={({ field }) => (
                                                <FormItem className={undefined}>
                                                    <FormLabel className={undefined}>Which food do you want to serve as a fixed portion?</FormLabel>
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
                                                        Choose which food to serve as a fixed portion e.g. one sachet or tin of a wet food.
                                                    </FormDescription>
                                                    <FormMessage className={undefined} />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Set how many servings of main food */}
                                        <FormField
                                            control={form.control}
                                            name="splitAmount"
                                            render={({ field }) => (
                                                <FormItem className={undefined}>
                                                    <FormLabel className={undefined}>
                                                        Enter how many servings of the chosen food you would like to give your pet.
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter serving number here" {...field} />
                                                    </FormControl>
                                                    <FormMessage className={undefined} />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )
                            }
                        </div>
                    )
                }

                <Button type="submit" className="bg-[var(--custom-blue)] hover:bg-blue-700 text-white px-8 py-3 rounded-lg w-full max-w-xs mx-auto !mt-2" variant={undefined} size={undefined}>Submit</Button>
            </form>
        </Form>
    )

}

export default AddPlanForm;
