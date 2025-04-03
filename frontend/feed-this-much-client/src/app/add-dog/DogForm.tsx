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
        petname: "",
        dateOfBirth: "",
        currentWeight: "" as unknown as number,
        species: undefined,
        neutered: undefined,
        isKg: undefined,
        bodyConditionScore: "3" as unknown as number,
        activityLevel: undefined,
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
              name="petname"
              render={({ field }) => (
                <FormItem className={undefined}>
                  <FormLabel className={undefined}>Pet Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your pet's name" {...field} />
                  </FormControl>
                  <FormDescription className={undefined}>
                    This is your pet's display name.
                  </FormDescription>
                  <FormMessage className={undefined} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className={undefined}>
                  <FormLabel className={undefined}>Enter your pet's date of birth</FormLabel>
                  <FormControl>
                    <Input placeholder="YYYY-MM-DD" {...field} />
                  </FormControl>
                  <FormDescription className={undefined}>
                  This can be approximate if you aren't sure, especially if they are an adult.
                  </FormDescription>
                  <FormMessage className={undefined} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentWeight"
              render={({ field }) => (
                <FormItem className={undefined}>
                  <FormLabel className={undefined}>Enter your pet's current weight</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter number here" {...field} />
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
            name="isKg"
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
                  <SelectItem className={undefined} value="Kgs">Kgs</SelectItem>
                  <SelectItem className={undefined} value="lbs">lbs</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className={undefined}>
                Select the unit you used for your pet's weight.
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
              <FormLabel className={undefined}>Is your pet spayed/neutered?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" className={undefined} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" className={undefined} />
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
            name="bodyConditionScore"
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
            name="activityLevel"
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
                      <RadioGroupItem value="1" className={undefined} />
                    </FormControl>
                    <FormLabel className="font-normal">
                    low - less than 1 hour per day, walking on a leash
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" className={undefined} />
                    </FormControl>
                    <FormLabel className="font-normal">
                    moderate low-impact - 1-3 hours per day, walking
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3" className={undefined} />
                    </FormControl>
                    <FormLabel className="font-normal">
                    moderate high-impact - 1-3 hours per day, running or agility training
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="4" className={undefined} />
                    </FormControl>
                    <FormLabel className="font-normal">
                    high - 3-6 hours per day, working dog such as hunting or herding
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="5" className={undefined} />
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
