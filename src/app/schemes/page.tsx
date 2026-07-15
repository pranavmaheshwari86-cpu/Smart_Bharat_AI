"use client";

import { useState } from "react";
import Link from "next/link";
import { schemes, categories, states } from "@/lib/data";
import { Search, Filter, ArrowRight, ChevronDown } from "lucide-react";

export default function SchemesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("All");

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(search.toLowerCase()) || scheme.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    const matchesState = selectedState === "All" || scheme.state === "All India" || scheme.state === selectedState;
    return matchesSearch && matchesCategory && matchesState;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
      <div className="mb-12 md:flex md:items-end md:justify-between gap-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-normal text-slate-900 mb-4">Government Schemes</h1>
          <p className="text-lg text-slate-700 leading-relaxed">
            Discover, filter, and apply for schemes you are eligible for, with real-time updates and transparent tracking.
          </p>
        </div>
      </div>

      <div className="mb-12 flex flex-col gap-4 md:flex-row p-2 rounded-lg bg-white border border-slate-300 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          <label htmlFor="search-schemes" className="sr-only">Search schemes</label>
          <input 
            id="search-schemes"
            placeholder="Search schemes..." 
            className="h-12 w-full rounded-md border-none bg-transparent pl-12 pr-4 text-slate-900 placeholder:text-slate-500 focus-ring transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="h-px w-full bg-slate-200 md:h-12 md:w-px" />
        <div className="flex flex-1 flex-col sm:flex-row gap-4 px-2 pb-2 md:p-0">
          <div className="relative flex-1">
            <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none" aria-hidden="true" />
            <label htmlFor="category-filter" className="sr-only">Filter by category</label>
            <select 
              id="category-filter"
              className="h-12 w-full appearance-none rounded-md border-none bg-transparent pl-10 pr-10 text-sm font-medium text-slate-900 focus-ring transition-colors cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none" aria-hidden="true" />
          </div>
          <div className="hidden sm:block h-12 w-px bg-slate-200" />
          <div className="relative flex-1">
            <label htmlFor="state-filter" className="sr-only">Filter by state</label>
            <select 
              id="state-filter"
              className="h-12 w-full appearance-none rounded-md border-none bg-transparent pl-4 pr-10 text-sm font-medium text-slate-900 focus-ring transition-colors cursor-pointer"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="All">All States</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id}>
            <Link href={`/schemes/${scheme.id}`} className="block h-full group focus-ring rounded-lg">
              <div className="flex h-full flex-col accessible-card p-6 border border-slate-200 hover:border-accent-600 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-5 w-5 text-accent-700" aria-hidden="true" />
                </div>
                
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex items-center rounded-sm bg-slate-900 px-3 py-1 text-xs font-semibold tracking-wide text-white">
                    {scheme.category}
                  </span>
                  <span className="text-xs font-medium tracking-wide text-slate-600 uppercase">{scheme.state}</span>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 mb-2 pr-6 group-hover:text-accent-700 transition-colors">{scheme.name}</h2>
                <p className="text-base text-slate-700 line-clamp-2 leading-relaxed mb-6 flex-1">{scheme.description}</p>
                
                <div className="space-y-3 pt-6 border-t border-slate-200 mt-auto">
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Eligibility</span>
                    <span className="block text-sm text-slate-900 line-clamp-1 font-medium">{scheme.eligibility}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Benefits</span>
                    <span className="block text-sm text-slate-900 line-clamp-1 font-medium">{scheme.benefits}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        
        {filteredSchemes.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <p className="text-lg font-medium text-slate-900">No schemes found</p>
            <p className="text-slate-600 mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
