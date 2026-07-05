import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventForm from "@/components/admin/EventForm";
import PhotoGallery from "@/components/admin/PhotoGallery";
import { updateEvent, addEventPhotos, deleteEventPhoto } from "../actions";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });
  if (!event) notFound();

  return (
    <div className="flex flex-col gap-8">
      <EventForm action={updateEvent.bind(null, id)} defaultValues={event} />

      <PhotoGallery
        photos={event.photos}
        addAction={addEventPhotos.bind(null, id)}
        deleteAction={deleteEventPhoto}
        parentIdName="eventId"
        parentId={id}
      />
    </div>
  );
}
