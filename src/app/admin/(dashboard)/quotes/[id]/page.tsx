import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import QuoteForm from "@/components/admin/QuoteForm";
import { updateQuote } from "../actions";

export default async function EditQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = await prisma.quote.findUnique({ where: { id } });
  if (!quote) notFound();

  return <QuoteForm action={updateQuote.bind(null, id)} defaultValues={quote} />;
}
