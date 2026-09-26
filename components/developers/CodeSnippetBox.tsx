"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal, FileCode } from "lucide-react";
import { CodeSnippet } from "@/lib/docs/apiData";

interface CodeSnippetBoxProps {
  snippets: CodeSnippet;
  title?: string;
}

type LangKey = "curl" | "node" | "python" | "php";

// Syntax highlighter function for code snippets
function highlightCode(code: string, lang: LangKey): React.ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, lineIdx) => {
    // Empty line
    if (!line.trim()) {
      return (
        <div key={lineIdx} className="table-row leading-relaxed">
          <span className="table-cell select-none text-right pr-4 text-slate-600 text-[11px] font-mono w-8">
            {lineIdx + 1}
          </span>
          <span className="table-cell whitespace-pre font-mono">&nbsp;</span>
        </div>
      );
    }

    // Comment lines
    if (line.trim().startsWith("//") || line.trim().startsWith("#") || line.trim().startsWith("/*")) {
      return (
        <div key={lineIdx} className="table-row leading-relaxed hover:bg-slate-900/50">
          <span className="table-cell select-none text-right pr-4 text-slate-600 text-[11px] font-mono w-8">
            {lineIdx + 1}
          </span>
          <span className="table-cell whitespace-pre font-mono text-slate-500 italic">
            {line}
          </span>
        </div>
      );
    }

    let tokens: React.ReactNode[] = [];

    if (lang === "curl") {
      // cURL regex highlighter
      const curlRegex = /(curl\b|-X|-H|-d|-F|\b(?:GET|POST|PATCH|DELETE|PUT)\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|https?:\/\/[^\s"\\]+|\\|\$\([^)]+\))/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = curlRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          tokens.push(
            <span key={`txt-${lastIndex}`} className="text-slate-300">
              {line.substring(lastIndex, match.index)}
            </span>
          );
        }

        const val = match[0];
        let cls = "text-slate-300";

        if (val === "curl") {
          cls = "text-pink-400 font-bold";
        } else if (val === "-X" || val === "-H" || val === "-d" || val === "-F") {
          cls = "text-amber-400 font-semibold";
        } else if (/^(GET|POST|PATCH|DELETE|PUT)$/.test(val)) {
          cls = "text-emerald-400 font-bold";
        } else if (val.startsWith('"') || val.startsWith("'")) {
          cls = "text-emerald-300";
        } else if (val.startsWith("http")) {
          cls = "text-cyan-400 underline decoration-cyan-500/30";
        } else if (val === "\\") {
          cls = "text-slate-500 font-bold";
        } else if (val.startsWith("$(")) {
          cls = "text-purple-400 font-mono";
        }

        tokens.push(
          <span key={`tok-${match.index}`} className={cls}>
            {val}
          </span>
        );
        lastIndex = curlRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        tokens.push(
          <span key={`tail-${lastIndex}`} className="text-slate-300">
            {line.substring(lastIndex)}
          </span>
        );
      }
    } else {
      // Generic JS / Python / PHP syntax highlighter
      const codeRegex = /(\b(?:const|let|var|await|async|import|from|export|function|return|def|class|if|else|try|catch|new|true|false|null|true|None|requests|json|curl_init|curl_setopt|curl_exec|curl_close|json_decode|json_encode)\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+\b|[{}()[\].,:;=+\-*\/])/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = codeRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          tokens.push(
            <span key={`txt-${lastIndex}`} className="text-slate-300">
              {line.substring(lastIndex, match.index)}
            </span>
          );
        }

        const val = match[0];
        let cls = "text-slate-300";

        if (
          /^(const|let|var|await|async|import|from|export|function|return|def|class|if|else|try|catch|new)$/.test(
            val
          )
        ) {
          cls = "text-pink-400 font-bold";
        } else if (/^(true|false|null|None)$/.test(val)) {
          cls = "text-purple-400 font-semibold";
        } else if (val.startsWith('"') || val.startsWith("'") || val.startsWith("`")) {
          cls = "text-emerald-300";
        } else if (!isNaN(Number(val))) {
          cls = "text-amber-400 font-mono";
        } else if (/^(requests|json|fetch|URLSearchParams|crypto|Buffer)$/.test(val)) {
          cls = "text-sky-400 font-bold";
        } else if (/^(curl_init|curl_setopt|curl_exec|curl_close|json_decode|json_encode)$/.test(val)) {
          cls = "text-cyan-400 font-semibold";
        } else if (/[{}()[\]]/.test(val)) {
          cls = "text-slate-400 font-bold";
        } else if (/[=+\-*\/]/.test(val)) {
          cls = "text-rose-400";
        }

        tokens.push(
          <span key={`tok-${match.index}`} className={cls}>
            {val}
          </span>
        );
        lastIndex = codeRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        tokens.push(
          <span key={`tail-${lastIndex}`} className="text-slate-300">
            {line.substring(lastIndex)}
          </span>
        );
      }
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

export function CodeSnippetBox({ snippets, title }: CodeSnippetBoxProps) {
  const [activeTab, setActiveTab] = useState<LangKey>("curl");
  const [copied, setCopied] = useState(false);

  const tabs: { key: LangKey; label: string; iconLabel: string }[] = [
    { key: "curl", label: "cURL", iconLabel: "CLI" },
    { key: "node", label: "Node.js (Fetch)", iconLabel: "JS" },
    { key: "python", label: "Python (Requests)", iconLabel: "PY" },
    { key: "php", label: "PHP (cURL)", iconLabel: "PHP" },
  ];

  const currentCode = snippets[activeTab] || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-950 text-slate-100 overflow-hidden shadow-2xl">
      {/* Header bar with tabs */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 text-xs font-mono text-slate-400 border-r border-slate-800 mr-1">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-slate-300">{title || "Request Snippet"}</span>
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.key
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 transition-colors border border-slate-700/60 shrink-0 cursor-pointer shadow-sm"
          title="Copy snippet"
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
        <div className="table w-full">{highlightCode(currentCode, activeTab)}</div>
      </div>
    </div>
  );
}
