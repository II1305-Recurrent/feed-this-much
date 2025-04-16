"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

import { addCatSchema, type addCatSchemaType } from "@/zod-schemas/cat"

import { useRouter } from "next/navigation";
import { useModel } from "../Model";

function CatForm() {
    const router = useRouter();
    const { cat, resetCatFields, setCatFields } = useModel();

    // 1. Define your form.
    const form = useForm<z.infer<typeof addCatSchema>>({
        resolver: zodResolver(addCatSchema),
        defaultValues: {
            name: "",
            dob: "",
            current_weight: "" as unknown as number,
            species: "cat",
            neutered: undefined,
            weight_unit: undefined,
            condition_score: "3" as unknown as number,
            activity_level: undefined,
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof addCatSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const resp = await postRequest({ path: '/api/save-pet/', body: values });

        if (resp.response.ok) {
            console.log("Cat saved successfully");
        }
        router.push('/home');
        console.log(values)
    }


    function handleNameChange(e) {
        setCatFields({ fieldName: "name", value: e.target.value });
    }
    function handleDOBChange(e) {
        setCatFields({ fieldName: "dob", value: e.target.value });
    }
    function handleWeightChange(e) {
        setCatFields({ fieldName: "current_weight", value: e.target.value });
    }
    function handleUnitChange(v) {
        setCatFields({ fieldName: "weight_unit", value: v });
    }
    function handleNeuteredChange(v) {
        setCatFields({ fieldName: "neutered", value: v });
    }
    function handleConditionChange(v) {
        setCatFields({ fieldName: "condition_score", value: v });
    }
    function handleActivityChange(v) {
        setCatFields({ fieldName: "activity_level", value: v });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            <FormLabel className={undefined}>Cat Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your cat's name" {...field} onChange={(e) => {
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
                            <FormLabel className={undefined}>Enter your cat&apos;s date of birth</FormLabel>
                            <FormControl>
                                <Input placeholder="YYYY-MM-DD" {...field} onChange={(e) => {
                                    // Custom onChange logic
                                    field.onChange(e);
                                    handleDOBChange(e);
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
                            <FormLabel className={undefined}>Enter your cat&apos;s current weight</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your cat's weight here" {...field} onChange={(e) => {
                                    // Custom onChange logic
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
                                Select the unit you used for your cat&apos;s weight.
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
                            <FormLabel className={undefined}>Is your cat spayed/neutered?</FormLabel>
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
                            <FormLabel className={undefined}>Select a Body Condition Score</FormLabel>
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
                                            <RadioGroupItem value="catlow" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            low activity - indoor cat, mostly inactive
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="catmoderate" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            moderate activity - indoor cat, but with frequent play time, walks on leash, or a highly active breed
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="cathigh" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            high activity - outdoor cat, or extremely active indoor cat
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="catkitten" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            growing kitten - under 1 year old
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

export default CatForm;
