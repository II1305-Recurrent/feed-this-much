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

function CatForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof addPetSchema>>({
      resolver: zodResolver(addPetSchema),
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
    function onSubmit(values: z.infer<typeof addPetSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      fetch('http://localhost:8000/api/save-pet/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to submit');
          }
          return response.json();
        })
        .then(data => {
          console.log('Pet saved successfully:', data);
        })
        .catch(error => {
          console.error('Error saving pet:', error);
        });
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
                  <FormLabel className={undefined}>Cat Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your cat's name" {...field} />
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
                  <FormLabel className={undefined}>Enter your cat&apos;s current weight</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your cat's weight here" {...field} />
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
          <Button type="submit" className={undefined} variant={undefined} size={undefined}>Submit</Button>
          </form>
        </Form>
      )
}

export default CatForm;
