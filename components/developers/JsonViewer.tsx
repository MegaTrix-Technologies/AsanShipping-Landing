"use client";

import React, { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";

interface JsonViewerProps {
  data: any;
  status?: number;
  label?: string;
  defaultExpanded?: boolean;
}

// Tokenize and colorize JSON strings with rich VSCode-like coding intelligence palette
function highlightJson(json: string): React.ReactNode[] {
  // Regex to match keys, strings, numbers, booleans, and nulls
  const regex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[{}[\],:])/g;

  const lines = json.split("\n");

  return lines.map((line, lineIdx) => {
    let lastIndex = 0;
    const tokens: React.ReactNode[] = [];
    let match: RegExpExecArray | null;

    // Reset regex index for this line
    regex.lastIndex = 0;

    while ((match = regex.exec(line)) !== null) {
      // Text before match
      if (match.index > lastIndex) {
        tokens.push(
          <span key={`txt-${lastIndex}`} className="text-slate-400">
            {line.substring(lastIndex, match.index)}
          </span>
        );
      }

      const val = match[0];
      let cls = "text-slate-300";

      if (/^"/.test(val)) {
        if (/:$/.test(val)) {
          // JSON Property Key (e.g. "orderNumber":)
          cls = "text-sky-400 font-semibold";
        } else {
          // JSON String Value (e.g. "ASN-PK-8921849")
          cls = "text-emerald-400";
        }
      } else if (/true|false/.test(val)) {
        // Boolean
        cls = "text-purple-400 font-bold";
      } else if (/null/.test(val)) {
        // Null
        cls = "text-rose-400 italic";
      } else if (!isNaN(Number(val))) {
        // Number
        cls = "text-amber-400 font-mono font-medium";
      } else if (/[{}[\],]/.test(val)) {
        // Brackets & Punctuation
        cls = "text-slate-400 font-bold";
      }

      tokens.push(
        <span key={`token-${match.index}`} className={cls}>
          {val}
        </span>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      tokens.push(
        <span key={`tail-${lastIndex}`} className="text-slate-400">
          {line.substring(lastIndex)}
        </span>
      );
    }

    return (
      <div key={lineIdx} className="table-row leading-relaxed hover:bg-slate-900/50">
        <span className="table-cell select-none text-right pr-4 text-slate-600 text-[11px] font-mono w-8">
          {lineIdx + 1}
        </span>
        <span className="table-cell whitespace-pre font-mono">{tokens}</span>
      </div>
    );
  });
}

export function JsonViewer({ data, status, label }: JsonViewerProps) {
  const [copied, setCopied] = useState(false);
  const formatted = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (code?: number) => {
    if (!code) return null;
    if (code >= 200 && code < 300) {
      return (
        <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {code} OK
        </span>
      );
    }
    if (code >= 400 && code < 500) {
      return (
        <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          {code} Client Error
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        {code} Error
      </span>
    );
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-950 overflow-hidden text-slate-200 shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur">
        <div className="flex items-center gap-2.5">
          {getStatusBadge(status)}
          <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-sky-400" />
            {label || "Response JSON Payload"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 transition-colors border border-slate-700/60 cursor-pointer shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body with line numbers & syntax highlight */}
      <div className="p-4 overflow-x-auto text-xs font-mono max-h-[420px] scrollbar-thin bg-slate-950/90">
        <div className="table w-full">{highlightJson(formatted)}</div>
      </div>
    </div>
  );
}
