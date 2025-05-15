"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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

import { addFoodSchema, type addFoodSchemaType } from "@/zod-schemas/food"
import { useRouter } from "next/navigation";

function FoodForm() {
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof addFoodSchema>>({
        resolver: zodResolver(addFoodSchema),
        defaultValues: {
            foodname: "",
            foodType: undefined,
            foodServingType: undefined,
            servingWeightAmount: "" as unknown as number,
            servingWeightUnit: undefined,
            energyAmount: "" as unknown as number,
            energyUnit: undefined,
            perWeightAmount: "" as unknown as number,
            weightUnit: undefined,
            proteinPercent: "" as unknown as number,
            fatPercent: "" as unknown as number,
        },
    })


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof addFoodSchema>) {
        const form_schema_mapping = {
            foodname: "food_name",
            foodType: "food_type",
            foodServingType: "packet_type",
            servingWeightAmount: "weight_per_packet",
            servingWeightUnit: "weight_per_packet_unit",
            energyAmount: "energy",
            energyUnit: "energy_unit",
            perWeightAmount: "weight",
            weightUnit: "weight_unit",
            proteinPercent: "protein",
            fatPercent: "fat",
        };

        const data: Record<string, any> = {};
        for (const [formKey, apiKey] of Object.entries(form_schema_mapping)) {
            data[apiKey] = values[formKey as keyof typeof values];
        }

        const response = await postRequest({ path: '/api/save-food/', body: data });

        if (response.ok) {
            toast.success("Food saved successfully");
            router.push('/home');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                <FormField
                    control={form.control}
                    name="foodname"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            <FormLabel className={undefined}>Food Name</FormLabel>
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
                    name="foodType"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className={undefined}>Is the food wet or dry?</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="wet" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Wet
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="dry" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Dry
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
                    name="foodServingType"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className={undefined}>Food Servings</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="tin" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Tin
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="sachet" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Sachet
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="carton" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Carton
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="scoop" className={undefined} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Scoop or Cup (if you use a scoop or cup etc to count servings)
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
                    name="servingWeightAmount"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            {/*<FormLabel className={undefined}>Energy Per Weight Amount</FormLabel>*/}
                            <FormDescription className={undefined}>
                                Now enter the weight of food in the select serving type. For example, if a scoop holds 25g of the food, enter 25 here and select grams below.
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="Enter weight number here" {...field} />
                            </FormControl>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="servingWeightUnit"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            {/* <FormLabel className={undefined}>Select Unit</FormLabel> */}
                            <FormDescription className={undefined}>
                                Select the unit used for the serving weight amount you entered above.
                            </FormDescription>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className={undefined} >
                                        <SelectValue placeholder="Select Weight Unit" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className={undefined} >
                                    <SelectItem className={undefined} value="kg">kilograms</SelectItem>
                                    <SelectItem className={undefined} value="g">grams</SelectItem>
                                    <SelectItem className={undefined} value="lb">pounds</SelectItem>
                                    <SelectItem className={undefined} value="oz">ounces</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="energyAmount"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            <FormLabel className={undefined}>Metabolizable Energy (Energy per Weight)</FormLabel>
                            <FormDescription className={undefined}>
                                Enter the energy amount per weight. Look for something like &quot;360KJ/100g&quot; or &quot;62kcal/85g&quot;. Enter the number here and then select the unit below.
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="Enter energy number here" {...field} />
                            </FormControl>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="energyUnit"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            {/* <FormLabel className={undefined}>Select Unit</FormLabel> */}
                            <FormDescription className={undefined}>
                                Select the unit used for the energy amount entered above.
                            </FormDescription>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className={undefined} >
                                        <SelectValue placeholder="Select Energy Unit" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className={undefined} >
                                    <SelectItem className={undefined} value="kj">kJ</SelectItem>
                                    <SelectItem className={undefined} value="kcal">kcal</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="perWeightAmount"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            {/*<FormLabel className={undefined}>Energy Per Weight Amount</FormLabel>*/}
                            <FormDescription className={undefined}>
                                Now enter the weight amount. So if the packet says &quot;360KJ/100g&quot;, enter 100 here and select grams below.
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="Enter weight number here" {...field} />
                            </FormControl>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="weightUnit"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            {/* <FormLabel className={undefined}>Select Unit</FormLabel> */}
                            <FormDescription className={undefined}>
                                Select the unit used for the weight amount you entered above.
                            </FormDescription>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className={undefined} >
                                        <SelectValue placeholder="Select Weight Unit" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className={undefined} >
                                    <SelectItem className={undefined} value="kg">kilograms</SelectItem>
                                    <SelectItem className={undefined} value="g">grams</SelectItem>
                                    <SelectItem className={undefined} value="lb">pounds</SelectItem>
                                    <SelectItem className={undefined} value="oz">ounces</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="proteinPercent"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            <FormLabel className={undefined}>Protein (%)</FormLabel>
                            <FormDescription className={undefined}>
                                Enter the protein percentage.
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="Enter number here" {...field} />
                            </FormControl>
                            <FormMessage className={undefined} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fatPercent"
                    render={({ field }) => (
                        <FormItem className={undefined}>
                            <FormLabel className={undefined}>Fat (%)</FormLabel>
                            <FormDescription className={undefined}>
                                Enter the fat percentage.
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="Enter number here" {...field} />
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
export default FoodForm;
