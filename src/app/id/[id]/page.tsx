import { notFound } from "next/navigation";
import { govIds } from "@/lib/data";
import { DynamicForm } from "@/components/DynamicForm";
import { ArrowLeft, CheckCircle2, Fingerprint } from "lucide-react";
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
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
      <Link 
        href="/id" 
        className="mb-12 inline-flex items-center text-sm font-bold text-slate-600 hover:text-slate-900 focus-ring rounded-sm transition-colors group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        Back to IDs
      </Link>

      <div className="grid gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-7 xl:col-span-8 space-y-12">
          <div>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-md bg-slate-900 text-white shadow-sm">
              <Fingerprint strokeWidth={1.5} className="h-8 w-8" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-bold tracking-normal text-slate-900 sm:text-5xl lg:text-6xl mb-6">Apply for {idDoc.name}</h1>
            <p className="text-xl text-slate-700 leading-relaxed max-w-3xl">{idDoc.description}</p>
          </div>

          <div className="accessible-card p-8 sm:p-12 border border-slate-200 shadow-sm bg-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Required Documents</h2>
              <ul className="space-y-4">
                {idDoc.requirements.map((req, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-4 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-accent-50 text-accent-700">
                      <CheckCircle2 strokeWidth={2} className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <span className="text-lg text-slate-800 font-medium">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 accessible-card p-8 border border-slate-200 shadow-sm bg-white">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Form</h2>
            <p className="text-base text-slate-600 mb-8">Complete the form below to start your application process securely.</p>
            
            <DynamicForm fields={idDoc.fields} onSubmit={handleSubmit} submitLabel="Submit Application" />
          </div>
        </div>
      </div>
    </div>
  );
}
