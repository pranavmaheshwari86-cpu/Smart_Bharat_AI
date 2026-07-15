import { notFound } from "next/navigation";
import { govIds } from "@/lib/data";
import { DynamicForm } from "@/components/DynamicForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return govIds.map((id) => ({
    id: id.id,
  }));
}

export default function GovIdDetailsPage({ params }: { params: { id: string } }) {
  const idDoc = govIds.find(i => i.id === params.id);

  if (!idDoc) {
    notFound();
  }

  const handleSubmit = (data: Record<string, unknown>) => {
    // In a real app, this would be an API call to submit the application
    console.log("Submitted ID application:", data);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/id" className="mb-6 inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to IDs
      </Link>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Apply for {idDoc.name}</h1>
            <p className="mt-4 text-lg text-slate-600">{idDoc.description}</p>
          </div>

          <div className="space-y-6 rounded-2xl bg-slate-50 p-6 sm:p-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Required Documents</h3>
              <ul className="mt-4 space-y-3">
                {idDoc.requirements.map((req, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="mr-3 h-5 w-5 text-blue-600 shrink-0" />
                    <span className="text-slate-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
            </CardHeader>
            <CardContent>
              <DynamicForm fields={idDoc.fields} onSubmit={handleSubmit} submitLabel="Submit Application" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
