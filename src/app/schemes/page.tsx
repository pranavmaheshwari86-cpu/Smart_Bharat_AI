"use client";

import { useState } from "react";
import Link from "next/link";
import { schemes, categories, states } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Government Schemes</h1>
          <p className="mt-2 text-lg text-slate-600">Discover and apply for schemes you are eligible for.</p>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input 
            placeholder="Search schemes..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select 
              className="flex h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-2 pl-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="relative flex-1">
            <select 
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="All">All States</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="flex flex-col">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                  {scheme.category}
                </span>
                <span className="text-xs text-slate-500">{scheme.state}</span>
              </div>
              <CardTitle className="text-xl">{scheme.name}</CardTitle>
              <CardDescription className="line-clamp-2">{scheme.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>Eligibility:</strong> <span className="line-clamp-1">{scheme.eligibility}</span></p>
                <p><strong>Benefits:</strong> <span className="line-clamp-1">{scheme.benefits}</span></p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/schemes/${scheme.id}`} className="w-full">
                <Button className="w-full" variant="outline">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
        
        {filteredSchemes.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No schemes found matching your criteria. Try adjusting your filters.
          </div>
        )}
      </div>
    </div>
  );
}
