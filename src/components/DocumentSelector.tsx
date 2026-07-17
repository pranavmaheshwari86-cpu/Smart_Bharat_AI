"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Search, Star, Clock, ChevronDown, Check, X,
  IdCard, Fingerprint, Book, FileBadge,
  Baby, ScrollText, HeartHandshake, MapPin,
  Home, IndianRupee, Users, Scale, HeartPulse,
  Hospital, Briefcase, HardHat, GraduationCap,
  BookOpen, Tractor, Wheat, Building2, Store,
  Receipt, FileText, File, ShieldCheck, FileWarning
} from 'lucide-react';

type Category = 
  | 'Identity Documents'
  | 'Civil Certificates'
  | 'Address & Residence'
  | 'Income & Social'
  | 'Health'
  | 'Employment'
  | 'Education'
  | 'Agriculture'
  | 'Business'
  | 'Property'
  | 'Others';

interface DocItem {
  id: string;
  label: string;
  category: Category;
  icon: React.ElementType;
}

const DOCUMENTS: DocItem[] = [
  { id: 'aadhaar', label: 'Aadhaar Card (UIDAI)', category: 'Identity Documents', icon: Fingerprint },
  { id: 'pan-card', label: 'PAN Card', category: 'Identity Documents', icon: IdCard },
  { id: 'voter-id', label: 'Voter ID Card (EPIC)', category: 'Identity Documents', icon: FileBadge },
  { id: 'passport', label: 'Passport', category: 'Identity Documents', icon: Book },
  { id: 'driving-license', label: 'Driving Licence', category: 'Identity Documents', icon: IdCard },
  { id: 'ration-card', label: 'Ration Card', category: 'Identity Documents', icon: Home },
  { id: 'npr', label: 'National Population Register (NPR) ID', category: 'Identity Documents', icon: Users },
  { id: 'oci', label: 'Overseas Citizen of India (OCI) Card', category: 'Identity Documents', icon: Book },
  { id: 'pio', label: 'Person of Indian Origin (PIO) Card', category: 'Identity Documents', icon: Book },
  { id: 'senior-citizen', label: 'Senior Citizen Card (State-issued)', category: 'Identity Documents', icon: IdCard },
  { id: 'udid', label: 'Disability ID Card (UDID)', category: 'Identity Documents', icon: ShieldCheck },
  { id: 'ex-servicemen', label: 'Ex-Servicemen Identity Card', category: 'Identity Documents', icon: ShieldCheck },
  { id: 'govt-emp', label: 'Government Employee Identity Card', category: 'Identity Documents', icon: Briefcase },
  { id: 'defence', label: 'Defence Personnel Identity Card', category: 'Identity Documents', icon: ShieldCheck },
  { id: 'police', label: 'Police Identity Card', category: 'Identity Documents', icon: ShieldCheck },
  { id: 'freedom-fighter', label: 'Freedom Fighter Identity Card', category: 'Identity Documents', icon: Star },
  { id: 'tan', label: 'TAN (Tax Deduction Account Number)', category: 'Business', icon: Receipt },
  { id: 'gstin', label: 'GST Registration Certificate (GSTIN)', category: 'Business', icon: Receipt },
  { id: 'prof-tax', label: 'Professional Tax Registration', category: 'Business', icon: Briefcase },
  { id: 'iec', label: 'Import Export Code (IEC)', category: 'Business', icon: FileText },
  { id: 'apaar', label: 'APAAR ID (Academic Bank of Credits)', category: 'Education', icon: BookOpen },
  { id: 'student-id', label: 'Student Identity Card', category: 'Education', icon: GraduationCap },
  { id: 'national-scholarship', label: 'National Scholarship ID', category: 'Education', icon: BookOpen },
  { id: 'abha', label: 'ABHA Health ID', category: 'Health', icon: HeartPulse },
  { id: 'ayushman', label: 'Ayushman Bharat Card (PM-JAY)', category: 'Health', icon: HeartPulse },
  { id: 'cghs', label: 'CGHS Card', category: 'Health', icon: Hospital },
  { id: 'esic', label: 'ESIC Card', category: 'Employment', icon: Hospital },
  { id: 'health-smartcard', label: 'Health Insurance Smart Card', category: 'Health', icon: HeartPulse },
  { id: 'mgnrega', label: 'MGNREGA Job Card', category: 'Employment', icon: HardHat },
  { id: 'labour-card', label: 'Labour Card', category: 'Employment', icon: HardHat },
  { id: 'construction-worker', label: 'Building & Construction Worker Card', category: 'Employment', icon: HardHat },
  { id: 'street-vendor', label: 'Street Vendor ID Card', category: 'Employment', icon: Store },
  { id: 'farmer-id', label: 'Farmer ID Card', category: 'Agriculture', icon: Tractor },
  { id: 'kcc', label: 'Kisan Credit Card (KCC)', category: 'Agriculture', icon: Wheat },
  { id: 'pm-kisan-id', label: 'PM-Kisan ID', category: 'Agriculture', icon: Wheat },
  { id: 'shram-suvidha', label: 'Shram Suvidha ID', category: 'Employment', icon: Briefcase },
  { id: 'eshram', label: 'e-Shram Card', category: 'Employment', icon: HardHat },
  { id: 'ppo', label: 'Pension Payment Order (PPO)', category: 'Income & Social', icon: FileText },
  { id: 'pensioner-id', label: 'Pensioner Identity Card', category: 'Income & Social', icon: IdCard }
];

export function DocumentSelector({ 
  onSelect, 
  defaultValue, 
  mode = "select"
}: { 
  onSelect?: (val: string) => void, 
  defaultValue?: string, 
  mode?: "select" | "navigate"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(defaultValue || "");
  
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem('doc_favorites');
      const storedRecents = localStorage.getItem('doc_recents');
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
      if (storedRecents) setRecents(JSON.parse(storedRecents));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save to LocalStorage
  const saveFavorites = (newFavs: string[]) => {
    setFavorites(newFavs);
    localStorage.setItem('doc_favorites', JSON.stringify(newFavs));
  };
  
  const addRecent = (id: string) => {
    const newRecents = [id, ...recents.filter(r => r !== id)].slice(0, 5);
    setRecents(newRecents);
    localStorage.setItem('doc_recents', JSON.stringify(newRecents));
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      saveFavorites(favorites.filter(f => f !== id));
    } else {
      saveFavorites([...favorites, id]);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter and Group Logic
  const filteredDocs = useMemo(() => {
    if (!query) return DOCUMENTS;
    const lowerQ = query.toLowerCase();
    return DOCUMENTS.filter(d => d.label.toLowerCase().includes(lowerQ));
  }, [query]);

  // Build the flat list of items to render (for keyboard nav)
  const renderedItems = useMemo(() => {
    const items: Array<{ type: 'header' | 'item'; id?: string; label: string; doc?: DocItem; icon?: any }> = [];
    
    if (query) {
      // Just flat list if searching
      filteredDocs.forEach(doc => items.push({ type: 'item', id: doc.id, label: doc.label, doc }));
      return items;
    }

    // Default view
    if (favorites.length > 0) {
      items.push({ type: 'header', label: 'Favorites' });
      favorites.forEach(id => {
        const doc = DOCUMENTS.find(d => d.id === id);
        if (doc) items.push({ type: 'item', id: doc.id, label: doc.label, doc });
      });
    }

    if (recents.length > 0) {
      items.push({ type: 'header', label: 'Recently Used' });
      recents.forEach(id => {
        // don't show in recents if it's already in favorites to avoid clutter, optional
        if (!favorites.includes(id)) {
          const doc = DOCUMENTS.find(d => d.id === id);
          if (doc) items.push({ type: 'item', id: doc.id, label: doc.label, doc });
        }
      });
    }

    // Group by category
    const categories: Category[] = [
      'Identity Documents', 'Civil Certificates', 'Address & Residence', 
      'Income & Social', 'Health', 'Employment', 'Education', 
      'Agriculture', 'Business', 'Property', 'Others'
    ];

    categories.forEach(cat => {
      const catDocs = DOCUMENTS.filter(d => d.category === cat);
      if (catDocs.length > 0) {
        items.push({ type: 'header', label: cat });
        catDocs.forEach(doc => items.push({ type: 'item', id: doc.id, label: doc.label, doc }));
      }
    });

    return items;
  }, [query, filteredDocs, favorites, recents]);

  const selectableItems = renderedItems.filter(i => i.type === 'item');

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  const router = useRouter();

  const handleSelect = (id: string) => {
    if (mode === "navigate") {
      router.push(`/id/${id}`);
      return;
    }
    setSelectedId(id);
    if(onSelect) onSelect(id);
    addRecent(id);
    setIsOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % selectableItems.length);
      scrollToIndex((highlightedIndex + 1) % selectableItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + selectableItems.length) % selectableItems.length);
      scrollToIndex((highlightedIndex - 1 + selectableItems.length) % selectableItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectableItems[highlightedIndex]) {
        handleSelect(selectableItems[highlightedIndex].id!);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery("");
    }
  };

  const scrollToIndex = (index: number) => {
    if (!listRef.current) return;
    const itemElements = listRef.current.querySelectorAll('[role="option"]');
    const target = itemElements[index] as HTMLElement;
    if (target) {
      const container = listRef.current;
      const targetTop = target.offsetTop;
      const targetBottom = targetTop + target.offsetHeight;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.offsetHeight;

      if (targetTop < containerTop) {
        container.scrollTop = targetTop;
      } else if (targetBottom > containerBottom) {
        container.scrollTop = targetBottom - container.offsetHeight;
      }
    }
  };

  const selectedDoc = DOCUMENTS.find(d => d.id === selectedId);

  return (
    <div className="relative w-full z-30" ref={containerRef}>
      <button
        type="button"
        onClick={() => { setIsOpen(!isOpen); if (!isOpen) setTimeout(() => inputRef.current?.focus(), 50); }}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between bg-surface-variant hover:bg-surface-variant/80 transition-colors rounded-xl p-3 text-left focus:outline-none focus:ring-[4px] focus:ring-[rgba(43,97,205,0.18)] border border-transparent focus:border-[#2b61cd]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3 text-sm text-on-surface">
          {selectedDoc ? (
            <>
              <selectedDoc.icon className="w-4 h-4 text-primary" />
              <span className="font-medium">{selectedDoc.label}</span>
            </>
          ) : (
            <span className="text-on-surface-variant">Search or select your document...</span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full min-w-[320px] bg-white/95 backdrop-blur-xl border border-surface-variant rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
            style={{ maxHeight: '400px' }}
          >
            <div className="flex items-center px-4 py-3 border-b border-surface-variant/50 gap-3">
              <Search className="w-4 h-4 text-on-surface-variant" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search or select your document..."
                className="flex-grow bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant"
                role="combobox"
                aria-expanded="true"
                aria-controls="doc-listbox"
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-on-surface-variant hover:text-on-surface">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div 
              ref={listRef}
              className="overflow-y-auto py-2 px-2 custom-scrollbar"
              role="listbox"
              id="doc-listbox"
            >
              {renderedItems.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-on-surface-variant">
                  No documents found for "{query}"
                </div>
              ) : (
                renderedItems.map((item, i) => {
                  if (item.type === 'header') {
                    return (
                      <div key={`header-${item.label}`} className="px-3 py-2 mt-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant/70">
                        {item.label}
                      </div>
                    );
                  }

                  const docItem = item.doc!;
                  const isSelected = selectedId === item.id;
                  const isHighlighted = selectableItems.indexOf(item) === highlightedIndex;
                  const isFavorite = favorites.includes(item.id!);

                  return (
                    <div
                      key={`item-${item.id}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item.id!)}
                      onMouseEnter={() => setHighlightedIndex(selectableItems.indexOf(item))}
                      className={`
                        flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-150 mb-0.5
                        ${isSelected ? 'bg-[rgba(43,97,205,0.12)] border border-[#2b61cd] text-[#1C1B19]' : 'border border-transparent'}
                        ${!isSelected && isHighlighted ? 'bg-[#f0f5ff]' : ''}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <docItem.icon className={`w-4 h-4 ${isSelected ? 'text-[#2b61cd]' : 'text-on-surface-variant'}`} />
                        <span className={`text-sm ${isSelected ? 'font-semibold text-[#2b61cd]' : 'text-on-surface font-medium'}`}>
                          {item.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isSelected && <Check className="w-4 h-4 text-[#2b61cd]" />}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(e, item.id!)}
                          className={`p-1 rounded-md transition-colors ${isFavorite ? 'text-yellow-500' : 'text-on-surface-variant/30 hover:text-on-surface-variant'}`}
                        >
                          <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
