"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DocsSidebar } from "@/components/developers/DocsSidebar";
import { ApiEndpointCard } from "@/components/developers/ApiEndpointCard";
import { HmacCalculator } from "@/components/developers/HmacCalculator";
import {
  API_SECTIONS,
  API_SCOPES,
  ERROR_CODES,
  WEBHOOK_EVENTS,
} from "@/lib/docs/apiData";
import {
  Download,
  KeyRound,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Server,
  Layers,
  Cpu,
  Sparkles,
} from "lucide-react";

export default function DevelopersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  // Filter endpoints based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return API_SECTIONS;
    const query = searchQuery.toLowerCase();

    return API_SECTIONS.map((section) => {
      if (!section.endpoints) return section;
      const matchingEndpoints = section.endpoints.filter(
        (ep) =>
          ep.title.toLowerCase().includes(query) ||
          ep.path.toLowerCase().includes(query) ||
          ep.method.toLowerCase().includes(query) ||
          ep.description.toLowerCase().includes(query) ||
          ep.scope.toLowerCase().includes(query)
      );
      return {
        ...section,
        endpoints: matchingEndpoints,
      };
    }).filter(
      (section) =>
        section.title.toLowerCase().includes(query) ||
        (section.endpoints && section.endpoints.length > 0)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-primary-foreground font-sans">
      <Navbar />

      {/* Hero Banner with Responsive Typography & Colors */}
      <section className="relative pt-10 sm:pt-14 pb-10 sm:pb-12 border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))] pointer-events-none" />
        
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-mono font-bold">
                <Cpu className="w-3.5 h-3.5" />
                <span>REST API v1.0 • Enterprise Core</span>
              </div>
              
              {/* Wordmark styling: "Asan" in white/foreground, "Shipping" in emerald green */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-tight text-foreground">
                <span>Asan</span>
                <span className="text-emerald-500 dark:text-emerald-400">Shipping</span>{" "}
                <span>Developer Documentation</span>
              </h1>

              <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                Seamlessly connect custom storefronts, ERPs, and mobile applications to AsanShipping catalog, authoritative inventory, canonical order ingestion, automated courier tracking, and real-time webhook events.
              </p>
            </div>

            {/* Download PDF Manual Action */}
            <div className="shrink-0 pt-2 md:pt-0">
              <a
                href="/downloads/AsanShipping_Developer_API_Documentation_v1.0.pdf"
                download="AsanShipping_Developer_API_Documentation_v1.0.pdf"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-card hover:bg-card-elevated border border-border hover:border-primary/50 text-foreground font-bold text-xs sm:text-sm shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-500" />
                <span>Download PDF Manual</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Documentation Body: 3-Column Responsive Layout */}
      <main className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          {/* Left Column: Sticky Sidebar & Search */}
          <DocsSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeSection={activeSection}
          />

          {/* Center & Content Column */}
          <div className="flex-1 min-w-0 space-y-16">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-28 space-y-5">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-foreground">
                Overview &amp; Architecture
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                The AsanShipping Developer API is a high-throughput, multi-tenant RESTful API. It is designed to act as the single source of truth for your e-commerce operations across Pakistan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3 border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-1">Tenant Data Isolation</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Every API key is bound cryptographically to a single merchant organization. Cross-tenant access is strictly prohibited at the database engine level.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3 border border-blue-500/20">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-1">Sub-100ms Latency</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Optimized indexing on MongoDB clusters, Redis caching layers, and high-performance routing ensure instantaneous order creation and inventory syncing.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur sm:col-span-2 md:col-span-1">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3 border border-amber-500/20">
                    <Server className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-1">Idempotency Guarantee</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Network dropouts and automated retries never cause duplicate orders or phantom inventory deductions thanks to 24-hour idempotent transaction caching.
                  </p>
                </div>
              </div>
            </section>

            {/* Authentication Section */}
            <section id="authentication" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
                <KeyRound className="w-4 h-4" />
                <span>Security</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-foreground">
                Authentication &amp; Granular Scopes
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                All requests to the Developer API must be authenticated with an API key. You can pass the key in two ways:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 text-slate-100">
                  <div className="text-xs font-mono font-bold text-emerald-400 mb-2">Option 1: Bearer Token (Recommended)</div>
                  <pre className="text-xs font-mono text-slate-300">
                    <code>Authorization: Bearer as_live_79a2f10b...</code>
                  </pre>
                </div>
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 text-slate-100">
                  <div className="text-xs font-mono font-bold text-blue-400 mb-2">Option 2: Custom Header</div>
                  <pre className="text-xs font-mono text-slate-300">
                    <code>X-API-Key: as_live_79a2f10b...</code>
                  </pre>
                </div>
              </div>

              {/* API Key Formats */}
              <div className="p-6 rounded-3xl border border-border bg-card/60 backdrop-blur space-y-4">
                <h3 className="font-bold text-base text-foreground">Supported Key Prefixes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3.5 rounded-2xl bg-background border border-border">
                    <span className="text-emerald-500 font-bold">as_live_...</span>
                    <p className="text-muted-foreground font-sans mt-1 text-xs">Live production secret key for backend server integrations.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-background border border-border">
                    <span className="text-amber-500 font-bold">as_test_...</span>
                    <p className="text-muted-foreground font-sans mt-1 text-xs">Sandbox test key for staging environments and mock suites.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-background border border-border">
                    <span className="text-blue-500 font-bold">store_live_...</span>
                    <p className="text-muted-foreground font-sans mt-1 text-xs">Public storefront key restricted to read-only catalog queries.</p>
                  </div>
                </div>
              </div>

              {/* Scopes Table */}
              <div className="space-y-3">
                <h3 className="font-bold text-base text-foreground">Granular Permission Scopes</h3>
                <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted border-b border-border text-foreground font-mono">
                      <tr>
                        <th className="py-3 px-4">Scope Identifier</th>
                        <th className="py-3 px-4">Permission &amp; Capabilities</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border font-sans">
                      {API_SCOPES.map((s, idx) => (
                        <tr key={idx} className="hover:bg-muted/30">
                          <td className="py-3 px-4 font-mono font-bold text-primary">{s.scope}</td>
                          <td className="py-3 px-4 text-muted-foreground">{s.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Idempotency Section */}
            <section id="idempotency" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Reliability</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-foreground">
                Idempotency Protocol
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                The AsanShipping API supports idempotent mutations using the <code className="text-primary font-mono">Idempotency-Key</code> HTTP header on <code className="font-mono">POST /orders</code>, <code className="font-mono">POST /inventory/adjustments</code>, and <code className="font-mono">POST /products</code>.
              </p>

              <div className="p-6 rounded-3xl border border-border bg-card/60 backdrop-blur space-y-4 text-xs sm:text-sm">
                <div className="space-y-2">
                  <div className="font-bold text-foreground">How Idempotency Works:</div>
                  <ol className="list-decimal pl-5 space-y-2 text-muted-foreground leading-relaxed">
                    <li>Generate a unique UUIDv4 string on your client (e.g. <code className="font-mono text-foreground">b84c8491-03fc-4b57-a384-93e1b00e3182</code>) representing the transaction.</li>
                    <li>Pass this string in the <code className="font-mono text-foreground">Idempotency-Key</code> header of your request.</li>
                    <li>If the request succeeds, AsanShipping stores the full status code and response payload for <strong>24 hours</strong>.</li>
                    <li>If network failure causes your client to retry the request with the identical key, AsanShipping returns the cached response with the header <code className="font-mono text-emerald-400">X-Cache-Lookup: IDEMPOTENT_HIT</code> without executing any database mutations a second time.</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Rate Limits & Error Standards Section */}
            <section id="rate-limits" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Throttling &amp; Errors</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-foreground">
                Rate Limits &amp; Unified Error Protocol
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-border bg-card">
                  <h4 className="font-bold text-sm text-foreground mb-1">Live Production Rate Limit</h4>
                  <div className="text-2xl font-black font-display text-emerald-500 my-1">120 req / min</div>
                  <p className="text-xs text-muted-foreground">Burst tolerance of 30 concurrent calls. Monitored per merchant account.</p>
                </div>
                <div className="p-5 rounded-2xl border border-border bg-card">
                  <h4 className="font-bold text-sm text-foreground mb-1">Test Sandbox Rate Limit</h4>
                  <div className="text-2xl font-black font-display text-amber-500 my-1">60 req / min</div>
                  <p className="text-xs text-muted-foreground">Burst tolerance of 15 concurrent calls for staging environments.</p>
                </div>
              </div>

              {/* Error Schema Code */}
              <div className="space-y-3">
                <h3 className="font-bold text-base text-foreground">Standardized Error Response Body</h3>
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto shadow-xl">
                  <pre className="text-rose-400 leading-relaxed font-mono">
{`{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_STOCK",
    "message": "Requested quantity (5) exceeds available stock (2) for SKU 'TS-BLK-M'",
    "details": { "sku": "TS-BLK-M", "requested": 5, "available": 2 },
    "timestamp": "2026-09-26T14:00:00.000Z"
  },
  "meta": {
    "requestId": "req_01J8EF89X...",
    "documentation": "https://asanshipping.com/developers#rate-limits"
  }
}`}
                  </pre>
                </div>
              </div>

              {/* Error Catalog */}
              <div className="space-y-3">
                <h3 className="font-bold text-base text-foreground">Error Code Catalog</h3>
                <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted border-b border-border text-foreground font-mono">
                      <tr>
                        <th className="py-2.5 px-4">Status</th>
                        <th className="py-2.5 px-4">Error Code</th>
                        <th className="py-2.5 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {ERROR_CODES.map((err, i) => (
                        <tr key={i} className="hover:bg-muted/30">
                          <td className="py-2.5 px-4 font-mono font-bold text-foreground">{err.status}</td>
                          <td className="py-2.5 px-4 font-mono font-bold text-rose-500">{err.code}</td>
                          <td className="py-2.5 px-4 text-muted-foreground">{err.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Dynamic Render of All API Endpoint Sections */}
            {filteredSections
              .filter((sec) => sec.endpoints && sec.endpoints.length > 0)
              .map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28 space-y-6">
                  <div className="border-b border-border/80 pb-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary mb-1">
                      Resource Domain
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-foreground">
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground text-xs sm:text-sm md:text-base mt-1">
                      {section.description}
                    </p>
                  </div>

                  <div className="space-y-8">
                    {section.endpoints?.map((endpoint) => (
                      <ApiEndpointCard key={endpoint.id} endpoint={endpoint} />
                    ))}
                  </div>
                </section>
              ))}

            {/* Webhooks & HMAC Verification Section */}
            <section id="webhooks-events" className="scroll-mt-28 space-y-8">
              <div className="border-b border-border/80 pb-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary mb-1">
                  Event Subscriptions
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-foreground">
                  Webhooks &amp; Signature Verification
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base mt-1">
                  AsanShipping delivers real-time notifications via HTTPS POST to your registered webhook URL. Every webhook request contains an <code className="text-primary font-mono">X-Asan-Signature</code> header generated using HMAC-SHA256.
                </p>
              </div>

              {/* Supported Events Table */}
              <div className="space-y-3">
                <h3 className="font-bold text-base text-foreground">Supported Webhook Event Topics</h3>
                <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted border-b border-border text-foreground font-mono">
                      <tr>
                        <th className="py-2.5 px-4">Event Topic</th>
                        <th className="py-2.5 px-4">Trigger Condition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {WEBHOOK_EVENTS.map((ev, i) => (
                        <tr key={i} className="hover:bg-muted/30">
                          <td className="py-2.5 px-4 font-mono font-bold text-emerald-500">{ev.event}</td>
                          <td className="py-2.5 px-4 text-muted-foreground">{ev.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Node.js HMAC Verification Snippet */}
              <div className="space-y-3">
                <h3 className="font-bold text-base text-foreground">Verifying Webhook Signatures in Node.js</h3>
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto shadow-xl">
                  <pre className="text-emerald-300 leading-relaxed font-mono">
{`import crypto from 'crypto';

export function verifyAsanWebhook(rawBodyBuffer, signatureHeader, webhookSecret) {
  // signatureHeader format: 'sha256=1727357400.99a818e7f10b2c3d4e5f6a...'
  const parts = signatureHeader.split('.');
  const timestamp = parts[0].replace('sha256=', '');
  const signature = parts[1];

  // Prevent replay attacks (reject payloads older than 5 minutes)
  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 300;
  if (parseInt(timestamp) < fiveMinutesAgo) {
    throw new Error('Webhook timestamp too old');
  }

  // Compute expected HMAC-SHA256 signature
  const expected = crypto
    .createHmac('sha256', webhookSecret)
    .update(\`\${timestamp}.\${rawBodyBuffer.toString('utf8')}\`)
    .digest('hex');

  // Constant-time comparison to prevent timing attacks
  const isValid = crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'));
  return isValid;
}`}
                  </pre>
                </div>
              </div>

              {/* Interactive HMAC Calculator Component */}
              <div id="hmac-calculator" className="scroll-mt-28">
                <HmacCalculator />
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
