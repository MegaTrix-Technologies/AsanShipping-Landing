"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  MessageSquare,
  CheckCircle2,
  Truck,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  Printer,
  Check,
  X,
} from "lucide-react";

interface InteractiveHeroProps {
  onOpenConnect: () => void;
  onOpenWaybill: () => void;
  simCity: string;
  setSimCity: (city: string) => void;
  simName: string;
  setSimName: (name: string) => void;
  simAmount: number;
  setSimAmount: (amt: number) => void;
}

export function InteractiveHero({
  onOpenConnect,
  onOpenWaybill,
  simCity,
  setSimCity,
  simName,
  setSimName,
  simAmount,
  setSimAmount,
}: InteractiveHeroProps) {
  const [simStatus, setSimStatus] = useState<"idle" | "screening" | "whatsapp" | "confirmed" | "booked">("idle");
  const [waResponse, setWaResponse] = useState<"pending" | "confirmed" | "cancelled">("pending");

  const runSimulation = () => {
    setSimStatus("screening");
    setWaResponse("pending");
    setTimeout(() => setSimStatus("whatsapp"), 1200);
    setTimeout(() => {
      setSimStatus("confirmed");
      setWaResponse("confirmed");
    }, 2600);
    setTimeout(() => setSimStatus("booked"), 4000);
  };

  const resetSimulation = () => {
    setSimStatus("idle");
    setWaResponse("pending");
  };

  return (
    <section id="simulator" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title & Value Proposition */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-primary">
            AUTONOMOUS LOGISTICS OS FOR PAKISTAN
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground font-display leading-[1.15]">
            Stop Losing 30%+ Margins to <span className="text-primary">Failed COD Deliveries</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Eliminate Return-to-Origin (RTO) friction with automated WhatsApp verification, cross-merchant blacklist screening, and autonomous AI routing across TCS, Trax, Leopards, PostEx, and M&amp;P.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenConnect}
              className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-sm shadow-glow transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Connect Shopify Store (Free)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#how-it-works"
              className="px-6 py-3.5 rounded-xl border border-border bg-card text-foreground font-bold text-sm hover:bg-accent transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore How It Works</span>
            </a>
          </div>
        </div>

        {/* Live Interactive Control Simulator Box */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-primary tracking-wider">
                INTERACTIVE LIVE DEMO
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                Order Lifecycle Simulation
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Experience how AsanShipping screens fraud, verifies COD, and books the carrier in under 5 seconds.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={simStatus === "idle" ? runSimulation : resetSimulation}
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-xs shadow-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                {simStatus === "idle" ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Live Simulation</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Simulation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Simulator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Controls: Simulated Order Details */}
            <div className="lg:col-span-4 space-y-4 p-5 rounded-2xl border border-border bg-background">
              <div className="text-xs font-bold font-mono uppercase text-muted-foreground">
                1. Order Ingestion Parameters
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">
                    Customer Name:
                  </label>
                  <input
                    type="text"
                    value={simName}
                    onChange={(e) => setSimName(e.target.value)}
                    disabled={simStatus !== "idle"}
                    className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground font-mono text-xs focus:outline-none focus:border-primary disabled:opacity-75"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">
                    Destination City:
                  </label>
                  <select
                    value={simCity}
                    onChange={(e) => setSimCity(e.target.value)}
                    disabled={simStatus !== "idle"}
                    className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground font-mono text-xs focus:outline-none focus:border-primary disabled:opacity-75"
                  >
                    <option value="Lahore">Lahore (Punjab)</option>
                    <option value="Karachi">Karachi (Sindh)</option>
                    <option value="Islamabad">Islamabad (Federal)</option>
                    <option value="Faisalabad">Faisalabad (Punjab)</option>
                    <option value="Peshawar">Peshawar (KPK)</option>
                    <option value="Quetta">Quetta (Balochistan)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-foreground mb-1">
                    COD Amount (PKR):
                  </label>
                  <input
                    type="number"
                    value={simAmount}
                    onChange={(e) => setSimAmount(Number(e.target.value))}
                    disabled={simStatus !== "idle"}
                    className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground font-mono text-xs focus:outline-none focus:border-primary disabled:opacity-75"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border/80 text-[11px] text-muted-foreground">
                <span className="font-bold text-primary">Simulated Trigger:</span> Shopify checkout completed &rarr; Webhook emitted.
              </div>
            </div>

            {/* Middle Controls: Processing Pipeline */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-bold font-mono uppercase text-muted-foreground">
                2. Autonomous Execution Pipeline
              </div>

              {/* Step 1: Blacklist Screening */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  simStatus === "screening"
                    ? "border-primary bg-primary/10 text-primary shadow-sm"
                    : simStatus !== "idle"
                    ? "border-border bg-card text-foreground"
                    : "border-border/60 bg-background/50 text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Cross-Store Blacklist Gate</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold">
                    {simStatus === "screening"
                      ? "SCANNING..."
                      : simStatus !== "idle"
                      ? "CLEARED (0 RETURNS)"
                      : "STANDBY"}
                  </span>
                </div>
              </div>

              {/* Step 2: WhatsApp Confirmation */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  simStatus === "whatsapp"
                    ? "border-primary bg-primary/10 text-primary shadow-sm"
                    : ["confirmed", "booked"].includes(simStatus)
                    ? "border-border bg-card text-foreground"
                    : "border-border/60 bg-background/50 text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Bot Verification</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold">
                    {simStatus === "whatsapp"
                      ? "DISPATCHED..."
                      : ["confirmed", "booked"].includes(simStatus)
                      ? "CONFIRMED BY BUYER"
                      : "WAITING"}
                  </span>
                </div>
              </div>

              {/* Step 3: Courier Selection & Booking */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  simStatus === "booked"
                    ? "border-primary bg-primary/15 text-primary shadow-sm"
                    : "border-border/60 bg-background/50 text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <Truck className="w-4 h-4" />
                    <span>Smart Courier Dispatch</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold">
                    {simStatus === "booked" ? "POSTEX BOOKED (CN: 9821401)" : "PENDING"}
                  </span>
                </div>
              </div>

              {simStatus === "booked" && (
                <button
                  onClick={onOpenWaybill}
                  className="w-full py-2.5 px-4 rounded-xl bg-card border border-primary text-primary font-bold text-xs hover:bg-primary/10 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Preview &amp; Print Waybill Label</span>
                </button>
              )}
            </div>

            {/* Right Controls: Interactive WhatsApp Preview */}
            <div className="lg:col-span-4 rounded-2xl border border-border bg-[#0b141a] text-white p-4 space-y-3 font-sans shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                    AS
                  </div>
                  <div>
                    <div className="font-bold text-xs leading-none">AsanShipping Bot</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Verified Business</div>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Live Session</span>
              </div>

              {/* Chat Bubble */}
              <div className="bg-[#202c33] p-3 rounded-2xl rounded-tl-none space-y-2 text-xs text-zinc-200">
                <p>
                  Assalam-o-Alaikum <span className="font-bold text-white">{simName}</span>! 👋
                </p>
                <p className="text-[11px] text-zinc-300">
                  Thank you for your order. Please confirm your delivery details:
                </p>
                <div className="p-2 rounded-lg bg-[#111b21] font-mono text-[11px] space-y-0.5 text-zinc-300">
                  <div>City: <span className="text-white font-bold">{simCity}</span></div>
                  <div>Amount: <span className="text-emerald-400 font-bold">PKR {simAmount.toLocaleString("en-PK")} COD</span></div>
                </div>

                {/* Quick Action Buttons */}
                <div className="pt-1 space-y-1.5">
                  <button
                    onClick={() => {
                      setWaResponse("confirmed");
                      if (simStatus === "whatsapp" || simStatus === "idle") {
                        setSimStatus("confirmed");
                        setTimeout(() => setSimStatus("booked"), 1200);
                      }
                    }}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      waResponse === "confirmed"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-[#00a884] hover:bg-[#008f6f] text-white"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm Order</span>
                  </button>
                  <button
                    onClick={() => setWaResponse("cancelled")}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      waResponse === "cancelled"
                        ? "bg-red-900 text-red-200"
                        : "bg-white/10 hover:bg-white/15 text-zinc-300"
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Cancel Order</span>
                  </button>
                </div>
              </div>

              <div className="text-center text-[10px] text-zinc-400 font-mono pt-1">
                Zero merchant effort &middot; Runs automatically 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
