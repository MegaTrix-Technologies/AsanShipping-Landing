"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  onOpenConnectModal?: () => void;
}

export function Navbar({ onOpenConnectModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const loginUrl = process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://web.asanshipping.com/login";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#couriers", label: "Couriers" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/articles", label: "Articles" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl border-b border-border/80 bg-background/85 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative h-10 w-44 sm:w-48 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/images/login-screen-logo.png"
              alt="AsanShipping Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Centered Nav Links — no container border, bigger buttons, dark visible text */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button Cluster */}
        <div className="flex items-center gap-2.5 shrink-0">
          <ThemeToggle />

          <a
            href={loginUrl}
            className="hidden sm:inline-flex px-5 py-2.5 text-sm font-bold rounded-xl text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-all"
          >
            Login
          </a>

          <button
            onClick={onOpenConnectModal}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer flex items-center gap-1.5 border border-primary/30"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-border bg-card text-foreground cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border flex items-center justify-between gap-3">
            <a
              href={loginUrl}
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-xl text-xs font-bold border border-border text-foreground hover:bg-accent transition-colors"
            >
              Login
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenConnectModal) onOpenConnectModal();
              }}
              className="flex-1 py-2.5 rounded-xl text-xs font-black bg-primary text-primary-foreground text-center hover:bg-primary/90 transition-colors"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
