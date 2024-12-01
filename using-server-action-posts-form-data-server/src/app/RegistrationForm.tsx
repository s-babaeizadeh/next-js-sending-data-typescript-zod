"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./registrationSchema";
import { useRef } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useActionState } from "react"; // Updated import

export const RegistrationForm = ({
  onDataAction,
  onFormAction,
}: {
  onDataAction: (data: z.infer<typeof schema>) => Promise<{
    message: string;
    user?: z.infer<typeof schema>;
    issues?: string[];
  }>;
  onFormAction: (
    prevState: {
      message: string;
      user?: z.infer<typeof schema>;
      issues?: string[];
    },
    data: FormData
  ) => Promise<{
    message: string;
    user?: z.infer<typeof schema>;
    issues?: string[];
  }>;
}) => {
  const [state, formAction] = useActionState(onFormAction, {
    message: "",
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      zipCode: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      // Create a FormData object if needed
      const formData = new FormData();
      formData.append("first", data.first);
      formData.append("last", data.last);
      formData.append("email", data.email);

      // Call the onFormAction function
      const response = await onFormAction(state, formData);
      console.log(response); // Log response for debugging
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <div>{state?.message}</div>
      <form
        onSubmit={form.handleSubmit(onSubmit)} // Directly handle submission here
        className="space-y-8"
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>zipCode</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your zipcode</FormDescription>
              <FormMessage /> *
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your email</FormDescription>
              <FormMessage /> *
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button> {/* Ensure type is 'submit' */}
      </form>
    </Form>
  );
};
