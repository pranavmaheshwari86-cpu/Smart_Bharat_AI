import { notFound } from "next/navigation";
import { schemes } from "@/lib/data";
import { DynamicForm } from "@/components/DynamicForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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

  const handleSubmit = (data: Record<string, unknown>) => {
    // In a real app, this would be an API call to submit the application
    console.log("Submitted scheme application:", data);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/schemes" className="mb-6 inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Schemes
      </Link>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                {scheme.category}
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                {scheme.state}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{scheme.name}</h1>
            <p className="mt-4 text-lg text-slate-600">{scheme.description}</p>
          </div>

          <div className="space-y-6 rounded-2xl bg-slate-50 p-6 sm:p-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Eligibility Criteria</h3>
              <p className="mt-2 text-slate-600">{scheme.eligibility}</p>
            </div>
            <div className="h-px bg-slate-200" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Benefits</h3>
              <p className="mt-2 text-slate-600">{scheme.benefits}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Apply Now</CardTitle>
            </CardHeader>
            <CardContent>
              <DynamicForm fields={scheme.fields} onSubmit={handleSubmit} submitLabel="Submit Application" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
