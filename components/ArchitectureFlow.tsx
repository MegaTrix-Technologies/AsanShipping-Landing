import React from "react";
import {
  Store,
  Cpu,
  ShieldAlert,
  Workflow,
  Gauge,
  MessageSquare,
  PhoneCall,
  Truck,
  Users,
  CheckCircle2,
  ScanBarcode,
  Package,
} from "lucide-react";

export function ArchitectureFlow() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
            AUTONOMOUS ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-display">
            How Orders Flow Through the AsanShipping Control Tower
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            From checkout webhook to buyer verification, intelligent multi-carrier routing, and reverse barcode scrap tracking.
          </p>
        </div>

        {/* 4-Column Responsive Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Column 1: Shopify & Intake */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  STAGE 1: INTAKE
                </span>
                <Store className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-black text-foreground">
                Shopify Webhook Sync
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Orders stream into AsanShipping via real-time webhooks in under 500ms with zero manual export/import.
              </p>
            </div>

            <div className="space-y-2 text-xs font-medium pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="w-4 h-4 text-primary shrink-0" />
                <span>Line Items &amp; COD Total</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ScanBarcode className="w-4 h-4 text-primary shrink-0" />
                <span>SKU Stock Allocation</span>
              </div>
            </div>
          </div>

          {/* Column 2: Control Tower Intelligence */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  STAGE 2: INTELLIGENCE
                </span>
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-black text-foreground">
                Risk &amp; Blacklist Gate
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cross-merchant phone number screening checks previous return histories to prevent repeat courier fraud.
              </p>
            </div>

            <div className="space-y-2 text-xs font-medium pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldAlert className="w-4 h-4 text-primary shrink-0" />
                <span>Fraud &amp; RTO History Score</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Workflow className="w-4 h-4 text-primary shrink-0" />
                <span>Redis FIFO Queue Engine</span>
              </div>
            </div>
          </div>

          {/* Column 3: Multi-Channel Verification */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  STAGE 3: VERIFICATION
                </span>
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-black text-foreground">
                WhatsApp + Voice IVR
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automated WhatsApp quick-reply buttons prompt the buyer to confirm or cancel. Automated voice calls trigger on delay.
              </p>
            </div>

            <div className="space-y-2 text-xs font-medium pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="w-4 h-4 text-primary shrink-0" />
                <span>Interactive [Confirm/Cancel]</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <PhoneCall className="w-4 h-4 text-primary shrink-0" />
                <span>Automated Voice Call Fallback</span>
              </div>
            </div>
          </div>

          {/* Column 4: Courier Booking & Delivery */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  STAGE 4: DISPATCH
                </span>
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-black text-foreground">
                Smart Carrier Routing
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Orders are booked automatically via direct REST APIs to TCS, Trax, Leopards, PostEx, or M&amp;P based on city SLAs.
              </p>
            </div>

            <div className="space-y-2 text-xs font-medium pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="w-4 h-4 text-primary shrink-0" />
                <span>Tariff &amp; Delivery SLA Optimizer</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Doorstep COD Paid &amp; Synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
