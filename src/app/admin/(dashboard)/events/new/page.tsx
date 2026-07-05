import EventForm from "@/components/admin/EventForm";
import { createEvent } from "../actions";

export default function NewEventPage() {
  return <EventForm action={createEvent} />;
}
