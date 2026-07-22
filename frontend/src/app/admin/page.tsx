"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Database, 
  FileText, 
  Users, 
  Settings, 
  Activity,
  AlertCircle
} from "lucide-react";
import { schemes, govIds, vaultCategories } from "@/lib/data";

type TabType = "dashboard" | "schemas" | "applications" | "users";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-background/95 backdrop-blur-md p-6">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6 font-heading">
          Super Admin
        </h2>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-body ${
              activeTab === "dashboard"
                ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-semibold">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab("schemas")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-body ${
              activeTab === "schemas"
                ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Database className="h-5 w-5" />
            <span className="font-semibold">Schema Manager</span>
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-body ${
              activeTab === "applications"
                ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <FileText className="h-5 w-5" />
            <span className="font-semibold">Applications</span>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-body ${
              activeTab === "users"
                ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="font-semibold">Users</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold text-foreground font-heading mb-2">Overview</h1>
                <p className="text-muted-foreground font-body">Real-time platform metrics and activity.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="premium-card p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-muted-foreground">Total Schemes</h3>
                    <div className="p-2 bg-brand-50 dark:bg-brand-500/10 rounded-lg text-brand-600">
                      <Database className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold font-heading">{schemes.length}</div>
                </div>
                <div className="premium-card p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-muted-foreground">Gov IDs</h3>
                    <div className="p-2 bg-brand-50 dark:bg-brand-500/10 rounded-lg text-brand-600">
                      <FileText className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold font-heading">{govIds.length}</div>
                </div>
                <div className="premium-card p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-muted-foreground">Active Users</h3>
                    <div className="p-2 bg-brand-50 dark:bg-brand-500/10 rounded-lg text-brand-600">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold font-heading">12,450</div>
                </div>
                <div className="premium-card p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-muted-foreground">Pending Apps</h3>
                    <div className="p-2 bg-warning/10 rounded-lg text-warning">
                      <Activity className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold font-heading">842</div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "schemas" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold text-foreground font-heading mb-2">Schema Manager</h1>
                <p className="text-muted-foreground font-body">View and edit JSON configurations for the platform.</p>
              </div>

              <div className="grid gap-6">
                <div className="premium-card p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold font-heading">Schemes Configuration</h3>
                    <button className="text-sm font-semibold text-brand-600 hover:text-brand-700">Edit JSON</button>
                  </div>
                  <pre className="bg-muted p-4 rounded-xl overflow-x-auto text-xs font-mono text-muted-foreground">
                    {JSON.stringify(schemes.slice(0, 2), null, 2)}
                    {"\n  ...\n]"}
                  </pre>
                </div>

                <div className="premium-card p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold font-heading">Government IDs Configuration</h3>
                    <button className="text-sm font-semibold text-brand-600 hover:text-brand-700">Edit JSON</button>
                  </div>
                  <pre className="bg-muted p-4 rounded-xl overflow-x-auto text-xs font-mono text-muted-foreground">
                    {JSON.stringify(govIds.slice(0, 1), null, 2)}
                    {"\n  ...\n]"}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "applications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
               <div>
                <h1 className="text-3xl font-bold text-foreground font-heading mb-2">Application Manager</h1>
                <p className="text-muted-foreground font-body">Review citizen applications and workflow states.</p>
              </div>
              <div className="premium-card border border-border/50 overflow-hidden">
                 <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-bold font-body uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">App ID</th>
                      <th className="px-6 py-4">Citizen Name</th>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-6 py-4 font-mono">APP-8829</td>
                      <td className="px-6 py-4 font-semibold">Rahul Sharma</td>
                      <td className="px-6 py-4">PM Kisan Samman Nidhi</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-warning/10 text-warning rounded text-xs font-bold">Pending Review</span></td>
                      <td className="px-6 py-4"><button className="text-brand-600 font-semibold hover:underline">Review</button></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-6 py-4 font-mono">APP-8830</td>
                      <td className="px-6 py-4 font-semibold">Priya Patel</td>
                      <td className="px-6 py-4">Aadhaar Update</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-success/10 text-success rounded text-xs font-bold">Approved</span></td>
                      <td className="px-6 py-4"><button className="text-brand-600 font-semibold hover:underline">View</button></td>
                    </tr>
                  </tbody>
                 </table>
              </div>
            </motion.div>
          )}

           {activeTab === "users" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
               <div>
                <h1 className="text-3xl font-bold text-foreground font-heading mb-2">User Manager (RBAC)</h1>
                <p className="text-muted-foreground font-body">Manage citizens, agents, and admin roles.</p>
              </div>
              <div className="premium-card p-12 border border-border/50 flex flex-col items-center justify-center text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2 font-heading">User Management Mock</h3>
                <p className="text-muted-foreground font-body max-w-md">
                  In a production environment, this module connects to the IAM provider to manage roles (Citizen, Operator, Admin).
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
