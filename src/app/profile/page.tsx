import { mockUserApplications } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, XCircle, FileText } from "lucide-react";

export default function ProfilePage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "Rejected": return <XCircle className="h-5 w-5 text-red-500" />;
      case "Under Review": return <Clock className="h-5 w-5 text-blue-500" />;
      default: return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-50 text-green-700 border-green-200";
      case "Rejected": return "bg-red-50 text-red-700 border-red-200";
      case "Under Review": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Profile & Applications</h1>
        <p className="mt-2 text-lg text-slate-600">Track the status of your schemes, IDs, and complaints.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-slate-500">Name</p>
                  <p className="font-medium text-slate-900">John Doe</p>
                </div>
                <div>
                  <p className="text-slate-500">Aadhaar Number</p>
                  <p className="font-medium text-slate-900">XXXX-XXXX-1234</p>
                </div>
                <div>
                  <p className="text-slate-500">Phone</p>
                  <p className="font-medium text-slate-900">+91 98765 43210</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">Application Tracker</h2>
          <div className="space-y-4">
            {mockUserApplications.map((app) => (
              <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">{app.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span>Ref: {app.referenceNumber}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Applied: {app.dateApplied}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="capitalize">{app.type === 'govId' ? 'Government ID' : app.type}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center justify-end">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
