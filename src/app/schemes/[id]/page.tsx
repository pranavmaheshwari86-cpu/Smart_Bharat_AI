import { notFound } from "next/navigation";
import { schemes } from "@/lib/data";
import SchemeDetailsClient from "./SchemeDetailsClient";

export function generateStaticParams() {
  return schemes.map((scheme) => ({
    id: scheme.id,
  }));
}

export default function SchemeDetailsPage({ params }: { params: { id: string } }) {
  const scheme = schemes.find(s => s.id === params.id);

  if (!scheme) {
    notFound();
  }

  return <SchemeDetailsClient scheme={scheme} />;
}
