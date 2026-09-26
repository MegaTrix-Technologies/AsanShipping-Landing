"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles, BookOpen } from "lucide-react";
import MegaTrixIcon from "./MegaTrixIcon";

interface FooterProps {
  onOpenVision?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export function Footer({ onOpenVision, onOpenPrivacy, onOpenTerms }: FooterProps) {
  const loginUrl = process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://web.asanshipping.com/login";

  return (
    <footer className="border-t border-border bg-card text-foreground relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Product */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
              Product
            </div>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link href="/#simulator" className="hover:text-primary transition-colors">
                  Live Control Simulator
                </Link>
              </li>
              <li>
                <Link href="/#couriers" className="hover:text-primary transition-colors">
                  Courier API Matrix
                </Link>
              </li>
              <li>
                <Link href="/#shopify-embedded" className="hover:text-primary transition-colors">
                  Shopify Embedded App
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-primary transition-colors">
                  Interactive ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-primary transition-colors font-semibold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                  <span>Articles &amp; Guides</span>
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-primary transition-colors font-semibold text-emerald-500 flex items-center gap-1.5">
                  <span>Developer API &amp; Docs</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
              Company
            </div>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <button
                  type="button"
                  onClick={onOpenVision}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  About Us &amp; Our Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenVision}
                  className="hover:text-primary transition-colors text-left cursor-pointer flex items-center gap-1"
                >
                  Our Goals &amp; Vision <Sparkles className="w-3 h-3 text-primary" />
                </button>
              </li>
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors">
                  Product Roadmap
                </Link>
              </li>
              <li>
                <a href={loginUrl} className="hover:text-primary transition-colors">
                  Merchant Support Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Compliance */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
              Legal &amp; Compliance
            </div>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-primary transition-colors text-left cursor-pointer flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Privacy &amp; Data Protection
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Shopify GDPR Webhooks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  AES-256 Security Status
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: MegaTrix Branding & Copyright */}
          <div className="space-y-4">
            {/*
              ─── MegaTrix Logo Lockup ───
              • Default: pixel-art MT monogram in brand green + "A PRODUCT OF" + "MegaTrix Technologies"
              • Hover:   MT slides up + fades out, "MegaTrix" Orbitron wordmark slides up + fades in
            */}
            <div
              className="group relative inline-flex h-14 items-center overflow-hidden cursor-pointer select-none"
              role="img"
              aria-label="A Product of MegaTrix Technologies"
            >
              {/* LAYER 1 — MT pixel monogram + subtitle (default, slides out on hover) */}
              <div
                className="absolute inset-0 flex items-center gap-3 transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0"
                aria-hidden="true"
              >
                <div className="relative shrink-0 text-emerald-600 dark:text-[#57C894] transition-colors">
                  <MegaTrixIcon className="h-10 w-auto" />
                </div>
                <div className="flex flex-col justify-center text-left">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-[#57C894] leading-tight mb-0.5">
                    A Product of
                  </span>
                  <span className="text-sm sm:text-base font-black tracking-tight text-foreground leading-tight">
                    MegaTrix Technologies
                  </span>
                </div>
              </div>

              {/* LAYER 2 — Orbitron "MegaTrix" wordmark with emerald glow (slides in on hover) */}
              <div
                className="absolute inset-0 flex items-center gap-2.5 translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                aria-hidden="true"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse shrink-0" />
                <span
                  className="font-black text-2xl tracking-[0.1em] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 dark:from-[#57C894] dark:via-emerald-300 dark:to-[#2EA36F] bg-clip-text text-transparent select-none whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-orbitron), var(--font-sora), sans-serif",
                    lineHeight: 1,
                  }}
                >
                  MegaTrix
                </span>
                <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-[#57C894] border border-emerald-500/20">
                  TECH
                </span>
              </div>

              {/* Invisible spacer — reserves exact width so container doesn't jump */}
              <div
                className="flex items-center gap-3 invisible select-none"
                aria-hidden="true"
              >
                <MegaTrixIcon className="h-10 w-auto shrink-0" />
                <div className="flex flex-col justify-center text-left">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] leading-tight mb-0.5">
                    A Product of
                  </span>
                  <span className="text-sm sm:text-base font-black tracking-tight leading-tight whitespace-nowrap">
                    MegaTrix Technologies
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Pakistan&apos;s #1 AI-driven autonomous logistics control tower. Eliminating COD RTO losses for high-scale D2C brands.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
          <p>
            A Product of <span className="font-bold text-foreground">MegaTrix Technologies (Private) Limited</span> &copy; 2026 &middot; All Rights Reserved
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
