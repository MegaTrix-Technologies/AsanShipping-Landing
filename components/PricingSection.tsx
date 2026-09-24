"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";

interface PricingSectionProps {
  onOpenConnect: () => void;
}

export function PricingSection({ onOpenConnect }: PricingSectionProps) {
  const plans = [
    {
      name: "Starter D2C",
      price: "4,999",
      period: "/month",
      desc: "Ideal for emerging brands doing up to 500 COD orders monthly.",
      features: [
        "Up to 500 Verified Orders/mo",
        "Automated WhatsApp Quick-Replies",
        "Cross-Merchant Blacklist Screening",
        "2 Courier Integrations (e.g. PostEx + Trax)",
        "Standard Email Support",
      ],
      cta: "Start 14-Day Free Trial",
      popular: false,
    },
    {
      name: "Growth Scaler",
      price: "9,999",
      period: "/month",
      desc: "Built for scaling high-volume stores needing autonomous routing & voice IVR.",
      features: [
        "Up to 2,500 Verified Orders/mo",
        "WhatsApp Interactive + Automated Voice IVR",
        "All 5 Couriers (TCS, Trax, Leopards, PostEx, M&P)",
        "Reverse Logistics & Barcode Scrap Desk",
        "Dynamic City Tariff & SLA Optimizer",
        "Priority WhatsApp Merchant Support",
      ],
      cta: "Claim Most Popular Plan",
      popular: true,
    },
    {
      name: "Enterprise Tower",
      price: "24,999",
      period: "/month",
      desc: "For multi-warehouse high-volume enterprises processing 10,000+ monthly orders.",
      features: [
        "Unlimited / Custom Verified Volume",
        "Dedicated Multi-Tenant SLA Guarantee",
        "Custom City Code Courier Mapping",
        "Warehouse Barcode Return Terminal",
        "Dedicated Account Manager & Integration Lead",
      ],
      cta: "Contact Enterprise Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
            TRANSPARENT VALUE-BASED PRICING
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-display">
            Plans That Pay for Themselves on Day One
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Stopping just 15 failed deliveries covers your entire monthly subscription. 14-day free trial, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all border ${
                plan.popular
                  ? "border-primary bg-card ring-2 ring-primary/40 shadow-xl shadow-primary/10"
                  : "border-border bg-card shadow-sm hover:border-border/80"
              }`}
            >
              <div className="space-y-4">
                {plan.popular && (
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md inline-block">
                    MOST POPULAR FOR SCALING BRANDS
                  </div>
                )}
                <div>
                  <h3 className="font-black text-lg text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{plan.desc}</p>
                </div>

                {/* Anti-AI aesthetic: unboxed bold pricing typography */}
                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-xs font-bold text-muted-foreground">PKR</span>
                  <span className="text-3xl sm:text-4xl font-black text-foreground font-display tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground">{plan.period}</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-border text-xs text-muted-foreground">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenConnect}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
                    : "border border-border bg-background hover:bg-accent text-foreground"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
