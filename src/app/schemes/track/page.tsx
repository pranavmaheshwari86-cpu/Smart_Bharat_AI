import { mockUserApplications } from "@/lib/data";
import { CheckCircle2, Clock, AlertCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function ApplicationTrackingPage() {
  const schemeApplications = mockUserApplications.filter(app => app.type === "scheme");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "Under Review": return <Clock className="w-5 h-5 text-warning" />;
      case "Rejected": return <AlertCircle className="w-5 h-5 text-destructive" />;
      default: return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved": return "bg-success/10 text-success border-success/20";
      case "Under Review": return "bg-warning/10 text-warning border-warning/20";
      case "Rejected": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground font-heading">My Applications</h1>
        <p className="mt-4 text-lg text-muted-foreground font-body">Track the status of your government scheme applications.</p>
      </div>

      <div className="space-y-6">
        {schemeApplications.map((app) => (
          <div key={app.id} className="premium-card p-6 border border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground font-heading">{app.title}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground font-body">
                  <span>Ref: {app.referenceNumber}</span>
                  <span>Applied on: {new Date(app.dateApplied).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3 shrink-0">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-bold tracking-wide uppercase ${getStatusBadge(app.status)}`}>
                {getStatusIcon(app.status)}
                {app.status}
              </div>
              <Link 
                href={`/schemes/track/${app.id}`} 
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                View Details &rarr;
              </Link>
            </div>
          </div>
        ))}

        {schemeApplications.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground">No Applications Found</h3>
            <p className="text-muted-foreground mt-2 mb-6">You haven't applied for any schemes yet.</p>
            <Link href="/schemes" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Browse Schemes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
