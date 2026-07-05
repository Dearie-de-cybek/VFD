import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventForm from "@/components/admin/EventForm";
import { updateEvent } from "../actions";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return <EventForm action={updateEvent.bind(null, id)} defaultValues={event} />;
}
