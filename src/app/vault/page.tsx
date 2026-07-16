import { mockCredentials, vaultCategories } from "@/lib/data";
import { Cloud, FileText, CheckCircle2, Shield, Upload, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function VaultPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground font-heading">Digital Document Vault</h1>
          </div>
          <p className="text-lg text-muted-foreground font-body max-w-2xl">
            Your secure, centralized repository for all government and verified documents. Upload once, reuse everywhere across Smart Bharat services.
          </p>
        </div>
        
        <div className="flex gap-4 shrink-0">
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-secondary px-6 text-sm font-bold text-foreground hover:bg-secondary/80 transition-colors border border-border">
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0066CC] px-6 text-sm font-bold text-white hover:bg-[#0055AA] shadow-sm transition-colors group">
            <Cloud className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            Sync DigiLocker
          </button>
        </div>
      </div>

      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search your documents (e.g. Aadhaar, Marksheet, Pan...)" 
          className="w-full h-14 pl-12 pr-4 bg-background border border-border/60 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-base"
        />
      </div>

      <div className="space-y-12">
        {vaultCategories.map(category => {
          const docs = mockCredentials.filter(c => c.category === category);
          
          if (docs.length === 0) return null;

          return (
            <div key={category} className="space-y-6">
              <h2 className="text-2xl font-bold font-heading text-foreground flex items-center gap-3 border-b border-border/50 pb-4">
                {category}
                <span className="bg-muted text-muted-foreground text-xs px-2.5 py-1 rounded-full">{docs.length}</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {docs.map(doc => (
                  <div key={doc.id} className="premium-card p-6 border border-border/50 hover:border-primary/30 transition-all group flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6" />
                      </div>
                      {doc.isVerified && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-success bg-success/10 px-3 py-1 rounded-full border border-success/20">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verified
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold font-heading text-foreground mb-1 group-hover:text-primary transition-colors">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground font-body mb-4">{doc.issuer}</p>
                    
                    <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-body">Issued: {new Date(doc.dateIssued).toLocaleDateString()}</span>
                      {doc.linkedToDigilocker && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#0066CC]">
                          <Cloud className="w-3 h-3" /> DigiLocker
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
