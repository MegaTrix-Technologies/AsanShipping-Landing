"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles, BookOpen } from "lucide-react";

interface FooterProps {
  onOpenVision?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export function Footer({ onOpenVision, onOpenPrivacy, onOpenTerms }: FooterProps) {
  const loginUrl = process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://web.asanshipping.com/login";

  return (
    <footer className="border-t border-border bg-card text-foreground">
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

          {/* Col 4: Socials & Copyright */}
          <div className="space-y-4">
            <div className="relative h-8 w-40">
              <Image
                src="/images/login-screen-logo.png"
                alt="AsanShipping Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pakistan&apos;s #1 AI-driven autonomous logistics control tower. Eliminating COD RTO losses for high-scale D2C brands.
            </p>
            <div className="text-xs text-muted-foreground font-mono pt-2">
              &copy; 2026 AsanShipping Inc. <br />
              <span className="text-primary font-bold">Engineered in Lahore, Pakistan 🇵🇰</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
