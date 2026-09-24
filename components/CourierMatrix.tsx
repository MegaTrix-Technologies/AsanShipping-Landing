import React from "react";
import Image from "next/image";
import { Check, Truck, Zap, Globe, ShieldCheck } from "lucide-react";

export function CourierMatrix() {
  const couriers = [
    {
      name: "TCS Express",
      badge: "Overnight SLA Leader",
      image: "/images/couriers/tcs.jpg",
      coverage: "Nationwide (3,500+ locations)",
      bestFor: "High-AOV priority orders & tier-1 metros",
      apiSync: "< 1.2s",
    },
    {
      name: "PostEx COD",
      badge: "Fastest Remittance",
      image: "/images/couriers/postex.png",
      coverage: "Major urban hubs & Tier-2 cities",
      bestFor: "High-volume D2C fashion & apparel",
      apiSync: "< 800ms",
    },
    {
      name: "Trax Logistics",
      badge: "Tech-First E-Commerce",
      image: "/images/couriers/trax.jpg",
      coverage: "Pan-Pakistan delivery network",
      bestFor: "Real-time webhook parcel updates",
      apiSync: "< 950ms",
    },
    {
      name: "Leopards Courier",
      badge: "Deep Rural Coverage",
      image: "/images/couriers/leopards.jpg",
      coverage: "Deepest interior Punjab & Sindh",
      bestFor: "Suburban & non-metro COD parcels",
      apiSync: "< 1.4s",
    },
    {
      name: "M&P Express",
      badge: "B2B & Heavy Freight",
      image: "/images/couriers/mp.png",
      coverage: "1,600+ express domestic points",
      bestFor: "Multi-item bundles & corporate logistics",
      apiSync: "< 1.1s",
    },
  ];

  return (
    <section id="couriers" className="py-16 sm:py-24 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
            NATIVE MULTI-CARRIER INTEGRATION
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-display">
            Direct REST APIs to Pakistan&apos;s Top Couriers
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Never negotiate separate tech integrations or manually book individual portals again. Plug your merchant credentials once and let AsanShipping auto-route each parcel.
          </p>
        </div>

        {/* Courier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {couriers.map((courier) => (
            <div
              key={courier.name}
              className="p-5 rounded-2xl border border-border bg-background space-y-4 hover:border-primary/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative h-10 w-24 rounded-lg overflow-hidden bg-white p-1 border border-border">
                    <Image
                      src={courier.image}
                      alt={courier.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                    NATIVE
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-foreground">{courier.name}</h3>
                  <div className="text-[11px] text-primary font-bold">{courier.badge}</div>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-start gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-[11px]">{courier.coverage}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-[11px] font-mono">API SLA: {courier.apiSync}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border/80 text-[11px] text-muted-foreground">
                <span className="font-bold text-foreground">Best For: </span>
                {courier.bestFor}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
