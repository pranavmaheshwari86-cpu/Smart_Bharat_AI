import { notFound } from "next/navigation";
import { schemes } from "@/lib/data";
import { DynamicForm } from "@/components/DynamicForm";
import { ArrowLeft, CheckCircle2, Info } from "lucide-react";
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
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
      <Link 
        href="/schemes" 
        className="mb-12 inline-flex items-center text-sm font-bold text-slate-600 hover:text-slate-900 focus-ring rounded-sm transition-colors group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        Back to Schemes
      </Link>

      <div className="grid gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-7 xl:col-span-8 space-y-12">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-sm bg-slate-900 px-4 py-1.5 text-xs font-bold tracking-wide text-white">
                {scheme.category}
              </span>
              <span className="inline-flex items-center rounded-sm bg-slate-200 px-4 py-1.5 text-xs font-bold tracking-wide text-slate-800 uppercase">
                {scheme.state}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-normal text-slate-900 sm:text-5xl lg:text-6xl mb-6">{scheme.name}</h1>
            <p className="text-xl text-slate-700 leading-relaxed max-w-3xl">{scheme.description}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="accessible-card p-8 border border-slate-200 shadow-sm bg-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-slate-900 text-white shadow-sm">
                  <Info strokeWidth={2} className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Eligibility Criteria</h3>
                <p className="text-base text-slate-700 leading-relaxed">{scheme.eligibility}</p>
              </div>
            </div>
            
            <div className="accessible-card p-8 border border-slate-200 shadow-sm bg-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-accent-50 text-accent-700 border border-accent-200 shadow-sm">
                  <CheckCircle2 strokeWidth={2} className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Benefits</h3>
                <p className="text-base text-slate-700 leading-relaxed">{scheme.benefits}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 accessible-card p-8 border border-slate-200 shadow-sm bg-white">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Apply Now</h2>
            <p className="text-base text-slate-600 mb-8">Complete the form below to start your application process securely.</p>
            
            <DynamicForm fields={scheme.fields} onSubmit={handleSubmit} submitLabel="Submit Application" />
          </div>
        </div>
      </div>
    </div>
  );
}
