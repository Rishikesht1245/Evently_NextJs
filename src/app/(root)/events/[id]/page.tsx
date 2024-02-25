import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";

const SingleEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-center py-5 md:py-10">
      Single Event Page
    </section>
  );
};
export default SingleEvent;
