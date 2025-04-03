"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Input } from "@/components/ui/input"

import { activitySchema, type activitySchemaType } from "@/zod-schemas/activity"

function ActivityFormCat() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof activitySchema>>({
      resolver: zodResolver(activitySchema),
      defaultValues: {
        activityLevel: undefined,
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof activitySchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    low activity - indoor cat, mostly inactive
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" className={undefined} />
                    </FormControl>
                    <FormLabel className="font-normal">
                    moderate activity - indoor cat, but with frequent play time, walks on leash, or a highly active breed
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3" className={undefined} />
                    </FormControl>
                    <FormLabel className="font-normal">
                    high activity - outdoor cat, or extremely active indoor cat
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="4" className={undefined} />
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
          <Button type="submit" className={undefined} variant={undefined} size={undefined}>Submit Activity Level</Button>
        </form>
        </Form>
      )
}

export default ActivityFormCat;
