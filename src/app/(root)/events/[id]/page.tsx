import Collection from "@/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const SingleEvent = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event: IEvent = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event?.category?._id as string,
    eventId: event._id,
    page: searchParams.page as string,
  });
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-center py-5 md:py-10 flex justify-center bg-contain sm:mx-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl mx-auto">
          {/* We need to add the upload things domain in next config file */}
          <Image
            src={event?.imageUrl}
            alt="Event image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover"
          />
          {/* Details section */}
          <div className="flex flex-col w-full gap-8 p-5 md:p-10">
            {/* Checkout Button : Pending Stripe integration */}
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3 items-center">
                  <p className="p-bold-20 px-5 rounded-full bg-green-500/10  py-2 text-green-400">
                    {event.isFree ? "Free" : `$${event?.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-600">
                    {event?.category?.name}
                  </p>
                </div>
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    {event?.organizer?.firstName} {event?.organizer?.lastName}
                  </span>{" "}
                </p>
              </div>
            </div>

            {/* Date and location */}
            <div className="flex flex-col gap-5 w-full">
              {/* Date */}
              <div className="flex gap-3 items-center">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="p-regular-16 lg:p-regular-16 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(event.startDateTime!).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime!).timeOnly} -{" "}
                  </p>

                  <p>
                    {formatDateTime(event.endDateTime!).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime!).timeOnly}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="Location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 md:p-regular-18">{event?.location}</p>
              </div>
            </div>

            {/* Description and Url */}
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
              <p className="p-medium-16 p-regular-18 ">{event?.description}</p>
              <p className="p-medium-16 p-regular-18 truncate text-primary-500 underline">
                {event?.url}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Events from the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events found"
          emptyStateSubText="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
};
export default SingleEvent;
