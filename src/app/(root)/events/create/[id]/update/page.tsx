import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";

const UpdateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-center py-5 md:py-10">
      <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
      <div className="my-8 wrapper">
        <EventForm userId={userId} type="update" />
      </div>
    </section>
  );
};
export default UpdateEvent;
