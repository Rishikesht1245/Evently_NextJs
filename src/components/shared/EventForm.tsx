"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";

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
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import FileUploader from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";

type Props = {
  userId: string;
  type: "create" | "update";
  event?: IEvent;
  eventId?: string;
};
const EventForm = ({ userId, type, event, eventId }: Props) => {
  console.log(userId);
  // For storing image upload
  const [files, setFiles] = useState<File[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");
  const initialValues =
    event && type === "update"
      ? {
          ...event,
          startDateTime: new Date(event?.startDateTime!),
          endDateTime: new Date(event?.endDateTime!),
        }
      : eventDefaultValues;
  // defining form : type of formSchema inferring
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const eventData = values;
    //     Blob converted url
    let uploadedImageUrl = values?.imageUrl;

    if (files?.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0]?.url;
    }

    if (type === "create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          //     Redirection link after creating new event
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "update") {
      if (!eventId) {
        router.back();
        return;
      }
      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: "/profile",
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <Form {...form}>
      <form
        //Passing the onsubmit function to handle submit
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event title"
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
                  <Dropdown onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Image */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Event location */}
        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full bg-grey-50 px-4 py-2 overflow-hidden rounded-full">
                    <Image
                      src={"/assets/icons/location-grey.svg"}
                      alt="location"
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder="Event location or online"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dates */}
        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[54px] w-full bg-grey-50 px-4 py-2 overflow-hidden rounded-full">
                    <Image
                      src={"/assets/icons/calendar.svg"}
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-gray-500">
                      Start Date :
                    </p>
                    {/* Date Picker */}
                    <DatePicker
                      selected={event?.startDateTime || startDate}
                      onChange={(date: Date) => setStartDate(date!)}
                      showTimeSelect
                      timeInputLabel="Time"
                      dateFormat="MM/dd/yyy h:mm aa"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[54px] w-full bg-grey-50 px-4 py-2 overflow-hidden rounded-full">
                    <Image
                      src={"/assets/icons/calendar.svg"}
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-gray-500">
                      End Date :
                    </p>
                    {/* Date Picker */}
                    <DatePicker
                      selected={event?.endDateTime || endDate}
                      onChange={(date: Date) => setEndDate(date!)}
                      showTimeSelect
                      timeInputLabel="Time"
                      dateFormat="MM/dd/yyy h:mm aa"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[54px] w-full bg-grey-50 px-4 py-2 overflow-hidden rounded-full">
                    <Image
                      src={"/assets/icons/dollar.svg"}
                      alt="dollar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />

                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="input-field"
                    />
                    {/* Is free */}
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <div className="flex items-center ">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free ticket
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center h-[54px] w-full bg-grey-50 px-4 py-2 overflow-hidden rounded-full">
                    <Image
                      src={"/assets/icons/link.svg"}
                      alt="url"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <Input
                      placeholder="Url"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          size="lg"
          className="rounded-full button col-span-2 w-full"
        >
          {form.formState.isSubmitting
            ? "Submitting event..."
            : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};
export default EventForm;
