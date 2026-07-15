"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Menu, User, BotMessageSquare, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                SB
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Smart Bharat <span className="text-gradient">AI</span>
              </span>
            </Link>

            <nav className="hidden md:flex md:items-center md:gap-6">
              <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Dashboard
              </Link>
              <Link href="/schemes" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Schemes
              </Link>
              <Link href="/id" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                Government IDs
              </Link>
              <Link href="/complaints" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                Complaints
              </Link>
              <Link href="/ai" className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                <BotMessageSquare className="mr-1 h-4 w-4" />
                AI Assistant
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 text-slate-600">
              <Globe className="h-4 w-4" />
              <select className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer">
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>
            </div>

            {isAuthenticated ? (
              <div className="hidden items-center gap-4 md:flex">
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Toggle notifications"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600"></span>
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                      <h4 className="font-semibold text-slate-900">Notifications</h4>
                      <div className="mt-3 space-y-3">
                        <div className="flex gap-3 text-sm">
                          <div className="h-2 w-2 mt-1.5 shrink-0 rounded-full bg-blue-600" />
                          <p className="text-slate-600"><strong className="text-slate-900">Passport Application</strong> has been approved. Your document is ready for dispatch.</p>
                        </div>
                        <div className="flex gap-3 text-sm">
                          <div className="h-2 w-2 mt-1.5 shrink-0 rounded-full bg-blue-600" />
                          <p className="text-slate-600">Your complaint <strong className="text-slate-900">Pothole on Main Street</strong> was assigned to a local officer.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Link href="/credentials" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  My Credentials
                </Link>
                <Link href="/profile" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  My Profile
                </Link>
                <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200">
                  <User className="h-full w-full p-1.5 text-slate-500" />
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>Sign Out</Button>
              </div>
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)} variant="primary" size="sm">
                Sign In
              </Button>
            )}
            
            <button className="md:hidden text-slate-500" aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => setIsAuthenticated(true)} 
      />
    </>
  );
}
