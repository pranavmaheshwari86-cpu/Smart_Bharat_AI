import Link from "next/link";
import { govIds } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GovtIdsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Government IDs</h1>
        <p className="mt-2 text-lg text-slate-600">Apply for essential government identification documents.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {govIds.map((idDoc) => (
          <Card key={idDoc.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{idDoc.name}</CardTitle>
              <CardDescription>{idDoc.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Link href={`/id/${idDoc.id}`} className="w-full">
                <Button className="w-full" variant="outline">View Requirements</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
