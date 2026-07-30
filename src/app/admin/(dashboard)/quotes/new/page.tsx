import QuoteForm from "@/components/admin/QuoteForm";
import { createQuote } from "../actions";

export default function NewQuotePage() {
  return <QuoteForm action={createQuote} />;
}
