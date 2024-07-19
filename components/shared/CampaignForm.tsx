"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { campaignformSchema } from "@/lib/validator";
import { CampaignDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader";

type CampaignFormProps = {
  userId: string;
  type: "Create" | "Update";
};
const CampaignForm = ({ userId, type }: CampaignFormProps) => {
  const [files, setfiles] = useState<File[]>([]);
  const initialValues = CampaignDefaultValues;
  const form = useForm<z.infer<typeof campaignformSchema>>({
    resolver: zodResolver(campaignformSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof campaignformSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Campaign Title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

            <div className="flex flex-col gap-5 md:flex-row">
            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea placeholder="Description" {...field} className="textarea rounded-2xl"/>
                </FormControl>

                <FormMessage />
              </FormItem>
            )} />
            <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setfiles}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )} />
            </div>


        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CampaignForm;
