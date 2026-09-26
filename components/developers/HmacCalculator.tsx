"use client";

import React, { useState, useEffect } from "react";
import { KeyRound, ShieldCheck, Copy, Check, RefreshCw } from "lucide-react";

export function HmacCalculator() {
  const [secret, setSecret] = useState("whsec_live_sample99a818e7f10b2c3d4e");
  const [payload, setPayload] = useState(
    JSON.stringify(
      {
        event: "order.created",
        data: {
          id: "ord_01J8C899X102",
          orderNumber: "WEB-2026-9041",
          trackingNumber: "ASN-PK-8921849",
          totalAmount: 5248,
          status: "PENDING_BOOKING"
        },
        timestamp: "2026-09-26T13:30:00.000Z"
      },
      null,
      2
    )
  );
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [signature, setSignature] = useState("");
  const [copied, setCopied] = useState(false);

  // Compute HMAC-SHA256 in browser using SubtleCrypto
  useEffect(() => {
    async function calculateHmac() {
      try {
        const enc = new TextEncoder();
        const message = `${timestamp}.${payload}`;
        const keyData = enc.encode(secret);
        const cryptoKey = await window.crypto.subtle.importKey(
          "raw",
          keyData,
          { name: "HMAC", hash: { name: "SHA-256" } },
          false,
          ["sign"]
        );
        const sigBuffer = await window.crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
        const hashArray = Array.from(new Uint8Array(sigBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        setSignature(`sha256=${timestamp}.${hashHex}`);
      } catch (err) {
        setSignature("Error computing signature");
      }
    }
    calculateHmac();
  }, [secret, payload, timestamp]);

  const refreshTimestamp = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString());
  };

  const copySignature = () => {
    navigator.clipboard.writeText(signature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-card/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl my-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-foreground">
            Interactive HMAC-SHA256 Signature Calculator
          </h3>
          <p className="text-xs text-muted-foreground">
            AsanShipping signs every outbound webhook with <code className="text-emerald-400 font-mono">X-Asan-Signature: sha256=t.signature</code>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Webhook Secret Input */}
        <div>
          <label className="block text-xs font-mono font-bold text-muted-foreground mb-1">
            Webhook Signing Secret (<code className="text-primary">whsec_...</code>)
          </label>
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground font-mono text-xs focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="whsec_live_..."
          />
        </div>

        {/* Unix Timestamp */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-mono font-bold text-muted-foreground">
              Unix Epoch Timestamp (<code className="text-primary">t</code>)
            </label>
            <button
              onClick={refreshTimestamp}
              className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Now</span>
            </button>
          </div>
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground font-mono text-xs focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Payload Editor */}
      <div className="mb-4">
        <label className="block text-xs font-mono font-bold text-muted-foreground mb-1">
          Raw Request Body JSON
        </label>
        <textarea
          rows={5}
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground font-mono text-xs focus:ring-2 focus:ring-primary focus:outline-none scrollbar-thin"
        />
      </div>

      {/* Generated Signature Result */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-mono text-slate-400">Calculated X-Asan-Signature Header</span>
          <button
            onClick={copySignature}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <p className="font-mono text-xs text-emerald-400 break-all select-all">{signature}</p>
      </div>
    </div>
  );
}
