"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, FileBadge, AlertCircle, Bot } from "lucide-react";

export function Hero() {
  const features = [
    {
      title: "Discover Schemes",
      description: "Find government schemes you are eligible for in minutes.",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      href: "/schemes",
      color: "bg-blue-50",
    },
    {
      title: "Apply for IDs",
      description: "Get your Aadhaar, PAN, Passport, and more sorted out.",
      icon: <FileBadge className="h-6 w-6 text-indigo-600" />,
      href: "/id",
      color: "bg-indigo-50",
    },
    {
      title: "File Complaints",
      description: "Report issues directly to the concerned department.",
      icon: <AlertCircle className="h-6 w-6 text-rose-600" />,
      href: "/complaints",
      color: "bg-rose-50",
    },
    {
      title: "Ask AI Assistant",
      description: "Have a question? Our AI is available 24/7 to guide you.",
      icon: <Bot className="h-6 w-6 text-emerald-600" />,
      href: "#chat",
      color: "bg-emerald-50",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-slate-50 pt-16 sm:pt-24 lg:pt-32">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl max-w-4xl mx-auto"
          >
            Access Government Services with <span className="text-gradient">Smart Bharat AI</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl"
          >
            Discover schemes, apply for government IDs, and file complaints—all in one place, backed by an intelligent assistant to guide you every step of the way.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <h2 className="mb-8 text-center text-xl font-semibold text-slate-900">What do you want to do today?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass-card p-6">
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-24 max-w-4xl pb-24"
        >
          <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl font-bold sm:text-3xl">How It Works</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-4">
              {[
                { step: "1", title: "Browse", desc: "Find schemes & IDs" },
                { step: "2", title: "Apply", desc: "Submit forms in minutes" },
                { step: "3", title: "Track", desc: "Monitor your status" },
                { step: "4", title: "Ask AI", desc: "Get instant answers" },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-xl font-bold text-blue-400">
                    {item.step}
                  </div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
