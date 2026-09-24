"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useSpring, animate } from "motion/react";
import {
  Shield, ShieldAlert, Cpu, ScanBarcode, Box, CheckCircle2, ArrowRight,
  Star, ChevronDown, Sparkles, Calculator, PhoneCall, RotateCcw,
  Check, Clock, ShieldCheck, Sun, Moon, AlertTriangle, Zap,
  TrendingUp, Activity, Search, RefreshCw, BarChart3, Radio,
  Package, Truck, ArrowUpRight, CheckCircle, Sliders, HelpCircle, Layers,
  Users, ChevronRight, DollarSign, Lock, Globe, Play, MessageSquare, ExternalLink,
  CheckSquare, XCircle, ArrowRightLeft, Database, Store, Eye, Volume2, Send,
  FileText, Printer, Scale, Compass, Award, Terminal, QrCode, Quote,
  MapPin, Building2, Rocket, Target, Handshake, LineChart, Wallet,
  ShoppingBag, Timer, BadgeCheck, Fingerprint, Workflow, Gauge, Headset,
  Building, Warehouse, PackageCheck, PackageX, ClipboardCheck, Bell, Menu
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts";


import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Footer } from "@/components/Footer";

const easeCurve = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1 } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const fadeLeft = { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } };
const staggerFast = { hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } } };

function ScrollReveal({
  children, variants = fadeUp, delay = 0, className = ""
}: { children: React.ReactNode; variants?: any; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, ease: easeCurve, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3D Tilt Card Component 
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Animated Counter Component (counts up when scrolled into view) 
function CountUp({
  value, suffix = "", prefix = "", decimals = 0, duration = 1.6, className = ""
}: { value: number; suffix?: string; prefix?: string; decimals?: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: easeCurve,
      onUpdate: (latest) => {
        setDisplay(
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toLocaleString("en-PK")
        );
      }
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

// Magnetic hover wrapper — subtle pull toward cursor 
function Magnetic({ children, strength = 14 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// Interactive Animated Architecture Ecosystem Grid (Nodes & Edges Flowchart)
function ArchitectureEcosystemGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shopifyRef = useRef<HTMLDivElement>(null);
  const scrapRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const commsRef = useRef<HTMLDivElement>(null);
  const couriersRef = useRef<HTMLDivElement>(null);
  const customerRef = useRef<HTMLDivElement>(null);

  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [paths, setPaths] = useState({
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    p5: "",
    p6: ""
  });

  const updatePaths = useCallback(() => {
    if (!containerRef.current || !shopifyRef.current || !coreRef.current || !commsRef.current || !couriersRef.current || !customerRef.current || !scrapRef.current) {
      return;
    }
    const cRect = containerRef.current.getBoundingClientRect();

    const getRight = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return { x: r.right - cRect.left, y: r.top + r.height / 2 - cRect.top };
    };

    const getLeft = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return { x: r.left - cRect.left, y: r.top + r.height / 2 - cRect.top };
    };

    const getBottom = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - cRect.left, y: r.bottom - cRect.top };
    };

    const sRight = getRight(shopifyRef.current);
    const cLeft = getLeft(coreRef.current);
    const cRight = getRight(coreRef.current);
    const commsLeft = getLeft(commsRef.current);
    const commsRight = getRight(commsRef.current);
    const couriersLeft = getLeft(couriersRef.current);
    const couriersRight = getRight(couriersRef.current);
    const custLeft = getLeft(customerRef.current);
    const custBottom = getBottom(customerRef.current);
    const scrapBottom = getBottom(scrapRef.current);

    // Padding offset so arrowheads rest cleanly 8px outside card borders
    const pad = 8;

    // 1. Shopify Right -> Core Left
    const p1 = `M ${sRight.x + pad} ${sRight.y} C ${sRight.x + 60} ${sRight.y}, ${cLeft.x - 60} ${cLeft.y}, ${cLeft.x - pad} ${cLeft.y}`;

    // 2. Core Right -> Comms Left
    const p2 = `M ${cRight.x + pad} ${cRight.y - 30} C ${cRight.x + 60} ${cRight.y - 30}, ${commsLeft.x - 60} ${commsLeft.y}, ${commsLeft.x - pad} ${commsLeft.y}`;

    // 3. Comms Right -> Customer Left (Top half)
    const p3 = `M ${commsRight.x + pad} ${commsRight.y} C ${commsRight.x + 50} ${commsRight.y}, ${custLeft.x - 50} ${custLeft.y - 30}, ${custLeft.x - pad} ${custLeft.y - 30}`;

    // 4. Core Right -> Courier Left
    const p4 = `M ${cRight.x + pad} ${cRight.y + 30} C ${cRight.x + 60} ${cRight.y + 30}, ${couriersLeft.x - 60} ${couriersLeft.y}, ${couriersLeft.x - pad} ${couriersLeft.y}`;

    // 5. Courier Right -> Customer Left (Bottom half)
    const p5 = `M ${couriersRight.x + pad} ${couriersRight.y} C ${couriersRight.x + 50} ${couriersRight.y}, ${custLeft.x - 50} ${custLeft.y + 30}, ${custLeft.x - pad} ${custLeft.y + 30}`;

    // 6. Reverse Loop: Customer Bottom -> Scrap Bottom
    const p6 = `M ${custBottom.x} ${custBottom.y + pad} C ${custBottom.x} ${custBottom.y + 80}, ${scrapBottom.x} ${scrapBottom.y + 80}, ${scrapBottom.x} ${scrapBottom.y + pad}`;

    setPaths({ p1, p2, p3, p4, p5, p6 });
  }, []);

  useEffect(() => {
    updatePaths();
    window.addEventListener("resize", updatePaths);
    const timer = setTimeout(updatePaths, 300);
    return () => {
      window.removeEventListener("resize", updatePaths);
      clearTimeout(timer);
    };
  }, [updatePaths]);

  return (
    <section id="architecture" className="py-12 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary dark:text-primary text-xs font-bold font-mono inline-flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 animate-spin text-primary dark:text-primary" />
            INTELLIGENT ECOSYSTEM ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            How AsanShipping Orchestrates Your Logistics
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Hover over any node to inspect real-time data flows between Shopify, multi-channel verification, courier networks, end customers, and warehouse reverse logistics.
          </p>
        </div>

        {/* Desktop & Mobile Dynamic Interactive Flowchart Grid */}
        <div ref={containerRef} className="relative w-full overflow-visible py-4">

          {/* SVG Arrowheads and Dynamic Connecting Lines for Desktop */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0 overflow-visible">
            <defs>
              <marker id="arrow-primary" viewBox="0 0 10 10" refX="7" refY="3.5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 7 3.5 L 0 7 L 1.5 3.5 z" fill="hsl(var(--primary))" />
              </marker>
            </defs>

            {/* Path 1: Shopify -> Core Engine (Webhook Ingestion) */}
            {paths.p1 && (
              <>
                <path
                  id="path-shopify-core"
                  d={paths.p1}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2.5"
                  strokeDasharray={activeNode === "shopify" ? "5,5" : "none"}
                  markerEnd="url(#arrow-primary)"
                  className="transition-all duration-300 opacity-90"
                />
                <circle r="3.5" fill="hsl(var(--primary))">
                  <animateMotion path={paths.p1} dur="2.5s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {/* Path 2: Core Engine -> Multi-Channel Verification (Template Dispatch) */}
            {paths.p2 && (
              <>
                <path
                  id="path-core-comms"
                  d={paths.p2}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2.5"
                  markerEnd="url(#arrow-primary)"
                  className="transition-all duration-300 opacity-90"
                />
                <circle r="3.5" fill="hsl(var(--primary))">
                  <animateMotion path={paths.p2} dur="2.2s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {/* Path 3: Multi-Channel Verification <-> End Customer (Bi-Directional Response) */}
            {paths.p3 && (
              <>
                <path
                  id="path-comms-customer"
                  d={paths.p3}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2.5"
                  markerStart="url(#arrow-primary)"
                  markerEnd="url(#arrow-primary)"
                  className="transition-all duration-300 opacity-90"
                />
                <circle r="3.5" fill="hsl(var(--primary))">
                  <animateMotion path={paths.p3} dur="1.8s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {/* Path 4: Core Engine -> Courier Dispatch (SLA Tariff Routing) */}
            {paths.p4 && (
              <>
                <path
                  id="path-core-couriers"
                  d={paths.p4}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2.5"
                  markerEnd="url(#arrow-primary)"
                  className="transition-all duration-300 opacity-90"
                />
                <circle r="3.5" fill="hsl(var(--primary))">
                  <animateMotion path={paths.p4} dur="2.2s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {/* Path 5: Courier Dispatch -> End Customer (Doorstep COD Delivery) */}
            {paths.p5 && (
              <>
                <path
                  id="path-couriers-customer"
                  d={paths.p5}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2.5"
                  markerEnd="url(#arrow-primary)"
                  className="transition-all duration-300 opacity-90"
                />
                <circle r="3.5" fill="hsl(var(--primary))">
                  <animateMotion path={paths.p5} dur="2s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {/* Path 6: RTO & Scrap Tracking Loop (End Customer / Courier -> Scrap Desk) */}
            {paths.p6 && (
              <>
                <path
                  id="path-reverse-loop"
                  d={paths.p6}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2.5"
                  strokeDasharray="6,6"
                  markerEnd="url(#arrow-primary)"
                  className="transition-all duration-300 animate-pulse opacity-90"
                />
                <circle r="3.5" fill="hsl(var(--primary))">
                  <animateMotion path={paths.p6} dur="4s" repeatCount="indefinite" />
                </circle>
              </>
            )}
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {/* COLUMN 1: INGESTION SOURCE & REVERSE LOGISTICS */}
            <div className="space-y-6 flex flex-col justify-between">
              {/* SHOPIFY NODE */}
              <motion.div
                ref={shopifyRef}
                onMouseEnter={() => setActiveNode("shopify")}
                onMouseLeave={() => setActiveNode(null)}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "p-5 rounded-2xl border transition-all duration-300 relative space-y-4 cursor-pointer backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-black/40",
                  activeNode === "shopify"
                    ? "border-primary bg-white dark:bg-zinc-900 ring-2 ring-primary/40 shadow-primary/20"
                    : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white hover:border-primary/60"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black tracking-wider text-primary uppercase">
                    DATA SOURCE
                  </span>
                  <Store className="w-5 h-5 text-primary dark:text-primary" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    Shopify Admin API
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time webhook &amp; Custom App intake</p>
                </div>
                <div className="space-y-2 text-xs font-medium">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <Package className="w-4 h-4 text-primary dark:text-primary shrink-0" />
                    <span>Live COD Orders (&lt; 1s Webhook)</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <ScanBarcode className="w-4 h-4 text-primary dark:text-primary shrink-0" />
                    <span>Product Catalog &amp; Stock Sync</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <Users className="w-4 h-4 text-primary dark:text-primary shrink-0" />
                    <span>Customer Address &amp; LTV History</span>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Connector Arrow */}
              <div className="lg:hidden flex items-center justify-center text-xs font-mono font-bold text-primary py-1">
                ⬇️ REAL-TIME WEBHOOK INGESTION ⬇️
              </div>

              {/* REVERSE LOGISTICS LOOP NODE (BOTTOM LEFT) */}
              <motion.div
                ref={scrapRef}
                onMouseEnter={() => setActiveNode("scrap")}
                onMouseLeave={() => setActiveNode(null)}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "p-5 rounded-2xl border transition-all duration-300 relative space-y-3 cursor-pointer backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-black/40",
                  activeNode === "scrap"
                    ? "border-primary bg-white dark:bg-zinc-900 ring-2 ring-primary/40 shadow-primary/20"
                    : "border-primary/40 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white hover:border-primary/70"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black tracking-wider text-primary uppercase">
                    REVERSE LOGISTICS LOOP
                  </span>
                  <RotateCcw className="w-5 h-5 text-primary animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Warehouse Scrap Desk &amp; Restock
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">RTO barcode scanning &amp; inventory recovery loop</p>
                </div>
                <div className="space-y-2 text-xs font-medium">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <ScanBarcode className="w-4 h-4 text-primary shrink-0" />
                    <span>Instant Return Scan</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <RotateCcw className="w-4 h-4 text-primary shrink-0" />
                    <span>Restockable vs Damaged Ledger</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* COLUMN 2: ASANSHIPPING INTELLIGENT PROCESSING CORE */}
            <div className="flex flex-col justify-center">
              <motion.div
                ref={coreRef}
                onMouseEnter={() => setActiveNode("core")}
                onMouseLeave={() => setActiveNode(null)}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "p-6 rounded-3xl border transition-all duration-300 relative space-y-5 cursor-pointer backdrop-blur-xl shadow-2xl shadow-slate-200/60 dark:shadow-black/50",
                  activeNode === "core"
                    ? "border-primary bg-white dark:bg-zinc-900 ring-4 ring-primary/40 shadow-primary/30"
                    : "border-primary/40 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white hover:border-primary"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black tracking-wider text-primary uppercase">
                    INTELLIGENT PROCESSING
                  </span>
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    AsanShipping Control Tower
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Multi-tenant AI verification &amp; routing engine</p>
                </div>
                <div className="space-y-2.5 text-xs font-medium">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                    <ShieldAlert className="w-4 h-4 text-primary shrink-0" />
                    <span>Cross-Merchant Blacklist Gate</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                    <Workflow className="w-4 h-4 text-primary shrink-0" />
                    <span>Redis &amp; BullMQ State Machine</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                    <Gauge className="w-4 h-4 text-primary shrink-0" />
                    <span>Dynamic Tariff &amp; SLA Optimizer</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* COLUMN 3: OUTBOUND EXECUTION (COMMS + COURIERS) */}
            <div className="space-y-6 flex flex-col justify-between">
              {/* MULTI-CHANNEL VERIFICATION LAYER */}
              <motion.div
                ref={commsRef}
                onMouseEnter={() => setActiveNode("comms")}
                onMouseLeave={() => setActiveNode(null)}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "p-5 rounded-2xl border transition-all duration-300 relative space-y-3 cursor-pointer backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-black/40",
                  activeNode === "comms"
                    ? "border-primary bg-white dark:bg-zinc-900 ring-2 ring-primary/40 shadow-primary/20"
                    : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white hover:border-primary/60"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black tracking-wider text-primary uppercase">
                    VERIFICATION LAYER
                  </span>
                  <MessageSquare className="w-5 h-5 text-primary dark:text-primary" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Multi-Channel Verification</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center justify-between text-slate-800 dark:text-slate-200">
                    <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-primary dark:text-primary" /> WhatsApp Bot</span>
                    <span className="text-[10px] font-mono text-primary dark:text-primary">[Confirm/Cancel]</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center justify-between text-slate-800 dark:text-slate-200">
                    <span className="flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Voice IVR Fallback</span>
                    <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">[Press 1 / 2]</span>
                  </div>
                </div>
              </motion.div>

              {/* AUTOMATED COURIER ROUTING LAYER */}
              <motion.div
                ref={couriersRef}
                onMouseEnter={() => setActiveNode("couriers")}
                onMouseLeave={() => setActiveNode(null)}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "p-5 rounded-2xl border transition-all duration-300 relative space-y-3 cursor-pointer backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-black/40",
                  activeNode === "couriers"
                    ? "border-primary bg-white dark:bg-zinc-900 ring-2 ring-primary/40 shadow-primary/20"
                    : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white hover:border-primary/60"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black tracking-wider text-primary uppercase">
                    FULFILLMENT LAYER
                  </span>
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Automated Courier Dispatch</h3>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] font-bold">
                  <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/60 text-slate-800 dark:text-slate-200 text-center hover:border-primary/40">TCS Express</div>
                  <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/60 text-slate-800 dark:text-slate-200 text-center hover:border-primary/40">Leopards</div>
                  <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/60 text-slate-800 dark:text-slate-200 text-center hover:border-primary/40">Trax Logistics</div>
                  <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-center font-bold">PostEx COD</div>
                  <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/60 text-slate-800 dark:text-slate-200 text-center hover:border-primary/40 col-span-2">M&amp;P Express</div>
                </div>
              </motion.div>
            </div>

            {/* COLUMN 4: END CUSTOMER NODE */}
            <div className="flex flex-col justify-center">
              <motion.div
                ref={customerRef}
                onMouseEnter={() => setActiveNode("customer")}
                onMouseLeave={() => setActiveNode(null)}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "p-6 rounded-3xl border transition-all duration-300 relative space-y-4 cursor-pointer backdrop-blur-xl shadow-2xl shadow-slate-200/60 dark:shadow-black/50",
                  activeNode === "customer"
                    ? "border-primary bg-white dark:bg-zinc-900 ring-4 ring-primary/40 shadow-primary/30"
                    : "border-primary/40 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white hover:border-primary"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black tracking-wider text-primary uppercase">
                    BUYER INTERACTION
                  </span>
                  <Users className="w-6 h-6 text-primary dark:text-primary" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    End Customer (+92 300 XXXX)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Interactive buyer response &amp; delivery confirmation</p>
                </div>
                <div className="space-y-2 text-xs font-medium">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center justify-between text-slate-800 dark:text-slate-200">
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> WhatsApp Click</span>
                    <span className="font-mono text-[10px] text-primary font-bold">Confirmed</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center justify-between text-slate-800 dark:text-slate-200">
                    <span className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-primary" /> IVR Keypress</span>
                    <span className="font-mono text-[10px] text-primary font-bold">Press 1</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 flex items-center justify-between text-slate-800 dark:text-slate-200">
                    <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-primary" /> Doorstep Delivery</span>
                    <span className="font-mono text-[10px] text-primary font-bold">COD Paid</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePageContent() {
  const loginUrl = process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://web.asanshipping.com/login";
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const searchParams = useSearchParams();

  // Mouse spotlight state 
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Modals state 
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectShopDomain, setConnectShopDomain] = useState("");
  const [showWaybillModal, setShowWaybillModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showVisionModal, setShowVisionModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-open modal if query string present (e.g. ?view=privacy, ?view=vision, ?view=terms) 
  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "privacy") setShowPrivacyModal(true);
    if (view === "terms") setShowTermsModal(true);
    if (view === "vision") setShowVisionModal(true);
  }, [searchParams]);

  // Interactive Hero WhatsApp Demo Card state
  const [heroWaState, setHeroWaState] = useState<"pending" | "confirmed" | "cancelled">("pending");

  // Simulator States 
  const [tab, setTab] = useState<"simulator" | "routing" | "whatsapp" | "blacklist" | "scrap">("simulator");
  const [simName, setSimName] = useState("HASHIR");
  const [simCity, setSimCity] = useState("Lahore");
  const [simAmount, setSimAmount] = useState(3800);
  const [simStatus, setSimStatus] = useState<"idle" | "screening" | "whatsapp" | "confirmed" | "booked">("idle");

  // Blacklist Checker 
  const [testPhone, setTestPhone] = useState("0300-9876543");
  const [blacklistResult, setBlacklistResult] = useState<{ risk: string; score: number; returns: number } | null>(null);

  // ROI Calculator States 
  const [orders, setOrders] = useState(1200);
  const [aov, setAov] = useState(3800);
  const [rto, setRto] = useState(32);
  const [annual, setAnnual] = useState(false);

  // Fetch Subscription Packages dynamically from MongoDB API
  const [rawPackages, setRawPackages] = useState<any[]>([]);
  const [isPackagesLoading, setIsPackagesLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === "production" ? "https://api-core.asanshipping.com" : "http://localhost:5000");
        const res = await fetch(`${apiBase}/api/packages`);
        const json = await res.json();
        const list = json.data;
        if (Array.isArray(list) && list.length > 0) {
          setRawPackages(list);
        }
      } catch (err) {
        // fallback: empty packages
      } finally {
        setIsPackagesLoading(false);
      }
    })();
  }, []);

  const activePackages = (rawPackages || []).filter((p: any) => p.isActive !== false);

  // Dynamic Chart Data based on ROI Sliders 
  const chartData = [
    { day: "Mon", delivered: Math.round(orders * 0.12 * (1 - rto / 300)), rto: Math.round(orders * 0.12 * (rto / 100)), savedDeliveries: Math.round(orders * 0.12 * 0.32) },
    { day: "Tue", delivered: Math.round(orders * 0.15 * (1 - rto / 300)), rto: Math.round(orders * 0.15 * (rto / 100)), savedDeliveries: Math.round(orders * 0.15 * 0.32) },
    { day: "Wed", delivered: Math.round(orders * 0.18 * (1 - rto / 300)), rto: Math.round(orders * 0.18 * (rto / 100)), savedDeliveries: Math.round(orders * 0.18 * 0.32) },
    { day: "Thu", delivered: Math.round(orders * 0.22 * (1 - rto / 300)), rto: Math.round(orders * 0.22 * (rto / 100)), savedDeliveries: Math.round(orders * 0.22 * 0.32) },
    { day: "Fri", delivered: Math.round(orders * 0.25 * (1 - rto / 300)), rto: Math.round(orders * 0.25 * (rto / 100)), savedDeliveries: Math.round(orders * 0.25 * 0.32) },
    { day: "Sat", delivered: Math.round(orders * 0.28 * (1 - rto / 300)), rto: Math.round(orders * 0.28 * (rto / 100)), savedDeliveries: Math.round(orders * 0.28 * 0.32) },
    { day: "Sun", delivered: Math.round(orders * 0.32 * (1 - rto / 300)), rto: Math.round(orders * 0.32 * (rto / 100)), savedDeliveries: Math.round(orders * 0.32 * 0.32) }
  ];

  // FAQ Accordion & Search State 
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState("");

  // ROI calculations 
  const lostShipping = Math.round(orders * (rto / 100) * 250);
  const blockedCash = Math.round(orders * (rto / 100) * aov);
  const totalMonthlyLoss = lostShipping + blockedCash;
  const monthlyRecovered = Math.round(totalMonthlyLoss * 0.35);
  const annualRecovered = monthlyRecovered * 12;

  // Simulator flow 
  const runLiveSimulation = () => {
    setSimStatus("screening");
    setTimeout(() => setSimStatus("whatsapp"), 1400);
    setTimeout(() => setSimStatus("confirmed"), 2800);
    setTimeout(() => setSimStatus("booked"), 4200);
  };

  const checkBlacklist = () => {
    if (!testPhone) return;
    const isHighRisk = testPhone.endsWith("7") || testPhone.endsWith("9") || testPhone.endsWith("3");
    setBlacklistResult({
      risk: isHighRisk ? "HIGH_RISK" : "SAFE_VERIFIED",
      score: isHighRisk ? 85 : 12,
      returns: isHighRisk ? 3 : 0
    });
  };

  const faqs = [
    {
      q: "Do I need developer approval from Shopify to run this?",
      a: "No. Because we run as a 1-click Custom App directly inside your Shopify Admin with targeted scopes, setup takes under 3 minutes with zero app store approval delays.",
      category: "Setup"
    },
    {
      q: "How does WhatsApp Interactive Verification work?",
      a: "As soon as an order is placed on Shopify, our API fires an automated WhatsApp message with interactive [Confirm Order] and [Cancel Order] buttons. If the customer does not reply within 10 minutes, an IVR voice call is automatically dispatched as a fallback.",
      category: "WhatsApp"
    },
    {
      q: "How does the Smart Courier Routing Engine choose the carrier?",
      a: "Our algorithm evaluates 14-day historical delivery success rates by city destination, parcel weight, and real-time fuel tariffs across TCS, Trax, Leopards, PostEx, and M&P to auto-select the highest-probability carrier.",
      category: "Routing"
    },
    {
      q: "How does the Reverse Scrap & Barcode Desk prevent inventory leakage?",
      a: "Warehouse staff scan returned package barcodes upon arrival. The system categorizes items (Restockable, Damaged_Scrap, Mismatched), updates your Shopify inventory automatically, and logs financial scrap losses.",
      category: "Returns"
    },
    {
      q: "Which Pakistani couriers are supported?",
      a: "We natively integrate with TCS Express, Trax Logistics, Leopards Courier, PostEx COD, and M&P Courier via live REST APIs with pre-seeded city code mapping.",
      category: "Couriers"
    },
    {
      q: "Is my store and customer data safe?",
      a: "Yes. All API credentials and merchant tokens are encrypted using AES-256-CBC. Data access is strictly isolated per tenant using indexed tenantId schemas.",
      category: "Security"
    },
    {
      q: "Can I switch couriers mid-order if one is unavailable in a city?",
      a: "Yes. If the top-ranked courier has no coverage for a destination city or is reporting API downtime, the routing engine automatically falls back to the next-best carrier without merchant intervention.",
      category: "Routing"
    },
    {
      q: "Does AsanShipping work with Shopify POS or only online orders?",
      a: "AsanShipping listens to standard Shopify order-creation webhooks, so it works with orders from your online store, draft orders, and POS as long as the order requires courier fulfillment.",
      category: "Setup"
    },
    {
      q: "What happens if a customer cancels via the WhatsApp button?",
      a: "The order is instantly tagged Cancelled_By_Customer in your Shopify admin, removed from the dispatch queue, and logged so it never reaches courier booking — saving you the shipping fee entirely.",
      category: "WhatsApp"
    }
  ];

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.a.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.category.toLowerCase().includes(faqSearch.toLowerCase())
  );

  // Testimonials data 
  const testimonials = [
    {
      name: "Ahmed Raza",
      role: "Founder, UrbanThreads.pk",
      avatarBg: "bg-primary/20 text-primary",
      initials: "AR",
      quote: "Our RTO rate dropped from 34% to 19% within the first six weeks. The WhatsApp confirmation step alone paid for the subscription three times over.",
      metric: "−15% RTO",
      metricLabel: "in 6 weeks"
    },
    {
      name: "Sana Malik",
      role: "Operations Lead, Threadbare Studio",
      avatarBg: "bg-primary/20 text-primary",
      initials: "SM",
      quote: "The blacklist screening caught repeat rejecters we'd been shipping to for months without knowing. It's the single feature that changed our unit economics.",
      metric: "PKR 96K",
      metricLabel: "saved / month"
    },
    {
      name: "Bilal Chaudhry",
      role: "Co-Founder, Leather & Co",
      avatarBg: "bg-primary/20 text-primary",
      initials: "BC",
      quote: "Smart courier routing means we stopped manually comparing TCS vs Leopards vs PostEx tariffs every single order. It just picks the best one automatically.",
      metric: "4.2 hrs",
      metricLabel: "saved / week"
    }
  ];

  // Integration ecosystem logos (beyond couriers) 
  const integrations = [
    { name: "Shopify Admin API", icon: Store },
    { name: "WhatsApp Business API", icon: MessageSquare },
    { name: "Multi-Courier Dispatch", icon: Truck },
    { name: "MongoDB Atlas", icon: Database },
    { name: "Google Sheets Export", icon: FileText },
    { name: "Webhook Relay", icon: Radio }
  ];

  // Trust/compliance badges for the security band 
  const trustBadges = [
    { label: "AES-256-CBC Encryption", icon: Lock },
    { label: "TLS 1.3 Transit Security", icon: ShieldCheck },
    { label: "Shopify GDPR Webhooks", icon: BadgeCheck },
    { label: "Tenant-Isolated Schemas", icon: Fingerprint }
  ];

  return (
    <div className="min-h-screen font-sans bg-background text-foreground selection:bg-primary selection:text-slate-950 transition-colors duration-300 overflow-x-hidden relative">

      {/* Interactive Mouse Cursor Spotlight Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${isDark ? "rgba(16, 185, 129, 0.08)" : "rgba(16, 185, 129, 0.05)"}, transparent 80%)`
        }}
      />

      {/* Ambient background light glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[150px] opacity-70" />
        <div className="absolute top-1/3 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] opacity-50" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[130px] opacity-40" />
      </div>

      {/* ==================================================================== */}
      {/* 1. FLOATING THEMED HEADER                                            */}
      {/* ==================================================================== */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: easeCurve }}
        className="sticky top-0 z-50 backdrop-blur-2xl border-b border-border/80 bg-background/85 transition-all duration-300 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo — Icon + Sliding Wordmark on Hover */}
          <Link href="/" className="flex items-center group shrink-0">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center gap-0"
            >
              {/* Icon Mark (always visible) */}
              <img
                src="/images/new-logo/icon/asan-icon-dark.svg"
                alt="AsanShipping"
                className="hidden dark:block h-11 sm:h-12 w-auto object-contain"
              />
              <img
                src="/images/new-logo/icon/asan-icon-light.svg"
                alt="AsanShipping"
                className="block dark:hidden h-11 sm:h-12 w-auto object-contain"
              />

              {/* Wordmark — slides in on hover */}
              <div className="overflow-hidden w-0 group-hover:w-36 sm:group-hover:w-40 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                <img
                  src="/images/new-logo/wordmark/asan-wordmark-dark.svg"
                  alt="AsanShipping"
                  className="hidden dark:block h-5 sm:h-6 w-36 sm:w-40 object-contain object-left ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150"
                />
                <img
                  src="/images/new-logo/wordmark/asan-wordmark-light.svg"
                  alt="AsanShipping"
                  className="block dark:hidden h-5 sm:h-6 w-36 sm:w-40 object-contain object-left ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150"
                />
              </div>
            </motion.div>
          </Link>

          {/* Centered Pill Nav Links — no container border, bigger buttons, dark visible text */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {[
              { href: "/", label: "Home" },
              { href: "#couriers", label: "Couriers" },
              { href: "#pricing", label: "Pricing" },
              { href: "/articles", label: "Articles" },
              { href: "#faq", label: "FAQ" }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Button Cluster */}
          <div className="flex items-center gap-2.5 shrink-0">
            <motion.button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl border border-border bg-card text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-foreground" />}
            </motion.button>

            <a
              href={loginUrl}
              className="hidden sm:inline-flex px-5 py-2.5 text-sm font-bold rounded-xl text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              Login
            </a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowConnectModal(true)}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer flex items-center gap-1.5 border border-primary-glow/30"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-border bg-card text-foreground cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: easeCurve }}
              className="lg:hidden border-t border-slate-200 dark:border-zinc-900 bg-white/95 dark:bg-black/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-xl"
            >
              {[
                { href: "/", label: "Home" },
                { href: "#couriers", label: "Couriers" },
                { href: "#pricing", label: "Pricing" },
                { href: "/articles", label: "Articles" },
                { href: "#faq", label: "FAQ" }
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-900 dark:text-white hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <a
                  href={loginUrl}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Login
                </a>
                <button
                  onClick={() => { setMobileMenuOpen(false); setShowConnectModal(true); }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-black bg-primary text-primary-foreground text-center"
                >
                  Start Free Trial
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ==================================================================== */}
      {/* 2. HERO SECTION WITH PROMINENT CENTERED SIMULATOR                    */}
      {/* ==================================================================== */}
      <section id="simulator" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Centered Top Narrative */}
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-6"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Animated Hero Logo — steals the show */}
            <motion.div
              className="flex justify-center pb-4"
              initial={{ opacity: 0, scale: 0.6, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
                scale: { type: "spring", damping: 12, stiffness: 100, delay: 0.3 }
              }}
            >
              {/* Floating container */}
              <motion.div
                className="relative"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                {/* Glow pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.8, 1.5, 1.8], opacity: [0, 0.6, 0] }}
                  transition={{ duration: 2, delay: 1.3, ease: "easeOut" }}
                />
                <img
                  src="/images/new-logo/stacked/asan-logo-stacked-dark.svg"
                  alt="Asan Shipping Logo"
                  className="hidden dark:block h-32 sm:h-40 md:h-48 w-auto object-contain relative z-10"
                />
                <img
                  src="/images/new-logo/stacked/asan-logo-stacked-light.svg"
                  alt="Asan Shipping Logo"
                  className="block dark:hidden h-32 sm:h-40 md:h-48 w-auto object-contain relative z-10"
                />
              </motion.div>
            </motion.div>

            {/* Pain -> Solution Headline (No absolute claims) */}
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.15]"
            >
              Stop Losing Money on COD Returns. <br />
              <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Cut RTO by 40% with WhatsApp &amp; IVR.
              </span>
            </motion.h1>

            {/* 5-Second Concrete Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto text-muted-foreground"
            >
              Connect your Shopify store in 3 minutes. Automate interactive WhatsApp order verification, detect fake addresses before booking, and auto-dispatch parcels to the cheapest Pakistani courier (TCS, Leopards, Trax, PostEx, M&amp;P).
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Magnetic strength={10}>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowConnectModal(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base shadow-xl shadow-primary/25 transition-all duration-200 flex items-center justify-center gap-2 group border border-primary-glow/40 cursor-pointer"
                >
                  <span>Connect Shopify Store (Free Trial)</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Magnetic>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowDemoModal(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-border bg-card text-foreground font-bold hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm text-sm"
              >
                <Play className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                <span>Watch 60s Demo</span>
              </motion.button>
            </motion.div>

            {/* Product-Specific Believable Stats Strip */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6"
            >
              {[
                { value: 40, suffix: "%", label: "RTO Reduction Rate" },
                { value: 89, suffix: "%", label: "WhatsApp Response Rate" },
                { value: 5, suffix: "", label: "Pakistani Couriers" },
                { value: 3, suffix: " min", label: "Setup Time on Shopify" }
              ].map((s) => (
                <motion.div key={s.label} variants={fadeUp} className="p-3.5 rounded-2xl bg-card/80 border border-border text-center shadow-sm">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-primary">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] font-semibold text-muted-foreground mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Interactive WhatsApp Confirmation Visual Card */}
            <motion.div variants={fadeUp} className="max-w-xl mx-auto pt-6">
              <div className="rounded-2xl border border-emerald-500/40 dark:border-emerald-500/30 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white p-4 shadow-2xl shadow-slate-200/60 dark:shadow-black/50 space-y-3 text-left relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                      💬
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        AsanShipping Bot <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 fill-emerald-500/20" />
                      </div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Live Interactive Demo</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">Just Now</span>
                </div>

                {/* WhatsApp Chat Message */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/90 border border-slate-200/80 dark:border-zinc-700/80 space-y-1.5 text-slate-800 dark:text-slate-200">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">Order Confirmation Request #1042 📦</div>
                    <div>Hi Ali! Thank you for ordering from <strong>UrbanThreads (Shopify)</strong>.</div>
                    <div className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                      • Total COD: <strong>PKR 3,850</strong><br />
                      • Address: House 42, St 5, F-7/2, Islamabad
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">Please confirm if you are available to receive this order.</div>
                  </div>

                  {/* Interactive Button Responses */}
                  <AnimatePresence mode="wait">
                    {heroWaState === "pending" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-2 pt-1">
                        <button
                          onClick={() => setHeroWaState("confirmed")}
                          className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>✅ Confirm Order</span>
                        </button>
                        <button
                          onClick={() => setHeroWaState("cancelled")}
                          className="flex-1 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/40 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>❌ Cancel Order</span>
                        </button>
                      </motion.div>
                    )}

                    {heroWaState === "confirmed" && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-300 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>Order #1042 Verified &amp; Confirmed!</span>
                        </div>
                        <div className="text-[11px] text-emerald-800 dark:text-emerald-200/90">
                          Auto-booked via <strong>TCS Express</strong> (Tracking #: TCS-98214) at PKR 185.
                        </div>
                        <button onClick={() => setHeroWaState("pending")} className="text-[10px] text-emerald-600 dark:text-emerald-400 underline pt-1 cursor-pointer font-bold">
                          Reset Demo
                        </button>
                      </motion.div>
                    )}

                    {heroWaState === "cancelled" && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 text-rose-900 dark:text-rose-300 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                          <span>Order #1042 Cancelled</span>
                        </div>
                        <div className="text-[11px] text-rose-800 dark:text-rose-200/90">
                          Shopify stock restored. Prevented courier booking — saved PKR 250 return fee!
                        </div>
                        <button onClick={() => setHeroWaState("pending")} className="text-[10px] text-rose-600 dark:text-rose-400 underline pt-1 cursor-pointer font-bold">
                          Reset Demo
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Trust Logos Banner */}
            <motion.div variants={fadeUp} className="pt-8 border-t border-slate-200/60 dark:border-zinc-800/80 mt-8">
              <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                Native Integrations &amp; Trusted Courier Networks in Pakistan
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-bold text-slate-600 dark:text-slate-300 opacity-80">
                <span className="flex items-center gap-1.5"><Store className="w-4 h-4 text-emerald-500" /> Shopify</span>
                <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4 text-emerald-500" /> WhatsApp Business</span>
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-emerald-500" /> TCS Express</span>
                <span className="flex items-center gap-1.5"><Package className="w-4 h-4 text-emerald-500" /> Leopards Courier</span>
                <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-emerald-500" /> Trax Logistics</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> PostEx</span>
                <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-emerald-500" /> M&amp;P</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ==================================================================== */}
          {/* ARCHITECTURE ECOSYSTEM GRID (NODES & EDGES FLOWCHART)                */}
          {/* ==================================================================== */}
          <ArchitectureEcosystemGrid />

          {/* ==================================================================== */}
          {/* VISUAL WORKFLOW: Order -> WhatsApp -> Confirm -> Courier -> Delivered */}
          {/* ==================================================================== */}
          <section id="how-it-works" className="py-12 sm:py-16 relative">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold font-mono">
                AUTOMATED 5-STEP PIPELINE
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
                How AsanShipping Cuts RTO in 5 Steps
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                From Shopify checkout to customer confirmation and cheapest courier booking in milliseconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative max-w-6xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Shopify Order Placed",
                  desc: "Custom App ingests COD orders via webhooks in < 1 sec.",
                  icon: Store,
                  color: "text-primary bg-primary/10 border-primary/20"
                },
                {
                  step: "02",
                  title: "WhatsApp Interactive Bot",
                  desc: "Sends interactive message with Confirm & Cancel buttons.",
                  icon: MessageSquare,
                  color: "text-primary bg-primary/10 border-primary/30"
                },
                {
                  step: "03",
                  title: "AI Address & Risk Check",
                  desc: "Screening algorithm flags fake addresses and blacklisted numbers.",
                  icon: ShieldAlert,
                  color: "text-primary bg-primary/10 border-primary/20"
                },
                {
                  step: "04",
                  title: "Smart Courier Dispatch",
                  desc: "Auto-routes order to cheapest rate: TCS, Trax, PostEx, Leopards.",
                  icon: Truck,
                  color: "text-primary bg-primary/10 border-primary/20"
                },
                {
                  step: "05",
                  title: "Delivered & Cash Settled",
                  desc: "Live status updates synced back to Shopify Admin.",
                  icon: PackageCheck,
                  color: "text-primary bg-primary/10 border-primary/20"
                }
              ].map((w) => (
                <div
                  key={w.step}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-md relative hover:border-primary/50 transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${w.color}`}>
                      <w.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                      STEP {w.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                      {w.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {w.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Expanded Prominent Centered Live Simulator Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeCurve }}
            className="max-w-5xl mx-auto"
          >
            <TiltCard className="rounded-3xl border border-slate-200/90 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl bg-white/95 dark:bg-zinc-950/95">

              {/* Simulator Header & Controls Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 dark:border-zinc-800 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <img src="/images/new-logo/icon/asan-icon-dark.svg" alt="AsanShipping" className="hidden dark:block h-8 w-auto object-contain" />
                  <img src="/images/new-logo/icon/asan-icon-light.svg" alt="AsanShipping" className="block dark:hidden h-8 w-auto object-contain" />
                  <div className="h-5 w-px bg-slate-300 dark:bg-zinc-700 hidden sm:block" />
                  <span className="text-xs font-mono font-black tracking-wider text-primary">
                    LIVE SIMULATOR CONTROL TOWER
                  </span>
                </div>

                {/* Pipeline Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin bg-slate-100 dark:bg-black p-1.5 rounded-xl border border-slate-200 dark:border-zinc-800">
                  {(["simulator", "whatsapp", "routing", "blacklist", "scrap"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${tab === t
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                        }`}
                    >
                      {t === "simulator" ? "1. Risk & AI Engine" : t === "whatsapp" ? "2. WhatsApp / IVR" : t === "routing" ? "3. Smart Dispatch" : t === "blacklist" ? "Blacklist Gate" : "Scrap Desk"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Simulation Quick Input Form Bar */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 mb-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100">
                    <Sliders className="w-3.5 h-3.5 text-primary" /> SIMULATION ORDER CONFIGURATOR
                  </span>
                  <span className="text-primary font-mono text-[11px]">INSTANT TEST RUNNER</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mb-1">CUSTOMER NAME</label>
                    <input
                      type="text"
                      value={simName}
                      onChange={(e) => setSimName(e.target.value)}
                      placeholder="Customer Name"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mb-1">DESTINATION CITY</label>
                    <select
                      value={simCity}
                      onChange={(e) => setSimCity(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary font-medium cursor-pointer"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Peshawar">Peshawar</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mb-1">COD AMOUNT (PKR)</label>
                    <input
                      type="number"
                      value={simAmount}
                      onChange={(e) => setSimAmount(Number(e.target.value))}
                      placeholder="COD PKR"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary font-mono font-medium"
                    />
                  </div>
                  <div className="flex items-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={runLiveSimulation}
                      className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer h-[38px]"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      Run AI Booking
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <AnimatePresence mode="wait">
                {/* SIMULATOR TAB */}
                {tab === "simulator" && (
                  <motion.div key="sim" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-4">
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 space-y-4">

                      {/* Active Simulation Summary Banner */}
                      <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-3">
                        <div>
                          <div className="font-bold text-base text-slate-900 dark:text-slate-100">{simName} ({simCity})</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Order #3094 · Shopify Custom App Intake</div>
                        </div>
                        <div className="text-right font-mono font-bold text-lg text-primary">
                          PKR {simAmount.toLocaleString("en-PK")} COD
                        </div>
                      </div>

                      {/* State Machine Step Pipeline Badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1">
                        {[
                          { s: "screening", label: "1. Risk Screening" },
                          { s: "whatsapp", label: "2. WhatsApp / IVR" },
                          { s: "confirmed", label: "3. Confirmed" },
                          { s: "booked", label: "4. Smart Dispatch" }
                        ].map((step, idx) => {
                          const active = simStatus === step.s || (simStatus === "booked" && idx <= 3) || (simStatus === "confirmed" && idx <= 2) || (simStatus === "whatsapp" && idx <= 1);
                          return (
                            <motion.div
                              key={step.s}
                              animate={active ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                              transition={{ duration: 0.4, ease: easeCurve }}
                              className={`py-2 px-2 rounded-xl text-xs font-bold text-center transition-colors ${active ? "bg-primary text-primary-foreground shadow-md" : "bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-400"
                                }`}
                            >
                              {step.label}
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Execution Details */}
                      {simStatus === "idle" && (
                        <div className="text-center py-4 text-sm text-slate-500 dark:text-slate-400">
                          Click <span className="text-primary font-bold">&ldquo;Run AI Booking&rdquo;</span> above to see real-time order verification &amp; courier dispatch.
                        </div>
                      )}

                      {simStatus === "screening" && (
                        <div className="flex items-center justify-center gap-2 text-primary font-mono py-4 text-sm">
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Screening {simName} against Global Blacklist DB...</span>
                        </div>
                      )}

                      {/* WhatsApp Interactive Card Popup */}
                      {simStatus === "whatsapp" && (
                        <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-4 rounded-xl bg-primary/10 border border-primary/40 space-y-3">
                          <div className="flex items-center justify-between text-primary font-bold text-sm">
                            <span className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4 text-primary" /> WhatsApp Quick-Reply Trigger
                            </span>
                            <span className="text-xs font-mono bg-primary/20 px-2 py-0.5 rounded">AUTO-SENT</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            &ldquo;Hi {simName}! Confirm your COD order #{Math.floor(Math.random() * 9000 + 1000)} for PKR {simAmount.toLocaleString("en-PK")} to {simCity}?&rdquo;
                          </p>
                          <div className="flex gap-3 pt-1">
                            <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
                              <CheckSquare className="w-4 h-4" /> [✅ Confirm Order]
                            </button>
                            <button className="flex-1 py-2 rounded-lg bg-destructive/10 text-destructive border border-destructive/30 font-bold text-xs flex items-center justify-center gap-1.5">
                              <XCircle className="w-4 h-4" /> [❌ Cancel Order]
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {simStatus === "confirmed" && (
                        <div className="flex items-center justify-center gap-2 text-primary font-mono font-bold py-3 text-sm">
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Buyer Clicked [✅ Confirm] — Order Tagged Verified COD!</span>
                        </div>
                      )}

                      {/* Final Dispatch State: Generated Waybill Shipping Label Card */}
                      {simStatus === "booked" && (
                        <motion.div
                          initial={{ scale: 0.94, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-primary/50 shadow-xl space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary text-primary-foreground">PostEx COD</span>
                              <span className="font-mono font-bold text-xs text-slate-900 dark:text-slate-100">CN: 9821401</span>
                            </div>
                            <span className="text-[10px] font-mono text-primary font-bold">PDF WAYBILL READY</span>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                            <div className="space-y-0.5">
                              <div className="font-bold text-slate-900 dark:text-slate-100">Consignee: {simName}</div>
                              <div className="text-slate-500 dark:text-slate-400">Destination: {simCity}, Pakistan</div>
                              <div className="font-mono text-primary font-semibold">COD Amount: PKR {simAmount.toLocaleString("en-PK")}</div>
                            </div>
                            <div className="text-center font-mono text-[10px] tracking-widest bg-slate-100 dark:bg-black p-2 rounded-lg border border-slate-200 dark:border-zinc-800">
                              <div className="text-base tracking-[3px] font-bold text-slate-900 dark:text-slate-100">||| | |||| || |</div>
                              <div className="text-slate-500">PK-KHI-LHE-9821401</div>
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end">
                            <button
                              onClick={() => setShowWaybillModal(true)}
                              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                            >
                              <Printer className="w-4 h-4" /> Print Waybill (Mock PDF)
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* WHATSAPP & IVR TAB */}
                {tab === "whatsapp" && (
                  <motion.div key="wa" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-3 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 space-y-3">
                      <div className="font-bold flex items-center justify-between">
                        <span className="flex items-center gap-2 text-primary text-sm">
                          <MessageSquare className="w-4 h-4" /> Dual Verification Pipeline
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Channel Fallback Active</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                          <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">Channel 1: WhatsApp Quick-Reply</div>
                          <div className="text-slate-600 dark:text-slate-400">Sends interactive button message immediately on Shopify checkout.</div>
                        </div>
                        <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                          <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">Channel 2: Voice IVR Call</div>
                          <div className="text-slate-600 dark:text-slate-400">Auto-dials customer if WhatsApp is unread after 10 minutes.</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ROUTING TAB */}
                {tab === "routing" && (
                  <motion.div key="rt" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-3 text-xs">
                    {[
                      { route: "Karachi → Lahore", weight: "0.5kg COD", best: "PostEx Economy (PKR 140)", score: "96.2% Success Rate", badge: "RECOMMENDED", bg: "bg-primary/20 text-primary" },
                      { route: "Rawalpindi → Peshawar", weight: "1.0kg Express", best: "TCS Express (PKR 210)", score: "98.5% Success Rate", badge: "FASTEST", bg: "bg-primary/20 text-primary" },
                      { route: "Faisalabad → Multan", weight: "2.5kg Heavy", best: "Trax Logistics (PKR 280)", score: "94.8% Success Rate", badge: "BEST TARIFF", bg: "bg-primary/20 text-primary" }
                    ].map((r, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 flex justify-between items-center">
                        <div>
                          <div className="font-bold flex items-center gap-1.5 text-sm text-slate-900 dark:text-slate-100">
                            {r.route} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">({r.weight})</span>
                          </div>
                          <div className="text-xs text-primary font-mono mt-0.5">{r.best}</div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.bg}`}>{r.badge}</span>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{r.score}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* BLACKLIST TAB */}
                {tab === "blacklist" && (
                  <motion.div key="bl" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-3 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 space-y-3">
                      <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">Global Customer Fraud Screening</div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={testPhone}
                          onChange={(e) => setTestPhone(e.target.value)}
                          placeholder="Enter Mobile Number"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:border-primary"
                        />
                        <button
                          onClick={checkBlacklist}
                          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all cursor-pointer"
                        >
                          Screen Number
                        </button>
                      </div>

                      {blacklistResult && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3, ease: easeCurve }}
                          className={`p-3 rounded-xl border mt-2 flex justify-between items-center ${blacklistResult.risk === "SAFE_VERIFIED"
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "bg-destructive/10 border-destructive/30 text-destructive"
                            }`}
                        >
                          <div>
                            <div className="font-bold text-sm">{blacklistResult.risk === "SAFE_VERIFIED" ? "✓ Verified Safe Buyer" : "⚠ High Risk (Blacklisted)"}</div>
                            <div className="text-xs opacity-80">Previous Returns Across Merchants: {blacklistResult.returns}</div>
                          </div>
                          <div className="text-right font-mono font-bold text-base">
                            Score: {blacklistResult.score}/100
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* SCRAP DESK TAB */}
                {tab === "scrap" && (
                  <motion.div key="sc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-3 text-xs">
                    {[
                      { bc: "890123456789", item: "Lawn Stitched Dress 3-Piece", status: "RESTOCKABLE", tag: "Shopify Stock +1", c: "bg-primary/20 text-primary" },
                      { bc: "890987654321", item: "Leather Wallet (Torn Box)", status: "DAMAGED_SCRAP", tag: "Scrap Ledger Logged", c: "bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-slate-300" }
                    ].map((x, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-sm text-slate-900 dark:text-slate-100">Barcode: {x.bc}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{x.item}</div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded font-bold ${x.c}`}>{x.status}</span>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{x.tag}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </TiltCard>
          </motion.div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. COURIER TRUST RIBBON (INFINITE MARQUEE)                           */}
      {/* ==================================================================== */}
      <section id="couriers" className="py-8 border-y border-slate-200 dark:border-zinc-900 bg-white/60 dark:bg-black backdrop-blur-md overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Direct API Integration with Pakistan's Leading Couriers
          </p>
        </div>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-12 whitespace-nowrap w-max py-2"
        >
          {[...Array(2)].map((_, pass) => (
            <React.Fragment key={pass}>
              {[
                { name: "TCS Express", code: "TCS", ping: "22ms" },
                { name: "Leopards Courier", code: "LEOPARDS", ping: "29ms" },
                { name: "Trax Logistics", code: "TRAX", ping: "18ms" },
                { name: "PostEx COD", code: "POSTEX", ping: "14ms" },
                { name: "M&P Courier", code: "M&P", ping: "26ms" }
              ].map((c) => (
                <div key={`${pass}-${c.code}`} className="flex items-center gap-2 font-display text-sm">
                  <span className="font-extrabold text-slate-900 dark:text-white tracking-tight">{c.name}</span>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium">({c.ping})</span>
                  <span className="text-slate-300 dark:text-zinc-800 mx-3 select-none">&bull;</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </section>

      {/* ==================================================================== */}
      {/* 3B. PROBLEM STATEMENT — THE COD CRISIS                               */}
      {/* ==================================================================== */}
      <section className="py-24 border-b border-slate-200 dark:border-zinc-900 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal variants={fadeLeft}>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                Pakistan's Cash-on-Delivery Problem Is Bigger Than Most Founders Realize
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                Every unverified order that bounces back costs you twice: once on the outbound courier fee, and again on the return trip &mdash; while your capital sits locked in unsellable inventory for days. Most Shopify merchants in Pakistan absorb this loss silently because there's no automated way to catch it before the parcel leaves the warehouse.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { icon: PackageX, text: "Fake or joke orders placed with no purchase intent" },
                  { icon: PhoneCall, text: "Unreachable or incorrect phone numbers at checkout" },
                  { icon: Wallet, text: "Capital blocked in COD parcels awaiting delivery confirmation" },
                  { icon: Truck, text: "Manual courier selection that ignores real delivery-success data" }
                ].map((item, i) => (
                  <ScrollReveal key={item.text} delay={i * 0.06} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300 pt-1.5">{item.text}</span>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal variants={fadeRight} className="relative">
              <TiltCard className="rounded-3xl border border-slate-200 dark:border-zinc-800 p-8 bg-zinc-950 text-slate-100 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Industry RTO Snapshot</span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Pakistan D2C</span>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <div className="text-4xl font-display font-black text-white">
                      <CountUp value={30} suffix="%+" />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Average COD Return Rate Across Pakistani D2C Brands</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-black text-white">
                      <CountUp value={250} prefix="PKR " />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Avg Dead Freight Cost Per Returned Parcel</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-black text-white">
                      <CountUp value={4} suffix="-7" />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Days Capital Stays Blocked Per Bounced Parcel</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-black text-primary">
                      <CountUp value={35} suffix="%" />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Typical RTO Reduction With Order Verification</div>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-zinc-800 text-[11px] text-slate-500 font-mono">
                  Illustrative figures based on aggregated merchant patterns &middot; Actual results vary by category &amp; city mix
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. FEATURE BENTO GRID ARCHITECTURE (4-CARD LAYOUT)                   */}
      {/* ==================================================================== */}
      <section id="features" className="py-24 border-b border-slate-200 dark:border-zinc-900 bg-slate-100/60 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-slate-100">
              Engineered to Protect Pakistani E-Commerce Margins
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Every module is purpose-built to solve last-mile COD losses, courier delays, and warehouse scrap tracking.
            </p>
          </ScrollReveal>

          {/* 4-Card Bento Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Bento 1: Multi-Channel Verification (WhatsApp + IVR) */}
            <ScrollReveal delay={0}>
              <TiltCard className="rounded-2xl border border-slate-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 shadow-sm h-full">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 12 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6"
                >
                  <MessageSquare className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">Multi-Channel Verification (WhatsApp + Voice IVR)</h3>
                <p className="text-sm leading-relaxed mb-5 text-slate-600 dark:text-slate-400">
                  Sends interactive WhatsApp quick-reply buttons (<code className="text-primary font-bold">[✅ Confirm]</code> / <code className="text-destructive font-bold">[❌ Cancel]</code>) instantly upon checkout. Automatically falls back to automated Voice IVR phone calls if unread after 10 minutes.
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  <span>Interactive Buttons</span>
                  <span className="text-slate-300 dark:text-zinc-700 select-none">&bull;</span>
                  <span>IVR Voice Fallback</span>
                  <span className="text-slate-300 dark:text-zinc-700 select-none">&bull;</span>
                  <span>Zero Merchant Effort</span>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Bento 2: AI Tariff & Smart Courier Engine */}
            <ScrollReveal delay={0.06}>
              <TiltCard className="rounded-2xl border border-slate-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 shadow-sm h-full">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 12 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6"
                >
                  <Cpu className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">AI Tariff &amp; Smart Courier Engine</h3>
                <p className="text-sm leading-relaxed mb-5 text-slate-600 dark:text-slate-400">
                  Evaluates 14-day historical delivery success data, parcel weight tiers, and live fuel tariffs across TCS, Trax, Leopards, PostEx, and M&amp;P to auto-select the cheapest and statistically most reliable carrier.
                </p>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 text-center">
                    <div className="text-slate-500 dark:text-slate-400">PostEx</div>
                    <div className="text-primary font-bold mt-0.5">PKR 140</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 text-center">
                    <div className="text-slate-500 dark:text-slate-400">TCS</div>
                    <div className="text-foreground font-bold mt-0.5">PKR 210</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 text-center">
                    <div className="text-slate-500 dark:text-slate-400">Trax</div>
                    <div className="text-foreground font-bold mt-0.5">PKR 280</div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Bento 3: Shared Risk Gate & Blacklist */}
            <ScrollReveal delay={0.12}>
              <TiltCard className="rounded-2xl border border-slate-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 shadow-sm h-full">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 12 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6"
                >
                  <ShieldAlert className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">Shared Risk Gate &amp; Blacklist</h3>
                <p className="text-sm leading-relaxed mb-5 text-slate-600 dark:text-slate-400">
                  Screens phone numbers against shared merchant return history. Flags serial rejectors and fake contact numbers with an instant risk score before shipping labels are generated.
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  <span>Global Phone Blacklist</span>
                  <span className="text-slate-300 dark:text-zinc-700 select-none">&bull;</span>
                  <span>Real-time Risk Scoring</span>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Bento 4: Reverse Logistics & Digital Scrap Desk */}
            <ScrollReveal delay={0.18}>
              <TiltCard className="rounded-2xl border border-slate-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 shadow-sm h-full">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 12 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6"
                >
                  <ScanBarcode className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">Reverse Logistics &amp; Digital Scrap Desk</h3>
                <p className="text-sm leading-relaxed mb-5 text-slate-600 dark:text-slate-400">
                  Eliminates warehouse return chaos. Warehouse staff scan returned barcodes upon arrival, classify items as Restockable or Damaged Scrap, auto-updating Shopify inventory and tracking financial waste.
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  <span>Barcode Scanning</span>
                  <span className="text-slate-300 dark:text-zinc-700 select-none">&bull;</span>
                  <span>Scrap Ledger</span>
                  <span className="text-slate-300 dark:text-zinc-700 select-none">&bull;</span>
                  <span>Shopify Auto-Restock</span>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>

          {/* Secondary Feature Row — 3 Smaller Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              { icon: Bell, title: "Real-Time Order Alerts", body: "Instant Slack &amp; email pings for high-risk orders, courier API downtime, or WhatsApp confirmation failures.", color: "text-primary bg-primary/10 border-primary/20" },
              { icon: LineChart, title: "Merchant Analytics Dashboard", body: "Track RTO trend lines, courier-by-courier success rates, and city-level delivery heatmaps in one Polaris-native view.", color: "text-primary bg-primary/10 border-primary/20" },
              { icon: Workflow, title: "Custom Rule Builder", body: "Define your own auto-approve thresholds &mdash; e.g. skip WhatsApp for repeat verified buyers under a set order value.", color: "text-primary bg-primary/10 border-primary/30" }
            ].map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.08}>
                <TiltCard className="rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 shadow-sm h-full">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${f.color}`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold mb-1.5 text-slate-900 dark:text-slate-100">{f.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400" dangerouslySetInnerHTML={{ __html: f.body }} />
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. NATIVE SHOPIFY EMBEDDED APP SHOWCASE SECTION                      */}
      {/* ==================================================================== */}
      <section id="shopify-embedded" className="py-24 border-b border-slate-200 dark:border-zinc-900 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-slate-100">
              Native Shopify Admin Integration
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Manage your entire logistics pipeline without ever leaving your Shopify admin panel.
            </p>
          </ScrollReveal>

          {/* Shopify Admin Iframe Preview Window Mockup */}
          <ScrollReveal variants={scaleIn} className="max-w-5xl mx-auto rounded-2xl border border-slate-300 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-950 overflow-hidden">
            {/* Shopify Admin Top Header Bar */}
            <div className="bg-zinc-900 text-slate-200 px-4 py-3 flex items-center justify-between border-b border-zinc-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-[10px] text-zinc-400 font-mono">WINDOWS EMBEDDED</div>
                <span className="text-slate-400 ml-2">admin.shopify.com/store/your-brand/apps/asan-shipping</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-bold">
                EMBEDDED POLARIS MODE
              </div>
            </div>

            {/* Embedded App Canvas */}
            <div className="p-6 sm:p-8 bg-zinc-950 text-slate-100 space-y-6">
              {/* Polaris Header Card */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div>
                  <div className="flex items-center gap-2 text-lg font-bold">
                    <span>AsanShipping Control Tower</span>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-primary uppercase">SHOPIFY CUSTOM APP</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Store Domain: your-store.myshopify.com · Webhook Status: Active (0ms Latency)</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowConnectModal(true)} className="px-3 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-glow transition-all cursor-pointer">
                    Sync Catalog Now
                  </button>
                  <button onClick={() => setShowConnectModal(true)} className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-slate-200 font-semibold text-xs transition-all cursor-pointer">
                    Sync Orders Now
                  </button>
                </div>
              </div>

              {/* Embedded Metrics Grid */}
              <div className="grid sm:grid-cols-4 gap-4">
                {[
                  { label: "Synced Shopify Orders", value: "1,240", sub: "30-Day Volume" },
                  { label: "WhatsApp Confirmations", value: "89.2%", sub: "Quick Reply Rate" },
                  { label: "Couriers Active", value: "5 Networks", sub: "TCS, Trax, PostEx, Leopards, M&P" },
                  { label: "Net Saved Freight", value: "PKR 142,500", sub: "RTO Penalty Avoided" }
                ].map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: easeCurve }}
                    className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800"
                  >
                    <div className="text-[11px] text-slate-400">{m.label}</div>
                    <div className="text-xl font-bold text-primary mt-1 font-mono">{m.value}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{m.sub}</div>
                  </motion.div>
                ))}
              </div>

              {/* Mini Activity Feed */}
              <div className="rounded-xl bg-zinc-900/70 border border-zinc-800 p-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-primary" /> Recent Webhook Activity
                </div>
                <div className="space-y-2.5">
                  {[
                    { icon: CheckCircle2, text: "Order #3092 confirmed via WhatsApp — dispatched to PostEx", time: "12s ago", c: "text-primary" },
                    { icon: PhoneCall, text: "Order #3089 fell back to IVR call — awaiting response", time: "1m ago", c: "text-primary" },
                    { icon: ShieldAlert, text: "Order #3084 flagged HIGH_RISK — held for manual review", time: "3m ago", c: "text-primary" },
                    { icon: ScanBarcode, text: "Return scan logged — item RESTOCKABLE, Shopify stock +1", time: "6m ago", c: "text-primary" }
                  ].map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.08 }}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="flex items-center gap-2 text-slate-300">
                        <a.icon className={`w-3.5 h-3.5 shrink-0 ${a.c}`} />
                        {a.text}
                      </span>
                      <span className="text-slate-500 font-mono text-[10px] shrink-0 ml-3">{a.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. INTERACTIVE DYNAMIC ROI CALCULATOR & GRAPH                         */}
      {/* ==================================================================== */}
      <section id="calculator" className="py-24 border-b border-slate-200 dark:border-zinc-900 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-slate-100">
              Calculate Your Recoverable COD Revenue
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Drag the sliders below to see how your delivery volume and RTO rate update your annual recovered profit graph in real time.
            </p>

            {/* Presets */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[
                { label: "Boutique Store (400 orders/mo)", o: 400, a: 2800, r: 35 },
                { label: "Growing Brand (1,500 orders/mo)", o: 1500, a: 3800, r: 32 },
                { label: "Scale D2C (5,000 orders/mo)", o: 5000, a: 4500, r: 28 }
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => { setOrders(p.o); setAov(p.a); setRto(p.r); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-slate-100 hover:border-primary transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Calculator Layout */}
          <ScrollReveal variants={scaleIn} className="max-w-5xl mx-auto rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 sm:p-10 shadow-xl bg-white dark:bg-zinc-950 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              {[
                { label: "Average Monthly Orders", value: orders, min: 100, max: 10000, step: 100, set: setOrders, display: `${orders.toLocaleString("en-PK")} Orders`, red: false, ticks: ["100", "5,000", "10,000"] },
                { label: "Average Order Value (AOV)", value: aov, min: 1000, max: 15000, step: 250, set: setAov, display: `PKR ${aov.toLocaleString("en-PK")}`, red: false, ticks: ["PKR 1,000", "PKR 7,500", "PKR 15,000"] },
                { label: "Current Return-to-Origin (RTO) Rate", value: rto, min: 10, max: 50, step: 1, set: setRto, display: `${rto}%`, red: true, ticks: ["10% (Low)", "32% (Avg)", "50% (High)"] }
              ].map((s) => (
                <div key={s.label} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium text-slate-900 dark:text-slate-100">
                    <span>{s.label}</span>
                    <span className="font-bold text-base text-primary font-mono">{s.display}</span>
                  </div>
                  <input
                    type="range" min={s.min} max={s.max} step={s.step} value={s.value}
                    onChange={(e) => s.set(Number(e.target.value))}
                    className={`w-full h-2.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary`}
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {s.ticks.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </div>
              ))}

              {/* Dynamic Recharts Visualization with Saved Deliveries Tooltip */}
              <div className="h-44 w-full rounded-xl p-3 border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1 flex justify-between">
                  <span>Dynamic Delivered vs RTO Forecast</span>
                  <span className="text-primary font-mono">{orders} Monthly Pipeline</span>
                </div>
                <ResponsiveContainer width="100%" height="82%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="roiDg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="#64748B" fontSize={10} />
                    <YAxis stroke="#64748B" fontSize={10} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", color: "hsl(var(--card-foreground))", borderRadius: "8px", fontSize: "11px" }}
                      formatter={(value: any, name: any) => [
                        `${value} Parcels`,
                        name === "delivered" ? "Delivered Orders" : name === "rto" ? "RTO Parcels" : "Projected Saved Deliveries"
                      ]}
                    />
                    <Area type="monotone" dataKey="delivered" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#roiDg)" name="delivered" />
                    <Area type="monotone" dataKey="savedDeliveries" stroke="hsl(var(--primary) / 0.5)" strokeWidth={1.5} strokeDasharray="3 3" fill="transparent" name="savedDeliveries" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* High-Contrast Financial Recovery Output */}
            <div className="lg:col-span-5 rounded-2xl p-6 border border-zinc-800 bg-zinc-900 text-slate-100 flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Financial Recovery Breakdown</div>
                <div className="space-y-2.5 border-b border-slate-800 pb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Lost Return Freight (PKR 250/parcel):</span>
                    <span className="font-mono font-bold text-destructive">PKR {lostShipping.toLocaleString("en-PK")}/mo</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Blocked COD Capital:</span>
                    <span className="font-mono font-bold text-foreground">PKR {blockedCash.toLocaleString("en-PK")}/mo</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400">Recovered Annual Profit (PKR):</span>
                  <motion.div
                    key={annualRecovered}
                    initial={{ scale: 1.08, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-3xl sm:text-4xl font-display font-extrabold text-primary tracking-tight mt-1"
                  >
                    PKR {annualRecovered.toLocaleString("en-PK")}
                  </motion.div>
                  <p className="text-[11px] text-slate-400 mt-1.5">*Calculated from 35% RTO reduction via WhatsApp + IVR auto-verification.</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowConnectModal(true)}
                className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-center text-sm transition-all shadow-glow block cursor-pointer"
              >
                Recover This Profit Now
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. 4-STEP HOW IT WORKS PROCESS                                       */}
      {/* ==================================================================== */}
      <section id="how-it-works" className="py-24 relative bg-white dark:bg-black border-b border-slate-200 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-slate-100">How AsanShipping Works</h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Four seamless steps to protect your order pipeline from checkout to final delivery.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Connect Shopify", body: "Paste your Shopify myshopify URL and Admin Access Token. Zero store downtime." },
              { num: "02", title: "WhatsApp & Risk Gate", body: "Orders undergo automated WhatsApp quick-replies and blacklist risk scoring instantly." },
              { num: "03", title: "Smart Dispatch", body: "Auto-dispatched to the courier offering the best tariff and highest city delivery score." },
              { num: "04", title: "Scrap & Restock", body: "Returned parcels are scanned at the warehouse desk, updating stock & logging scrap." }
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1} className="relative">
                <TiltCard className="rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 flex flex-col justify-between bg-white dark:bg-zinc-950 shadow-sm h-full">
                  <div>
                    <div className="text-3xl font-black text-black dark:text-white font-mono mb-4">{step.num}</div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">{step.title}</h3>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{step.body}</p>
                  </div>
                </TiltCard>
                {/* Connector arrow between steps on desktop */}
                {i < 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-primary text-primary-foreground items-center justify-center shadow-md"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </motion.div>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7B. SECURITY & TRUST BAND                                            */}
      {/* ==================================================================== */}
      <section className="py-16 border-y border-slate-200 dark:border-zinc-900 bg-slate-100/60 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <ScrollReveal variants={fadeLeft} className="text-center lg:text-left max-w-md">
              <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-slate-100">Your Store &amp; Customer Data Never Leaves Encrypted Custody</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Every API token, phone number, and order record is protected the same way from ingestion to storage.</p>
            </ScrollReveal>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 gap-4 w-full lg:w-auto"
            >
              {trustBadges.map((b) => (
                <motion.div
                  key={b.label}
                  variants={scaleIn}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm min-w-[210px]"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <b.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{b.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7C. INTEGRATIONS ECOSYSTEM STRIP                                     */}
      {/* ==================================================================== */}
      <section className="py-20 bg-white dark:bg-black border-b border-slate-200 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-slate-100">Plugs Into the Tools You Already Run On</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">No middleware, no manual CSV exports — everything talks to everything.</p>
          </ScrollReveal>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {integrations.map((it) => (
              <motion.div
                key={it.name}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.03 }}
                className="flex flex-col items-center justify-center gap-2.5 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <it.icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">{it.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7D. TESTIMONIALS SECTION                                             */}
      {/* ==================================================================== */}
      <section id="testimonials" className="py-24 bg-slate-100/60 dark:bg-black border-b border-slate-200 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-slate-100">Trusted by Growing Pakistani D2C Brands</h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">Illustrative merchant scenarios showing the kind of impact the platform is designed to deliver.</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <TiltCard className="rounded-2xl border border-slate-200 dark:border-zinc-800 p-7 bg-white dark:bg-zinc-950 shadow-sm h-full flex flex-col justify-between">
                  <div>
                    <Quote className="w-7 h-7 text-primary/40 mb-4" />
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${t.avatarBg}`}>
                        {t.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{t.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{t.role}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-mono font-extrabold text-sm text-primary">{t.metric}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.metricLabel}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. TRANSPARENT PRICING MATRIX                                       */}
      {/* ==================================================================== */}
      <section id="pricing" className="py-24 border-t border-slate-200 dark:border-zinc-900 bg-slate-100/60 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-slate-100">Simple, Predictable Pricing</h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">No hidden courier booking surcharges. Scale as your order volume grows.</p>

            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-medium ${!annual ? "font-bold text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                aria-label="Toggle Billing"
                className="w-14 h-8 rounded-full bg-slate-200 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 p-1 flex items-center relative cursor-pointer"
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-6 h-6 rounded-full bg-primary"
                  style={{ marginLeft: annual ? "auto" : 0 }}
                />
              </button>
              <span className={`text-sm font-medium flex items-center gap-1.5 ${annual ? "font-bold text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}`}>
                Annual <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30">Save 20%</span>
              </span>
            </div>
          </ScrollReveal>

          {isPackagesLoading ? (
            <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-slate-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 animate-pulse h-96 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="h-6 bg-slate-200 dark:bg-zinc-800 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-100 dark:bg-zinc-900 rounded w-3/4"></div>
                    <div className="h-10 bg-slate-200 dark:bg-zinc-800 rounded w-1/3"></div>
                  </div>
                  <div className="h-12 bg-slate-200 dark:bg-zinc-800 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : activePackages.length === 1 ? (
            /* Single Active Package Layout: Blurred side tiles with active package centered */
            <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
              {/* Blurred Left Side Tile */}
              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-zinc-800/80 p-8 flex flex-col justify-between bg-slate-100/40 dark:bg-zinc-950/30 blur-[2px] opacity-35 select-none pointer-events-none scale-95 transition-all h-full">
                <div>
                  <div className="h-6 w-28 bg-slate-300 dark:bg-zinc-800 rounded mb-2"></div>
                  <div className="h-3 w-40 bg-slate-200 dark:bg-zinc-900 rounded mb-6"></div>
                  <div className="my-6">
                    <div className="h-9 w-24 bg-slate-300 dark:bg-zinc-800 rounded"></div>
                  </div>
                  <ul className="space-y-3 text-xs mb-8">
                    {["Standard Verification", "Manual CSV Import", "Courier Tracking"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-slate-400">
                        <Check className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full py-3 rounded-xl border border-slate-300 dark:border-zinc-800 text-slate-400 text-xs font-bold text-center">
                  Starter Tier
                </div>
              </div>

              {/* Centered Active Package Tile */}
              {(() => {
                const pkg = activePackages[0];
                const isFree = pkg.monthlyPrice === 0;
                const monthlyPriceDisplay = isFree ? "Free" : `${pkg.monthlyPrice.toLocaleString()} PKR`;
                const annualMonthlyEquivalent = Math.round(
                  pkg.yearlyPrice ? pkg.yearlyPrice / 12 : pkg.monthlyPrice * 0.8
                );
                const priceDisplay = isFree
                  ? "Free"
                  : annual
                    ? `${annualMonthlyEquivalent.toLocaleString()} PKR`
                    : monthlyPriceDisplay;

                return (
                  <ScrollReveal key={pkg._id || "center-pkg"} delay={0.1} className="h-full">
                    <TiltCard className="rounded-2xl p-8 flex flex-col justify-between relative shadow-2xl h-full bg-white dark:bg-zinc-950 border-2 border-primary scale-[1.03] transition-all">
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-primary text-primary-foreground font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                        {pkg.badgeText || "Active Plan"}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 text-center">{pkg.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center min-h-[32px]">
                          {pkg.tagline || "Subscription plan for AsanShipping."}
                        </p>
                        <div className="my-6 text-center">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={annual ? "a" : "m"}
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.2 }}
                              className="text-4xl font-black block text-slate-900 dark:text-slate-100"
                            >
                              {priceDisplay}
                            </motion.span>
                          </AnimatePresence>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {isFree ? "/ 14 Days" : annual ? "/ month (billed annually)" : "/ month"}
                          </span>
                        </div>

                        <ul className="space-y-3 text-xs mb-8">
                          {(pkg.features || []).map((f: string) => (
                            <li key={f} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                              <Check className="w-4 h-4 text-primary shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => setShowConnectModal(true)}
                        className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-center block transition-all cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                      >
                        {isFree ? "Start Free Trial" : "Get Started"}
                      </button>
                    </TiltCard>
                  </ScrollReveal>
                );
              })()}

              {/* Blurred Right Side Tile */}
              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-zinc-800/80 p-8 flex flex-col justify-between bg-slate-100/40 dark:bg-zinc-950/30 blur-[2px] opacity-35 select-none pointer-events-none scale-95 transition-all h-full">
                <div>
                  <div className="h-6 w-28 bg-slate-300 dark:bg-zinc-800 rounded mb-2"></div>
                  <div className="h-3 w-40 bg-slate-200 dark:bg-zinc-900 rounded mb-6"></div>
                  <div className="my-6">
                    <div className="h-9 w-24 bg-slate-300 dark:bg-zinc-800 rounded"></div>
                  </div>
                  <ul className="space-y-3 text-xs mb-8">
                    {["Custom SLA Routing", "Dedicated Manager", "Volume Tariff Discount"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-slate-400">
                        <Check className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full py-3 rounded-xl border border-slate-300 dark:border-zinc-800 text-slate-400 text-xs font-bold text-center">
                  Enterprise SLA
                </div>
              </div>
            </div>
          ) : (
            <div className={cn("grid gap-8 items-stretch mx-auto", activePackages.length === 2 ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-3 max-w-6xl")}>
              {activePackages.map((pkg: any, idx: number) => {
                const isFree = pkg.monthlyPrice === 0;
                const monthlyPriceDisplay = isFree
                  ? "Free"
                  : `${pkg.monthlyPrice.toLocaleString()} PKR`;

                const annualMonthlyEquivalent = Math.round(
                  pkg.yearlyPrice ? pkg.yearlyPrice / 12 : pkg.monthlyPrice * 0.8
                );

                const priceDisplay = isFree
                  ? "Free"
                  : annual
                    ? `${annualMonthlyEquivalent.toLocaleString()} PKR`
                    : monthlyPriceDisplay;

                const isPopular = pkg.isPopular;

                return (
                  <ScrollReveal key={pkg._id || idx} delay={idx * 0.1}>
                    <TiltCard
                      className={`rounded-2xl p-8 flex flex-col justify-between relative shadow-sm h-full bg-white dark:bg-zinc-950 transition-all ${isPopular
                        ? "border-2 border-primary shadow-2xl scale-[1.02]"
                        : "border border-slate-200 dark:border-zinc-800"
                        }`}
                    >
                      {(isPopular || pkg.badgeText) && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground font-extrabold text-[10px] uppercase tracking-wider">
                          {pkg.badgeText || "Most Popular"}
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{pkg.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                          {pkg.tagline || "Subscription plan for AsanShipping."}
                        </p>
                        <div className="my-6">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={annual ? "a" : "m"}
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.2 }}
                              className="text-4xl font-black block text-slate-900 dark:text-slate-100"
                            >
                              {priceDisplay}
                            </motion.span>
                          </AnimatePresence>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {isFree ? "/ 14 Days" : annual ? "/ month (billed annually)" : "/ month"}
                          </span>
                        </div>

                        <ul className="space-y-3 text-xs mb-8">
                          {(pkg.features || []).map((f: string) => (
                            <li key={f} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                              <Check className="w-4 h-4 text-primary shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => setShowConnectModal(true)}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-xs text-center block transition-all cursor-pointer ${isPopular
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                          : "border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-black hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-900 dark:text-slate-100"
                          }`}
                      >
                        {isFree ? "Start Free Trial" : isPopular ? "Get Started" : "Select Plan"}
                      </button>
                    </TiltCard>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {/* Enterprise callout strip */}
          <ScrollReveal delay={0.3} className="max-w-6xl mx-auto mt-6">
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-zinc-950 text-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 hidden sm:flex">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-base">Running multiple stores or 10,000+ monthly orders?</div>
                  <div className="text-xs text-slate-400 mt-0.5">Custom SLAs, dedicated onboarding, and volume-based courier tariffs for multi-store operators.</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowConnectModal(true)}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                Talk to Us <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 9. SEARCHABLE FAQ SECTION                                            */}
      {/* ==================================================================== */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">Everything you need to know about setting up AsanShipping for your store.</p>

          {/* Search Input */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search questions (e.g. WhatsApp, IVR, Shopify, Couriers)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-primary"
            />
          </div>
        </ScrollReveal>

        <motion.div layout className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((item, idx) => (
              <motion.div
                layout
                key={item.q}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  aria-expanded={faqOpen === idx}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                      {item.category}
                    </span>
                    <span className="font-bold text-base text-slate-900 dark:text-slate-100">{item.q}</span>
                  </div>
                  <motion.div animate={{ rotate: faqOpen === idx ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                    <ChevronDown className={`w-5 h-5 transition-colors ${faqOpen === idx ? "text-primary" : "text-slate-400"}`} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === idx && (
                    <motion.div key="c" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: easeCurve }} className="overflow-hidden">
                      <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800 pt-3">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredFaqs.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 text-sm text-slate-500 dark:text-slate-400">
              No questions match &ldquo;{faqSearch}&rdquo; — try a different keyword like &ldquo;courier&rdquo; or &ldquo;security&rdquo;.
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ==================================================================== */}
      {/* 9B. FINAL CONVERSION CTA BAND                                        */}
      {/* ==================================================================== */}
      <section className="py-20 border-t border-slate-200 dark:border-zinc-900 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variants={scaleIn}>
            <div className="relative rounded-3xl overflow-hidden border border-primary/30 bg-zinc-950 text-slate-100 p-10 sm:p-14 text-center shadow-2xl">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
              <div className="relative z-10 space-y-5">
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
                  Stop Losing Margin to <span className="text-primary">Returned Parcels</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
                  Connect your Shopify store today and let automated WhatsApp verification, smart courier routing, and blacklist screening start protecting your COD revenue from the very next order.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setShowConnectModal(true)}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-base shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Connect Shopify Store (Free) <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <button
                    onClick={() => setShowVisionModal(true)}
                    className="w-full sm:w-auto px-7 py-4 rounded-xl border border-zinc-700 bg-zinc-900 text-slate-100 font-semibold hover:bg-zinc-800 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-primary" />
                    Read Our Vision
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  No credit card required &middot; 14-day free trial &middot; Cancel anytime
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 10. STRUCTURED FOOTER WITH MEGATRIX BRANDING                          */}
      {/* ==================================================================== */}
      <Footer
        onOpenVision={() => setShowVisionModal(true)}
        onOpenPrivacy={() => setShowPrivacyModal(true)}
        onOpenTerms={() => setShowTermsModal(true)}
      />

      {/* ==================================================================== */}
      {/* MODALS: CONNECT SHOPIFY / WAYBILL / PRIVACY / TERMS / VISION          */}
      {/* ==================================================================== */}

      {/* 1. CONNECT SHOPIFY STORE MODAL */}
      <AnimatePresence>
        {showConnectModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowConnectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 text-slate-900 dark:text-slate-100 space-y-5 shadow-2xl relative"
            >
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <img src="/images/new-logo/horizontal/asan-logo-horizontal-dark.svg" alt="Logo" className="hidden dark:block h-7 w-auto object-contain" />
                  <img src="/images/new-logo/horizontal/asan-logo-horizontal-light.svg" alt="Logo" className="block dark:hidden h-7 w-auto object-contain" />
                  <span className="font-bold text-sm">1-Click Shopify Integration</span>
                </div>
                <button onClick={() => setShowConnectModal(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-mono cursor-pointer">✕ Close</button>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Enter Your Shopify Store Domain:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={connectShopDomain}
                    onChange={(e) => setConnectShopDomain(e.target.value)}
                    placeholder="mybrand.myshopify.com"
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-300 dark:border-zinc-700 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary"
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Zero downtime. Instantly syncs orders &amp; enables automated WhatsApp + IVR confirmation.
                </p>
              </div>

              <a href={`${loginUrl}?mode=register&shop=${encodeURIComponent(connectShopDomain)}`}
                className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm text-center block transition-all shadow-glow"
              >
                Connect Store via 1-Click OAuth →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. PRINTABLE MOCK WAYBILL MODAL */}
      <AnimatePresence>
        {showWaybillModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setShowWaybillModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative border-2 border-slate-900"
            >
              <div className="flex justify-between items-center border-b-2 border-slate-900 pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white px-2 py-0.5 text-xs font-mono font-bold">PostEx COD WAYBILL</span>
                  <span className="font-mono font-bold text-xs">CN: 9821401</span>
                </div>
                <button onClick={() => setShowWaybillModal(false)} className="text-slate-700 font-bold text-xs cursor-pointer">✕ Close</button>
              </div>

              {/* Waybill Content */}
              <div className="space-y-3 font-mono text-xs border border-slate-300 p-4 rounded-lg">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <div>
                    <div className="font-bold text-sm">SHIPPER: ASAN SHIPPING DEMO</div>
                    <div className="text-[10px] text-slate-600">Gulberg III, Lahore, Pakistan</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-primary">PKR {simAmount.toLocaleString("en-PK")} COD</div>
                    <div className="text-[10px] text-slate-600">COD Verified Via WhatsApp</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-xs">CONSIGNEE DETAILS:</div>
                  <div>Name: {simName}</div>
                  <div>City: {simCity}, Punjab</div>
                  <div>Contact: +92 300 1234567</div>
                </div>

                {/* Barcode Mock */}
                <div className="pt-3 text-center border-t border-slate-200">
                  <div className="text-2xl font-bold tracking-[6px] font-mono">||| | |||| || | |||</div>
                  <div className="text-[10px] text-slate-600 mt-1">CN: 9821401 · POSTEX-LHE-{simCity.toUpperCase()}</div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button onClick={() => window.print()} className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer">
                  <Printer className="w-4 h-4" /> Print PDF Waybill
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. PRIVACY & DATA PROTECTION POLICY MODAL */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setShowPrivacyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-slate-900 dark:text-slate-100 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto scrollbar-thin"
            >
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <span className="font-bold text-lg font-display">Privacy &amp; Data Protection Policy</span>
                </div>
                <button onClick={() => setShowPrivacyModal(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-mono cursor-pointer">✕ Close</button>
              </div>

              <div className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/30 text-primary font-semibold">
                  100% Compliant with Shopify Protected Customer Data Standards &amp; GDPR Webhooks.
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">1. Scope &amp; Data Processor Role</h3>
                <p>AsanShipping operates strictly as a trusted Data Processor for Shopify merchants. We process customer names, delivery addresses, phone numbers, and order line items exclusively to perform automated WhatsApp/IVR confirmation and courier dispatch (TCS, Trax, Leopards, PostEx, M&amp;P).</p>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">2. Protected Customer Data Policy</h3>
                <p>We do NOT sell, rent, or trade merchant or customer data with any third-party advertisers or external brokers. Customer data is processed solely for order fulfillment and return risk scoring.</p>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">3. Data Security &amp; Encryption Architecture</h3>
                <p>All Shopify API credentials and tokens are encrypted using AES-256-CBC field-level encryption. Data transmission uses mandatory TLS 1.3 encryption, and data-at-rest is stored securely in indexed MongoDB Atlas infrastructure.</p>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">4. Mandatory Shopify GDPR Webhooks</h3>
                <p>Our platform handles all required mandatory webhooks automatically:</p>
                <ul className="list-disc pl-5 space-y-1 font-mono text-[11px]">
                  <li><code>customers/data_request</code>: Provides full customer logs upon request.</li>
                  <li><code>customers/redact</code>: Automatically purges customer records within 48 hours.</li>
                  <li><code>shop/redact</code>: Automatically purges store data within 48 hours of app uninstallation.</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. TERMS OF SERVICE MODAL */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setShowTermsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-slate-900 dark:text-slate-100 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto scrollbar-thin"
            >
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  <span className="font-bold text-lg font-display">Terms of Service</span>
                </div>
                <button onClick={() => setShowTermsModal(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-mono cursor-pointer">✕ Close</button>
              </div>

              <div className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">1. Acceptance of Terms</h3>
                <p>By connecting your Shopify store to AsanShipping, you agree to these Terms of Service. AsanShipping provides automated COD order verification, courier routing, and reverse logistics tracking.</p>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">2. Merchant Responsibilities</h3>
                <p>Merchants are responsible for maintaining valid courier API keys (TCS, Trax, Leopards, PostEx, M&amp;P) and ensuring customer contact information collected at checkout is accurate.</p>

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">3. Service SLA &amp; Uptime</h3>
                <p>We target a 99.9% uptime SLA for webhook processing and automated verification dispatch. API rate limits are dynamically managed to prevent courier booking throttles.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. OUR GOALS & VISION MODAL */}
      <AnimatePresence>
        {showVisionModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setShowVisionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-slate-900 dark:text-slate-100 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto scrollbar-thin"
            >
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-6 h-6 text-primary" />
                  <span className="font-bold text-lg font-display">Our Goals &amp; Long-Term Vision</span>
                </div>
                <button onClick={() => setShowVisionModal(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-mono cursor-pointer">✕ Close</button>
              </div>

              <div className="space-y-5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-primary space-y-1">
                  <div className="font-bold text-sm">THE MISSION</div>
                  <p>To eliminate Return-to-Origin (RTO) friction and reclaim billions in lost Cash-On-Delivery margins for Pakistani e-commerce entrepreneurs.</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">The Problem We Are Solving</h3>
                  <p>Over 30% of Cash-on-Delivery (COD) parcels across Pakistan are returned due to fake orders, unverified buyers, and suboptimal courier assignment. This costs Pakistani D2C brands millions in dead return freight fees and blocked inventory capital.</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">The 3 Pillars of AsanShipping</h3>
                  <div className="grid sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black">
                      <div className="font-bold text-primary mb-1">1. Autonomous Verification</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Zero-friction WhatsApp quick replies with automated Voice IVR fallback.</p>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black">
                      <div className="font-bold text-primary mb-1">2. Intelligent Routing</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Multi-courier SLA analysis across TCS, Trax, Leopards, PostEx, and M&amp;P.</p>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black">
                      <div className="font-bold text-primary mb-1">3. Reverse Logistics</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Digital warehouse barcode scanning to classify scrap vs restockable inventory.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Long-Term Vision</h3>
                  <p>To build the definitive AI-driven autonomous logistics infrastructure for emerging digital commerce markets across South Asia and MENA.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Video Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-slate-100 space-y-4 shadow-2xl relative"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="font-bold text-base flex items-center gap-2">
                  <Play className="w-4 h-4 text-primary fill-primary" />
                  <span>AsanShipping 60-Second Overview</span>
                </div>
                <button onClick={() => setShowDemoModal(false)} className="text-slate-400 hover:text-white text-sm font-mono cursor-pointer">✕ Close</button>
              </div>
              <div className="aspect-video w-full rounded-xl bg-slate-950 flex flex-col items-center justify-center border border-slate-800 p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <Play className="w-6 h-6 fill-primary" />
                </div>
                <div className="font-bold text-sm">60-Second Interactive Product Tour</div>
                <p className="text-xs text-slate-400 max-w-md">
                  Watch how AsanShipping connects to Shopify in 3 minutes, fires automated WhatsApp quick-replies, and routes orders across TCS, Trax, Leopards, PostEx, and M&amp;P.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function HomePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomePageContent />
    </React.Suspense>
  );
}