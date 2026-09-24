import React from "react";
import {
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  ScanBarcode,
  Store,
  Layers,
  Sparkles,
  Quote,
} from "lucide-react";

export function FeatureHighlights() {
  const testimonials = [
    {
      name: "Ahmed Raza",
      role: "Founder, UrbanThreads.pk",
      initials: "AR",
      quote:
        "Our RTO rate dropped from 34% to 19% within the first six weeks. The WhatsApp confirmation step alone paid for the subscription three times over.",
      metric: "−15% RTO",
      metricLabel: "in 6 weeks",
    },
    {
      name: "Sana Malik",
      role: "Operations Lead, Threadbare Studio",
      initials: "SM",
      quote:
        "The blacklist screening caught repeat rejecters we'd been shipping to for months without knowing. It's the single feature that changed our unit economics.",
      metric: "PKR 96K",
      metricLabel: "saved / month",
    },
    {
      name: "Bilal Chaudhry",
      role: "Co-Founder, Leather & Co",
      initials: "BC",
      quote:
        "Smart courier routing means we stopped manually comparing TCS vs Leopards vs PostEx tariffs every single order. It just picks the best one automatically.",
      metric: "4.2 hrs",
      metricLabel: "saved / week",
    },
  ];

  const features = [
    {
      title: "Interactive WhatsApp Verification",
      desc: "Sends 2-button [Confirm / Cancel] interactive WhatsApp prompts within 500ms of checkout.",
      icon: MessageSquare,
    },
    {
      title: "Voice IVR Fallback",
      desc: "If buyer does not respond to WhatsApp within 10 minutes, an automated voice phone call executes with DTMF 1/2 keypress verification.",
      icon: PhoneCall,
    },
    {
      title: "Cross-Merchant Blacklist",
      desc: "Scores buyer phone numbers against collective network return data to flag serial rejecters before courier booking.",
      icon: ShieldCheck,
    },
    {
      title: "Reverse Logistics Barcode Desk",
      desc: "Warehouse intake scanning classifies returned items as Restockable, Scrap, or Mismatched with automatic inventory restock.",
      icon: ScanBarcode,
    },
    {
      title: "1-Click Shopify App Sync",
      desc: "Native Shopify Admin API webhook integration connects in under 3 minutes with zero manual export/import.",
      icon: Store,
    },
    {
      title: "Encrypted Multi-Tenant Security",
      desc: "AES-256-CBC token encryption, isolated MongoDB schemas, and complete compliance with Shopify protected customer data standards.",
      icon: Layers,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Testimonials */}
      <section id="testimonials" className="py-16 sm:py-20 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              MERCHANT IMPACT
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-display">
              Trusted by High-Growth Pakistani D2C Brands
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Hear directly from founders and supply chain leads who eliminated delivery leakage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-border bg-background p-6 space-y-4 flex flex-col justify-between shadow-sm hover:border-primary/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Quote className="w-6 h-6 text-primary/40" />
                    {/* Bare unboxed metric */}
                    <div className="text-right">
                      <div className="text-base font-black text-primary font-display">{t.metric}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{t.metricLabel}</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">{t.name}</div>
                    <div className="text-[10px] text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-16 sm:py-20 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              ENGINEERED FOR COD SCALE
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-display">
              Everything Your Operations Team Needs
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              A complete operating system designed specifically for the challenges of Pakistani e-commerce logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-border bg-card space-y-3 hover:border-primary/50 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-foreground">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
