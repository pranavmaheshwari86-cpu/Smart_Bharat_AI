import { notFound } from "next/navigation";
import { schemes } from "@/lib/data";
import SchemeDetailsClient from "./SchemeDetailsClient";

export function generateStaticParams() {
  return schemes.map((scheme) => ({
    id: scheme.id,
  }));
}

export default async function SchemeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scheme = schemes.find(s => s.id === id);

  if (!scheme) {
    notFound();
  }

  return <SchemeDetailsClient scheme={scheme} />;
}
