"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { putRequest, postRequest } from "@/utils/fetchApi";

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

import { addPetSchema, type addPetSchemaType } from "@/zod-schemas/pet"
import { useRouter } from "next/navigation";
import { useModel } from "../Model";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Info } from "lucide-react";



function DogForm() {
    const router = useRouter();
    const { dog, resetDogFields, setDogFields, dontEdit, edit } = useModel();

    // 1. Define your form.
    const form = useForm<z.infer<typeof addPetSchema>>({
        resolver: zodResolver(addPetSchema),
        defaultValues: {
            name: dog.name,
            dob: dog.dob,
            current_weight: dog.current_weight as unknown as number,
            expected_weight: dog.expected_weight as unknown as number,
            species: "dog",
            neutered: dog.neutered,
            weight_unit: dog.weight_unit,
            condition_score: dog.condition_score as unknown as number,
            activity_level: dog.activity_level,
        },
    })


    const dob = form.watch("dob")
    const showExpectedWeight = (() => {
        if (!dob) return false
        const dobDate = new Date(dob)
        const now = new Date()
        const diffInMs = now.getTime() - dobDate.getTime()
        const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
        return days >= 0 && days <= 365
    })()

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof addPetSchema>) {
        //console.log("Edit mode?", edit);

        const response = edit
            ? await putRequest({ path: `/api/update-pet/${dog.id}/`, body: values })
            : await postRequest({ path: "/api/save-pet/", body: values });

        if (response.ok) {
            console.log("Dog saved successfully");
            resetDogFields();
            dontEdit();
            router.push("/home");
        } else {
            console.error("Failed to save dog");
        }
    }

    function handleNameChange(e) {
        setDogFields({ fieldName: "name", value: e.target.value });
    }
    function handleDOBChange(e) {
        setDogFields({ fieldName: "dob", value: e.target.value });
    }
    function handleWeightChange(e) {
        setDogFields({ fieldName: "current_weight", value: e.target.value });
    }
    function handlePuppyChange(e) {
        setDogFields({ fieldName: "expected_weight", value: e.target.value });
    }
    function handleUnitChange(v) {
        setDogFields({ fieldName: "weight_unit", value: v });
    }
    function handleNeuteredChange(v) {
        setDogFields({ fieldName: "neutered", value: v });
    }
    function handleConditionChange(v) {
        setDogFields({ fieldName: "condition_score", value: v });
    }
    function handleActivityChange(v) {
        setDogFields({ fieldName: "activity_level", value: v });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            <FormLabel className={undefined}>Dog Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your dog's name" {...field} onChange={(e) => {
                                    // Custom onChange logic
                                    field.onChange(e); // Call React Hook Form's onChange
                                    handleNameChange(e); // Call your custom onChange logic
                                }} />
                            </FormControl>
                            <FormDescription className={undefined}>
                                This is your pet&apos;s display name.
                            </FormDescription>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            <FormLabel className={undefined}>Enter your dog&apos;s date of birth</FormLabel>
                            <FormControl>
                                <Input placeholder="YYYY-MM-DD" {...field} onChange={(e) => {
                                    // Custom onChange logic
                                    field.onChange(e); // Call React Hook Form's onChange
                                    handleDOBChange(e); // Call your custom onChange logic
                                }} />
                            </FormControl>
                            <FormDescription className={undefined}>
                                This can be approximate if you aren&apos;t sure, especially if they are an adult.
                            </FormDescription>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="current_weight"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            <div className="flex items-center gap-2">
                                <FormLabel className={undefined}>Enter your dog&apos;s current weight</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button type="button" className="text-blue-600"> <Info size={16} /> </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        side="bottom"
                                        className="w-[250px] max-w-[250px] bg-[#fef2dc] border-[#fef2dc] text-[#D77A61] text-xs text-center rounded-md px-3 py-2 shadow-md border-6 whitespace-normal "
                                    >
                                        <p>Weigh your dog on a pet scale (or a kitchen scale for smaller dogs). Alternatively, weigh yourself while holding your dog and subtract your weight.</p>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <FormControl>
                                <Input placeholder="Enter your dog's weight here" {...field} onChange={(e) => {
                                    field.onChange(e); // Call React Hook Form's onChange
                                    handleWeightChange(e); // Call your custom onChange logic
                                }} />
                            </FormControl>
                            <FormDescription className={undefined}>
                                Click here for tips on how to weigh your pet.
                            </FormDescription>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />

                {showExpectedWeight && (
                    <FormField
                        control={form.control}
                        name="expected_weight"
                        render={({ field }) => (
                            <FormItem className={undefined}>
                                <div className="flex items-center gap-2">
                                    <FormLabel className={undefined}>Enter your puppy&apos;s expected adult weight</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button type="button" className="text-blue-600"> <Info size={16} /> </button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            side="bottom"
                                            className="w-[250px] max-w-[250px] bg-[#fef2dc] border-[#fef2dc] text-[#D77A61] text-xs text-center rounded-md px-3 py-2 shadow-md border-8 whitespace-normal "
                                        >
                                            <div className="text-xs">
                                                <p>Estimate your puppy adult weight</p>
                                                <a
                                                    href="https://sydneyanimalhospitals.com.au/puppy-weight-calculator/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block font-medium text-blue-700 underline hover:text-blue-900 mt-2"
                                                    style={{ textDecoration: 'underline', color: '#1d4ed8' }}
                                                >
                                                    Adult Weight Calculator
                                                </a>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <FormControl>
                                    <Input placeholder="Enter puppy's expected adult weight here" {...field} onChange={(e) => {
                                        // Custom onChange logic
                                        field.onChange(e); // Call React Hook Form's onChange
                                        handlePuppyChange(e); // Call your custom onChange logic
                                    }} />
                                </FormControl>
                                <FormDescription className={undefined}>
                                    Click here for tips on how to figure out this weight. You may need to adjust this value as your puppy grows and you have a better idea of how big or small they are. If they are over 1 year old, leave this as 1.
                                </FormDescription>
                                <FormMessage className={undefined} />
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    control={form.control}
                    name="weight_unit"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            {/* <FormLabel className={undefined}>Select Unit</FormLabel> */}
                            <Select onValueChange={(v) => { field.onChange(v); handleUnitChange(v) }} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className={undefined} >
                                        <SelectValue placeholder="Select Unit" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className={undefined} >
                                    <SelectItem className={undefined} value="kg">Kgs</SelectItem>
                                    <SelectItem className={undefined} value="lb">lbs</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription className={undefined}>
                                Select the unit you used for your dog&apos;s weight.
                            </FormDescription>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="neutered"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className={undefined}>Is your dog spayed/neutered?</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(v) => { field.onChange(v); handleNeuteredChange(v) }}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={true} className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Yes
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={false} className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            No
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="condition_score"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <div className="flex items-center gap-2">
                                <FormLabel className={undefined}>Select a Body Condition Score</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button type="button" className="text-blue-600"> <Info size={16} /> </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        side="bottom"
                                        className="w-[250px] max-w-[250px] bg-[#fef2dc] border-[#fef2dc] text-[#D77A61] text-xs text-center rounded-md px-3 py-2 shadow-md border-6 whitespace-normal "
                                    >
                                        <p>
                                            <span className="font-medium"> Severely Underweight:</span> Bones clearly visible, no fat and muscle loss. <br />
                                            <span className="font-medium"> Underweight:</span> Ribs and spine easy to see and minimal fat. <br />
                                            <span className="font-medium"> Ideal:</span> Ribs felt but not seen, clear waist and tummy tuck. <br />
                                            <span className="font-medium"> Overweight:</span> Ribs hard to feel and waist barely visible. <br />
                                            <span className="font-medium"> Severely Obese:</span> Ribs not felt, heavy fat deposits and low mobility.
                                        </p>

                                    </PopoverContent>
                                </Popover>
                            </div>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(v) => { field.onChange(v); handleConditionChange(v) }}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="1" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Severely Underweight - 1
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="2" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Underweight - 2
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="3" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Ideal - 3
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="4" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Overweight - 4
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="5" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Severely Obese - 5
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="activity_level"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className={undefined}>Select an activity level</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(v) => { field.onChange(v); handleActivityChange(v) }}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="doglow" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            low - less than 1 hour per day, walking on a leash
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="dogmoderatelow" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            moderate low-impact - 1-3 hours per day, walking
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="dogmoderatehigh" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            moderate high-impact - 1-3 hours per day, running or agility training
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="doghigh" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            high - 3-6 hours per day, working dog such as hunting or herding
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="dogveryhigh" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            very high - over 6 hours per day or activity in very cold weather, such as sled racing
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-[var(--custom-blue)] hover:bg-blue-700 text-white px-8 py-3 rounded-lg w-full max-w-xs mx-auto !mt-2" variant={undefined} size={undefined}>Submit</Button>
            </form>
        </Form>
    )
}

export default DogForm;
