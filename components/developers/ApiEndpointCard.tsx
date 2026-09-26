"use client";

import React, { useState } from "react";
import { ApiEndpoint } from "@/lib/docs/apiData";
import { CodeSnippetBox } from "./CodeSnippetBox";
import { JsonViewer } from "./JsonViewer";
import { Check, Copy, Shield, KeyRound, Clock, Code2, Sparkles, Send, CheckCircle2 } from "lucide-react";

interface ApiEndpointCardProps {
  endpoint: ApiEndpoint;
}

export function ApiEndpointCard({ endpoint }: ApiEndpointCardProps) {
  const [copiedPath, setCopiedPath] = useState(false);
  const [activeTab, setActiveTab] = useState<"request" | "response" | "payload">("request");

  const methodColors: Record<string, { badge: string; border: string; text: string }> = {
    GET: { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", border: "border-emerald-500/20", text: "text-emerald-400" },
    POST: { badge: "bg-blue-500/15 text-blue-400 border-blue-500/30", border: "border-blue-500/20", text: "text-blue-400" },
    PATCH: { badge: "bg-amber-500/15 text-amber-400 border-amber-500/30", border: "border-amber-500/20", text: "text-amber-400" },
    DELETE: { badge: "bg-rose-500/15 text-rose-400 border-rose-500/30", border: "border-rose-500/20", text: "text-rose-400" },
    PUT: { badge: "bg-purple-500/15 text-purple-400 border-purple-500/30", border: "border-purple-500/20", text: "text-purple-400" },
  };

  const currentTheme = methodColors[endpoint.method] || methodColors.GET;

  const copyPath = () => {
    navigator.clipboard.writeText(endpoint.path);
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  return (
    <div
      id={endpoint.id}
      className="scroll-mt-28 mb-16 rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl p-5 sm:p-7 md:p-8 shadow-xl hover:border-primary/40 transition-all space-y-7"
    >
      {/* 1. TOP HEADER: Method, Path, Scope Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className={`px-3 py-1 rounded-xl text-xs font-mono font-black border ${currentTheme.badge}`}>
            {endpoint.method}
          </span>
          <button
            onClick={copyPath}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs sm:text-sm md:text-base font-bold bg-muted/70 hover:bg-muted text-foreground border border-border/70 transition-all cursor-pointer shadow-sm"
            title="Click to copy endpoint path"
          >
            <span className="break-all">{endpoint.path}</span>
            {copiedPath ? (
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {endpoint.scope && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
              <Shield className="w-3.5 h-3.5" />
              <span>{endpoint.scope}</span>
            </span>
          )}
          {endpoint.requiresIdempotency && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Clock className="w-3.5 h-3.5" />
              <span>Idempotent</span>
            </span>
          )}
        </div>
      </div>

      {/* 2. TITLE & DESCRIPTION */}
      <div>
        <h3 className="text-xl sm:text-2xl font-display font-extrabold text-foreground mb-2">
          {endpoint.title}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
          {endpoint.description}
        </p>
      </div>

      {/* 3. REQUEST FORMAT SPECIFICATION TABLES (FULL WIDTH) */}
      <div className="space-y-6 bg-background/50 rounded-2xl border border-border/70 p-4 sm:p-6">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-2">
          <KeyRound className="w-4 h-4" />
          <span>Request Specifications &amp; Parameters</span>
        </div>

        {/* Headers */}
        {endpoint.headers && endpoint.headers.length > 0 && (
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Request Headers
            </h4>
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/70 border-b border-border text-foreground font-mono">
                  <tr>
                    <th className="py-2.5 px-3.5">Header Name</th>
                    <th className="py-2.5 px-3.5">Type</th>
                    <th className="py-2.5 px-3.5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {endpoint.headers.map((h, i) => (
                    <tr key={i} className="hover:bg-muted/30">
                      <td className="py-2.5 px-3.5 font-mono font-bold text-foreground">
                        {h.name} {h.required && <span className="text-rose-500 font-bold">*</span>}
                      </td>
                      <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{h.type}</td>
                      <td className="py-2.5 px-3.5 text-muted-foreground">{h.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Path Parameters */}
        {endpoint.pathParams && endpoint.pathParams.length > 0 && (
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Path Parameters
            </h4>
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/70 border-b border-border text-foreground font-mono">
                  <tr>
                    <th className="py-2.5 px-3.5">Parameter</th>
                    <th className="py-2.5 px-3.5">Type</th>
                    <th className="py-2.5 px-3.5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {endpoint.pathParams.map((p, i) => (
                    <tr key={i} className="hover:bg-muted/30">
                      <td className="py-2.5 px-3.5 font-mono font-bold text-foreground">
                        {p.name} <span className="text-rose-500 font-bold">*</span>
                      </td>
                      <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{p.type}</td>
                      <td className="py-2.5 px-3.5 text-muted-foreground">{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Query Parameters */}
        {endpoint.queryParams && endpoint.queryParams.length > 0 && (
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Query Parameters
            </h4>
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/70 border-b border-border text-foreground font-mono">
                  <tr>
                    <th className="py-2.5 px-3.5">Parameter</th>
                    <th className="py-2.5 px-3.5">Type</th>
                    <th className="py-2.5 px-3.5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {endpoint.queryParams.map((p, i) => (
                    <tr key={i} className="hover:bg-muted/30">
                      <td className="py-2.5 px-3.5 font-mono font-bold text-foreground">
                        {p.name} {p.required && <span className="text-rose-500 font-bold">*</span>}
                      </td>
                      <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{p.type}</td>
                      <td className="py-2.5 px-3.5 text-muted-foreground">{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Body Parameters */}
        {endpoint.bodyParams && endpoint.bodyParams.length > 0 && (
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Request Body Schema
            </h4>
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/70 border-b border-border text-foreground font-mono">
                  <tr>
                    <th className="py-2.5 px-3.5">Field</th>
                    <th className="py-2.5 px-3.5">Type</th>
                    <th className="py-2.5 px-3.5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {endpoint.bodyParams.map((p, i) => (
                    <tr key={i} className="hover:bg-muted/30">
                      <td className="py-2.5 px-3.5 font-mono font-bold text-foreground">
                        {p.name} {p.required && <span className="text-rose-500 font-bold">*</span>}
                      </td>
                      <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{p.type}</td>
                      <td className="py-2.5 px-3.5 text-muted-foreground">{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 4. BOTTOM SECTION: REQUEST SNIPPETS & RESPONSE SAMPLES IN TABS */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>Code Snippets &amp; Live Response Payloads</span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-border/80 pb-3 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("request")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === "request"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Client Request Snippet</span>
          </button>
          <button
            onClick={() => setActiveTab("response")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === "response"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Response ({endpoint.responseStatus} OK)</span>
          </button>
          {endpoint.requestBodyExample && (
            <button
              onClick={() => setActiveTab("payload")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === "payload"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Raw Request Payload</span>
            </button>
          )}
        </div>

        {/* Active Tab Content */}
        <div>
          {activeTab === "request" && (
            <CodeSnippetBox snippets={endpoint.snippets} title={`${endpoint.method} ${endpoint.path}`} />
          )}
          {activeTab === "response" && (
            <JsonViewer
              data={endpoint.responseExample}
              status={endpoint.responseStatus}
              label={`HTTP ${endpoint.responseStatus} Response`}
            />
          )}
          {activeTab === "payload" && endpoint.requestBodyExample && (
            <JsonViewer data={endpoint.requestBodyExample} label="Sample Request Payload" />
          )}
        </div>
      </div>
    </div>
  );
}
