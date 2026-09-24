"use client";

import React, { useState } from "react";
import { Calculator, TrendingUp, DollarSign, ArrowRight } from "lucide-react";

interface RoiCalculatorProps {
  onOpenConnect: () => void;
}

export function RoiCalculator({ onOpenConnect }: RoiCalculatorProps) {
  const [orders, setOrders] = useState(1200);
  const [aov, setAov] = useState(3800);
  const [rto, setRto] = useState(32);

  // ROI calculations
  const lostShipping = Math.round(orders * (rto / 100) * 250);
  const blockedCash = Math.round(orders * (rto / 100) * aov);
  const totalMonthlyLoss = lostShipping + blockedCash;
  const monthlyRecovered = Math.round(totalMonthlyLoss * 0.35);
  const annualRecovered = monthlyRecovered * 12;

  return (
    <section id="calculator" className="py-16 sm:py-24 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
            REVENUE RECOVERY SIMULATOR
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground font-display">
            Calculate Your Recoverable COD Margin
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            See exactly how much revenue your D2C brand loses to dead return freight and locked-up COD inventory each month.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl">
          {/* Sliders Area */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slider 1: Monthly COD Orders */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-foreground">
                  Monthly COD Orders:
                </label>
                <span className="font-mono font-bold text-sm sm:text-base text-primary">
                  {orders.toLocaleString()} orders
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="10000"
                step="100"
                value={orders}
                onChange={(e) => setOrders(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                <span>200</span>
                <span>5,000</span>
                <span>10,000+</span>
              </div>
            </div>

            {/* Slider 2: Average Order Value (AOV) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-foreground">
                  Average Order Value (AOV):
                </label>
                <span className="font-mono font-bold text-sm sm:text-base text-primary">
                  PKR {aov.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="15000"
                step="250"
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                <span>PKR 1,000</span>
                <span>PKR 7,500</span>
                <span>PKR 15,000</span>
              </div>
            </div>

            {/* Slider 3: Current RTO % */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-foreground">
                  Current Return-to-Origin (RTO) Rate:
                </label>
                <span className="font-mono font-bold text-sm sm:text-base text-destructive">
                  {rto}% of orders
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="1"
                value={rto}
                onChange={(e) => setRto(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                <span>10% (Low)</span>
                <span>35% (Average)</span>
                <span>60% (Severe)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-background border border-border text-xs space-y-1 text-muted-foreground">
              <div className="font-bold text-foreground">Assumptions:</div>
              <div>&middot; Standard dead return courier freight fee: PKR 250/parcel.</div>
              <div>&middot; Autonomous WhatsApp + IVR confirmation reduces returns by ~35% in month one.</div>
            </div>
          </div>

          {/* Results Summary Box - Follows Anti-AI Aesthetic: Bare Unboxed Numbers */}
          <div className="lg:col-span-5 rounded-2xl border border-border bg-background p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold uppercase text-muted-foreground">
                ESTIMATED MONTHLY SAVINGS
              </div>

              {/* Unboxed solid typography */}
              <div>
                <div className="text-xs text-muted-foreground font-medium">Monthly Recoverable Capital:</div>
                <div className="text-3xl sm:text-4xl font-black text-foreground font-display mt-1">
                  PKR {monthlyRecovered.toLocaleString("en-PK")}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground font-medium">Annualized Bottom-Line Impact:</div>
                <div className="text-2xl sm:text-3xl font-black text-primary font-display mt-0.5">
                  PKR {annualRecovered.toLocaleString("en-PK")}
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Dead Return Freight Burn:</span>
                  <span className="font-mono font-bold text-destructive">
                    PKR {lostShipping.toLocaleString("en-PK")}/mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Blocked Inventory Value:</span>
                  <span className="font-mono font-bold text-foreground">
                    PKR {blockedCash.toLocaleString("en-PK")}/mo
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenConnect}
              className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Reclaim This Margin Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
