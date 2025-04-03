"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import { addPetSchema, type addPetSchemaType } from "@/zod-schemas/pet"

function PetForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof addPetSchema>>({
      resolver: zodResolver(addPetSchema),
      defaultValues: {
        petname: "",
        dateOfBirth: "",
        currentWeight: 2,
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
            <Button type="submit" className={undefined} variant={undefined} size={undefined}>Submit</Button>
          </form>
        </Form>
      )
}

export default PetForm;
