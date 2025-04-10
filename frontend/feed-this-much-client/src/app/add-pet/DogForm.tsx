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

import { addPetSchema, type addPetSchemaType } from "@/zod-schemas/pet"

function DogForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof addPetSchema>>({
      resolver: zodResolver(addPetSchema),
      defaultValues: {
        name: "",
        dob: "",
        current_weight: "" as unknown as number,
        expected_weight: "10" as unknown as number,
        species: "dog",
        neutered: undefined,
        weight_unit: undefined,
        condition_score: "3" as unknown as number,
        activity_level: undefined,
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof addPetSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className={undefined}>
                  <FormLabel className={undefined}>Dog Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your dog's name" {...field} />
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
                    <Input placeholder="YYYY-MM-DD" {...field} />
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
                  <FormLabel className={undefined}>Enter your dog&apos;s current weight</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your dog's weight here" {...field} />
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
              name="expected_weight"
              render={({ field }) => (
                <FormItem className={undefined}>
                  <FormLabel className={undefined}>Enter your puppy&apos;s expected adult weight</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter puppy's expected adult weight here" {...field} />
                  </FormControl>
                  <FormDescription className={undefined}>
                    Click here for tips on how to figure out this weight. You may need to adjust this value as your puppy grows and you have a better idea of how big or small they are. If they are over 1 year old, leave this as 1.
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  onValueChange={field.onChange}
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
                  onValueChange={field.onChange}
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
                  onValueChange={field.onChange}
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
          <Button type="submit" className={undefined} variant={undefined} size={undefined}>Submit</Button>
          </form>
        </Form>
      )
}

export default DogForm;
