"use client";

import { useState } from "react";
import { Search, Filter, CheckCircle, XCircle, Clock, Eye, MoreVertical, ShieldCheck } from "lucide-react";
import Link from "next/link";

// Mock Data
const mockApplications = [
  { id: "APP-8472-991A", type: "Aadhaar Card Update", applicant: "Pranav Maheshwari", date: "Oct 10, 2026", status: "pending", score: 98 },
  { id: "APP-3291-882B", type: "PAN Card New", applicant: "Rahul Sharma", date: "Oct 11, 2026", status: "approved", score: 100 },
  { id: "APP-5510-119C", type: "Passport Renewal", applicant: "Priya Patel", date: "Oct 12, 2026", status: "rejected", score: 45 },
  { id: "APP-9921-445D", type: "Driving Licence", applicant: "Amit Kumar", date: "Oct 12, 2026", status: "pending", score: 85 },
  { id: "APP-1102-776E", type: "Voter ID", applicant: "Neha Singh", date: "Oct 13, 2026", status: "pending", score: 92 },
];

export default function AdminApplicationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockApplications.filter(app => {
    const matchesSearch = app.id.toLowerCase().includes(search.toLowerCase()) || 
                          app.applicant.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-lg tracking-tight">Smart Bharat <span className="text-blue-400">Admin</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-sm font-medium">
              AD
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-400 min-h-[calc(100vh-4rem)] border-r border-slate-800 p-4 hidden md:block">
          <nav className="space-y-1">
            <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600/10 text-blue-400 font-medium">
              <ShieldCheck className="w-5 h-5" /> ID Applications
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors">
              <Filter className="w-5 h-5" /> Config Manager
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">ID Applications</h1>
                <p className="text-slate-500 mt-1">Manage and verify citizen ID requests.</p>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search ID or Name..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  />
                </div>
                <select 
                  className="bg-white border border-slate-200 rounded-lg text-sm px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-sm font-medium text-slate-500 mb-2">Total Requests</div>
                <div className="text-3xl font-bold text-slate-900">12,450</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-sm font-medium text-slate-500 mb-2">Pending Review</div>
                <div className="text-3xl font-bold text-amber-600">342</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-sm font-medium text-slate-500 mb-2">AI Auto-Approved</div>
                <div className="text-3xl font-bold text-green-600">8,102</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-sm font-medium text-slate-500 mb-2">Flagged / Rejected</div>
                <div className="text-3xl font-bold text-red-600">145</div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600 uppercase tracking-wider">
                      <th className="p-4">App ID</th>
                      <th className="p-4">Applicant</th>
                      <th className="p-4">ID Type</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">AI Score</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-mono text-sm text-slate-900 font-medium">{app.id}</td>
                        <td className="p-4 text-sm font-medium text-slate-700">{app.applicant}</td>
                        <td className="p-4 text-sm text-slate-600">{app.type}</td>
                        <td className="p-4 text-sm text-slate-500">{app.date}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${app.score > 80 ? 'bg-green-500' : app.score > 50 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                style={{ width: `${app.score}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-slate-600">{app.score}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
                            app.status === 'approved' ? 'bg-green-50 text-green-700 border border-green-200' :
                            app.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                            'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {app.status === 'approved' && <CheckCircle className="w-3 h-3" />}
                            {app.status === 'rejected' && <XCircle className="w-3 h-3" />}
                            {app.status === 'pending' && <Clock className="w-3 h-3" />}
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500">
                          No applications found matching criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
