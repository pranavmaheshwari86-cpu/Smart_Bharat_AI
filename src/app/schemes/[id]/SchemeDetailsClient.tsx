"use client";

import { DynamicForm } from "@/components/DynamicForm";
import { ArrowLeft, CheckCircle2, Info } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SchemeDetailsClient({ scheme }: { scheme: any }) {
  const handleSubmit = (data: Record<string, unknown>) => {
    console.log("Submitted scheme application:", data);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link 
          href="/schemes" 
          className="mb-12 inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground focus-ring rounded-sm transition-colors group font-body"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          Back to Schemes
        </Link>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-12 lg:grid-cols-12 items-start"
      >
        <div className="lg:col-span-7 xl:col-span-8 space-y-12">
          <motion.div variants={itemVariants}>
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-sm bg-foreground px-4 py-1.5 text-[10px] font-bold tracking-[0.1em] text-background uppercase font-body">
                {scheme.category}
              </span>
              <span className="inline-flex items-center rounded-sm bg-secondary px-4 py-1.5 text-[10px] font-bold tracking-[0.1em] text-foreground uppercase font-body border border-border/50">
                {scheme.state}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-normal text-foreground sm:text-5xl lg:text-6xl mb-6 font-heading">{scheme.name}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl font-body">{scheme.description}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-6 sm:grid-cols-2">
            <div className="premium-card p-8 border border-border/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
                  <Info strokeWidth={2} className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">Eligibility Criteria</h3>
                <p className="text-base text-muted-foreground leading-relaxed font-body">{scheme.eligibility}</p>
              </div>
            </div>
            
            <div className="premium-card p-8 border border-border/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success border border-success/20 shadow-sm">
                  <CheckCircle2 strokeWidth={2} className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">Benefits</h3>
                <p className="text-base text-muted-foreground leading-relaxed font-body">{scheme.benefits}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 premium-card p-8 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-2 font-heading">Apply Now</h2>
            <p className="text-base text-muted-foreground mb-8 font-body">Complete the form below to start your application process securely.</p>
            
            <DynamicForm fields={scheme.fields} onSubmit={handleSubmit} submitLabel="Submit Application" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
