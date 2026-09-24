"use client";

import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const faqs = [
    {
      q: "Do I need developer approval from Shopify to run this?",
      a: "No. Because we run as a 1-click Custom App directly inside your Shopify Admin with targeted scopes, setup takes under 3 minutes with zero app store approval delays.",
      category: "Setup",
    },
    {
      q: "How does WhatsApp Interactive Verification work?",
      a: "As soon as an order is placed on Shopify, our API fires an automated WhatsApp message with interactive [Confirm Order] and [Cancel Order] buttons. If the customer does not reply within 10 minutes, an IVR voice call is automatically dispatched as a fallback.",
      category: "WhatsApp",
    },
    {
      q: "How does the Smart Courier Routing Engine choose the carrier?",
      a: "Our algorithm evaluates 14-day historical delivery success rates by city destination, parcel weight, and real-time fuel tariffs across TCS, Trax, Leopards, PostEx, and M&P to auto-select the highest-probability carrier.",
      category: "Routing",
    },
    {
      q: "How does the Reverse Scrap & Barcode Desk prevent inventory leakage?",
      a: "Warehouse staff scan returned package barcodes upon arrival. The system categorizes items (Restockable, Damaged_Scrap, Mismatched), updates your Shopify inventory automatically, and logs financial scrap losses.",
      category: "Returns",
    },
    {
      q: "Which Pakistani couriers are supported?",
      a: "We natively integrate with TCS Express, Trax Logistics, Leopards Courier, PostEx COD, and M&P Courier via live REST APIs with pre-seeded city code mapping.",
      category: "Couriers",
    },
    {
      q: "Is my store and customer data safe?",
      a: "Yes. All API credentials and merchant tokens are encrypted using AES-256-CBC. Data access is strictly isolated per tenant using indexed tenantId schemas in MongoDB.",
      category: "Security",
    },
    {
      q: "What happens if a customer cancels via the WhatsApp button?",
      a: "The order is instantly tagged Cancelled_By_Customer in your Shopify admin, removed from the dispatch queue, and logged so it never reaches courier booking — saving you the shipping fee entirely.",
      category: "WhatsApp",
    },
  ];

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-border bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-display">
            Clear Answers for High-Scale D2C Brands
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Everything you need to know about autonomous verification, multi-courier routing, and billing.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g. WhatsApp, Shopify, PostEx, security)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filtered.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-border bg-background overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer hover:bg-accent/40 transition-colors"
                >
                  <span className="font-bold text-xs sm:text-sm text-foreground">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-muted-foreground leading-relaxed border-t border-border/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
