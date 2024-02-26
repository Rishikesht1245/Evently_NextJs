import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { UpdateEventParams } from "@/types";
import { auth } from "@clerk/nextjs";

const UpdateEvent = async ({ params: { id } }: { params: { id: string } }) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id);
  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-center py-5 md:py-10">
      <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      <div className="my-8 wrapper">
        <EventForm
          userId={userId}
          event={event}
          eventId={event?._id}
          type="update"
        />
      </div>
    </section>
  );
};
export default UpdateEvent;
