"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, FileText, Compass, Printer } from "lucide-react";

interface ModalsProps {
  showConnect: boolean;
  onCloseConnect: () => void;
  showWaybill: boolean;
  onCloseWaybill: () => void;
  showPrivacy: boolean;
  onClosePrivacy: () => void;
  showTerms: boolean;
  onCloseTerms: () => void;
  showVision: boolean;
  onCloseVision: () => void;
  simCity?: string;
  simName?: string;
  simAmount?: number;
}

export function Modals({
  showConnect,
  onCloseConnect,
  showWaybill,
  onCloseWaybill,
  showPrivacy,
  onClosePrivacy,
  showTerms,
  onCloseTerms,
  showVision,
  onCloseVision,
  simCity = "Lahore",
  simName = "HASHIR",
  simAmount = 3800,
}: ModalsProps) {
  const [shopDomain, setShopDomain] = React.useState("");
  const loginUrl = process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://web.asanshipping.com/login";

  return (
    <>
      {/* 1. Connect Shopify Store Modal */}
      {showConnect && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={onCloseConnect}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-3xl max-w-lg w-full p-6 text-foreground space-y-5 shadow-2xl relative"
          >
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <div className="relative h-7 w-28">
                  <Image
                    src="/images/login-screen-logo.png"
                    alt="Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <span className="font-bold text-sm">1-Click Shopify Integration</span>
              </div>
              <button
                onClick={onCloseConnect}
                className="text-muted-foreground hover:text-foreground text-sm font-mono cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-foreground block">
                Enter Your Shopify Store Domain:
              </label>
              <input
                type="text"
                value={shopDomain}
                onChange={(e) => setShopDomain(e.target.value)}
                placeholder="mybrand.myshopify.com"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm font-mono text-foreground focus:outline-none focus:border-primary"
              />
              <p className="text-[11px] text-muted-foreground">
                Zero downtime. Instantly syncs orders &amp; enables automated WhatsApp + IVR confirmation.
              </p>
            </div>

            <a
              href={`${loginUrl}?mode=register&shop=${encodeURIComponent(shopDomain)}`}
              className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm text-center block transition-all shadow-glow"
            >
              Connect Store via 1-Click OAuth →
            </a>
          </div>
        </div>
      )}

      {/* 2. Mock Waybill Modal */}
      {showWaybill && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={onCloseWaybill}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative border-2 border-slate-900"
          >
            <div className="flex justify-between items-center border-b-2 border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-slate-900 text-white px-2 py-0.5 text-xs font-mono font-bold">
                  PostEx COD WAYBILL
                </span>
                <span className="font-mono font-bold text-xs">CN: 9821401</span>
              </div>
              <button
                onClick={onCloseWaybill}
                className="text-slate-700 font-bold text-xs cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs border border-slate-300 p-4 rounded-lg">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <div>
                  <div className="font-bold text-sm">SHIPPER: ASAN SHIPPING DEMO</div>
                  <div className="text-[10px] text-slate-600">Gulberg III, Lahore, Pakistan</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-primary">
                    PKR {simAmount.toLocaleString("en-PK")} COD
                  </div>
                  <div className="text-[10px] text-slate-600">COD Verified Via WhatsApp</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-xs">CONSIGNEE DETAILS:</div>
                <div>Name: {simName}</div>
                <div>City: {simCity}, Punjab</div>
                <div>Contact: +92 300 1234567</div>
              </div>

              <div className="pt-3 text-center border-t border-slate-200">
                <div className="text-2xl font-bold tracking-[6px] font-mono">
                  ||| | |||| || | |||
                </div>
                <div className="text-[10px] text-slate-600 mt-1">
                  CN: 9821401 &middot; POSTEX-LHE-{simCity.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print PDF Waybill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Privacy Policy Modal */}
      {showPrivacy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={onClosePrivacy}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-foreground space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg font-display">Privacy &amp; Data Protection Policy</span>
              </div>
              <button
                onClick={onClosePrivacy}
                className="text-muted-foreground hover:text-foreground text-sm font-mono cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
              <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/30 text-primary font-semibold">
                100% Compliant with Shopify Protected Customer Data Standards &amp; GDPR Webhooks.
              </div>

              <h3 className="text-sm font-bold text-foreground">1. Scope &amp; Data Processor Role</h3>
              <p>
                AsanShipping operates strictly as a trusted Data Processor for Shopify merchants. We process customer names, delivery addresses, phone numbers, and order line items exclusively to perform automated WhatsApp/IVR confirmation and courier dispatch (TCS, Trax, Leopards, PostEx, M&amp;P).
              </p>

              <h3 className="text-sm font-bold text-foreground">2. Protected Customer Data Policy</h3>
              <p>
                We do NOT sell, rent, or trade merchant or customer data with any third-party advertisers or external brokers. Customer data is processed solely for order fulfillment and return risk scoring.
              </p>

              <h3 className="text-sm font-bold text-foreground">3. Data Security &amp; Encryption Architecture</h3>
              <p>
                All Shopify API credentials and tokens are encrypted using AES-256-CBC field-level encryption. Data transmission uses mandatory TLS 1.3 encryption, and data-at-rest is stored securely in indexed MongoDB Atlas infrastructure.
              </p>

              <h3 className="text-sm font-bold text-foreground">4. Mandatory Shopify GDPR Webhooks</h3>
              <p>Our platform handles all required mandatory webhooks automatically:</p>
              <ul className="list-disc pl-5 space-y-1 font-mono text-[11px]">
                <li><code className="text-primary font-bold">customers/data_request</code>: Provides full customer logs upon request.</li>
                <li><code className="text-primary font-bold">customers/redact</code>: Automatically purges customer records within 48 hours.</li>
                <li><code className="text-primary font-bold">shop/redact</code>: Automatically purges store data within 48 hours of app uninstallation.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 4. Terms of Service Modal */}
      {showTerms && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={onCloseTerms}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-foreground space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg font-display">Terms of Service</span>
              </div>
              <button
                onClick={onCloseTerms}
                className="text-muted-foreground hover:text-foreground text-sm font-mono cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
              <h3 className="text-sm font-bold text-foreground">1. Acceptance of Terms</h3>
              <p>
                By connecting your Shopify store to AsanShipping, you agree to these Terms of Service. AsanShipping provides automated COD order verification, courier routing, and reverse logistics tracking.
              </p>

              <h3 className="text-sm font-bold text-foreground">2. Merchant Responsibilities</h3>
              <p>
                Merchants are responsible for maintaining valid courier API keys (TCS, Trax, Leopards, PostEx, M&amp;P) and ensuring customer contact information collected at checkout is accurate.
              </p>

              <h3 className="text-sm font-bold text-foreground">3. Service SLA &amp; Uptime</h3>
              <p>
                We target a 99.9% uptime SLA for webhook processing and automated verification dispatch. API rate limits are dynamically managed to prevent courier booking throttles.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Vision & Goals Modal */}
      {showVision && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={onCloseVision}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-foreground space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg font-display">Our Goals &amp; Long-Term Vision</span>
              </div>
              <button
                onClick={onCloseVision}
                className="text-muted-foreground hover:text-foreground text-sm font-mono cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-5 text-xs leading-relaxed text-muted-foreground">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-primary space-y-1">
                <div className="font-bold text-sm">THE MISSION</div>
                <p>
                  To eliminate Return-to-Origin (RTO) friction and reclaim billions in lost Cash-On-Delivery margins for Pakistani e-commerce entrepreneurs.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-foreground">The Problem We Are Solving</h3>
                <p>
                  Over 30% of Cash-on-Delivery (COD) parcels across Pakistan are returned due to fake orders, unverified buyers, and suboptimal courier assignment. This costs Pakistani D2C brands millions in dead return freight fees and blocked inventory capital.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-foreground">The 3 Pillars of AsanShipping</h3>
                <div className="grid sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl border border-border bg-background">
                    <div className="font-bold text-primary mb-1">1. Autonomous Verification</div>
                    <p className="text-[11px] text-muted-foreground">
                      Zero-friction WhatsApp quick replies with automated Voice IVR fallback.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-border bg-background">
                    <div className="font-bold text-primary mb-1">2. Intelligent Routing</div>
                    <p className="text-[11px] text-muted-foreground">
                      Multi-courier SLA analysis across TCS, Trax, Leopards, PostEx, and M&amp;P.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-border bg-background">
                    <div className="font-bold text-primary mb-1">3. Reverse Logistics</div>
                    <p className="text-[11px] text-muted-foreground">
                      Digital warehouse barcode scanning to classify scrap vs restockable inventory.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-foreground">Long-Term Vision</h3>
                <p>
                  To build the definitive AI-driven autonomous logistics infrastructure for emerging digital commerce markets across South Asia and MENA.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
