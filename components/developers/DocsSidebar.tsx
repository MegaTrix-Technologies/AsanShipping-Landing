"use client";

import React, { useState, useEffect } from "react";
import { API_SECTIONS, API_SCOPES } from "@/lib/docs/apiData";
import { Search, Download, FileText, ChevronRight, Key, Layers, Shield, RefreshCw } from "lucide-react";

interface DocsSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeSection: string;
}

export function DocsSidebar({ searchQuery, setSearchQuery, activeSection }: DocsSidebarProps) {
  const methodPill: Record<string, string> = {
    GET: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    POST: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    PATCH: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    DELETE: "text-rose-400 bg-rose-500/10 border-rose-500/30",
  };

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0">
      <div className="sticky top-28 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-thin">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search API endpoints..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-border bg-card text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              ×
            </button>
          )}
        </div>

        {/* PDF Download Banner */}
        <a
          href="/downloads/AsanShipping_Developer_API_Documentation_v1.0.pdf"
          download="AsanShipping_Developer_API_Documentation_v1.0.pdf"
          className="flex items-center justify-between p-3.5 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-all text-xs text-primary font-bold group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-primary" />
            <span>Developer Manual (PDF)</span>
          </div>
          <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </a>

        {/* Navigation Sections */}
        <nav className="space-y-6 text-xs">
          {/* Getting Started Category */}
          <div>
            <div className="px-3 text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Getting Started
            </div>
            <div className="space-y-1">
              <a
                href="#overview"
                className={`block px-3 py-2 rounded-xl font-medium transition-all ${
                  activeSection === "overview"
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Overview & Architecture
              </a>
              <a
                href="#authentication"
                className={`block px-3 py-2 rounded-xl font-medium transition-all ${
                  activeSection === "authentication"
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Authentication & Scopes
              </a>
              <a
                href="#idempotency"
                className={`block px-3 py-2 rounded-xl font-medium transition-all ${
                  activeSection === "idempotency"
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Idempotency Protocol
              </a>
              <a
                href="#rate-limits"
                className={`block px-3 py-2 rounded-xl font-medium transition-all ${
                  activeSection === "rate-limits"
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Rate Limits & Errors
              </a>
            </div>
          </div>

          {/* Resources & Endpoints */}
          <div>
            <div className="px-3 text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
              API Resources
            </div>
            <div className="space-y-4">
              {API_SECTIONS.filter((s) => s.endpoints && s.endpoints.length > 0).map((section) => (
                <div key={section.id} className="space-y-1">
                  <a
                    href={`#${section.id}`}
                    className="block px-3 py-1 font-bold text-foreground text-xs hover:text-primary transition-colors"
                  >
                    {section.title}
                  </a>
                  <div className="space-y-1 pl-2 border-l border-border/60 ml-2">
                    {section.endpoints?.map((ep) => (
                      <a
                        key={ep.id}
                        href={`#${ep.id}`}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all ${
                          activeSection === ep.id
                            ? "bg-muted text-primary font-bold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <span className="truncate">{ep.title}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ml-1 shrink-0 ${methodPill[ep.method] || ""}`}>
                          {ep.method}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Webhooks Section */}
          <div>
            <div className="px-3 text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Webhooks & Security
            </div>
            <div className="space-y-1">
              <a
                href="#webhooks-events"
                className="block px-3 py-2 rounded-xl font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                Event Topics & HMAC-SHA256
              </a>
              <a
                href="#hmac-calculator"
                className="block px-3 py-2 rounded-xl font-medium text-emerald-500 hover:bg-emerald-500/10 transition-all font-bold"
              >
                Interactive Signature Tool
              </a>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
