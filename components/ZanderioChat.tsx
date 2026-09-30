"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

interface ZanderioChatProps {
  brandColorDark?: string;
  brandColorLight?: string;
  homeOnly?: boolean;
}

const WIDGET_HOST_ID = "zanderio-widget-host";
const THEME_STYLE_ID = "asanshipping-zanderio-custom-theme";

export function ZanderioChat({
  brandColorDark = "#10B981",
  brandColorLight = "#059669",
  homeOnly = false,
}: ZanderioChatProps) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  const isHomePage = pathname === "/";
  const shouldShow = !homeOnly || isHomePage;

  // Manage visibility based on route
  useEffect(() => {
    if (typeof document === "undefined") return;

    const updateVisibility = () => {
      try {
        const host = document.getElementById(WIDGET_HOST_ID);
        if (!host) return;

        if (shouldShow) {
          host.style.setProperty("display", "block", "important");
          host.style.setProperty("visibility", "visible", "important");
          host.style.setProperty("opacity", "1", "important");
          host.style.setProperty("pointer-events", "auto", "important");
        } else {
          host.style.setProperty("display", "none", "important");
          host.style.setProperty("visibility", "hidden", "important");
          host.style.setProperty("opacity", "0", "important");
          host.style.setProperty("pointer-events", "none", "important");
        }
      } catch (e) {
        console.warn("ZanderioChat visibility error:", e);
      }
    };

    updateVisibility();
    const interval = setInterval(updateVisibility, 200);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [shouldShow]);

  // Shadow DOM Theme Injection for Asan Shipping Brand (Emerald Palette)
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const getThemeCSS = (isDark: boolean) => {
      const brandColor = isDark ? brandColorDark : brandColorLight;

      if (!isDark) {
        // Light Theme (Clean Crisp Paper & Emerald #059669)
        return `
          /* ============================================================
             LIGHT THEME — ASAN SHIPPING BRAND
             ============================================================ */
          :host, #zanderio-root {
            color-scheme: light !important;
            --z-bg: #FFFFFF !important;
            --z-bg-muted: #F0FDF4 !important;
            --z-border: #E2E8F0 !important;
            --z-text: #0F172A !important;
            --z-text-secondary: #475569 !important;
            --z-text-disabled: #94A3B8 !important;
            --z-font: var(--font-manrope), "Manrope", var(--font-sora), system-ui, sans-serif !important;
            --z-shadow-md: 0 0 0 1px #E2E8F0, 0 16px 36px -12px rgba(5, 150, 105, 0.16) !important;
            --z-shadow-brand: 0 0 20px rgba(5, 150, 105, 0.25) !important;
          }

          /* --- DIALOG CONTAINER (ALL SCREEN SIZES) --- */
          [role="dialog"] {
            background: #FFFFFF !important;
            border: 1px solid #E2E8F0 !important;
            box-shadow: 0 0 0 1px #E2E8F0, 0 20px 48px -12px rgba(5, 150, 105, 0.16) !important;
            backdrop-filter: blur(14px) !important;
            font-family: var(--z-font) !important;
          }

          /* Desktop View (> 640px) */
          @media (min-width: 641px) {
            [role="dialog"] {
              width: 390px !important;
              max-width: calc(100vw - 32px) !important;
              height: min(630px, calc(100dvh - 110px)) !important;
              max-height: calc(100dvh - 110px) !important;
              bottom: 84px !important;
              right: 20px !important;
              border-radius: 16px !important;
            }
          }

          /* Mobile Screen Adaptation (< 641px) */
          @media (max-width: 640px) {
            [role="dialog"] {
              inset: 0 !important;
              width: 100vw !important;
              height: 100dvh !important;
              max-height: 100dvh !important;
              border-radius: 0 !important;
              border: none !important;
              position: fixed !important;
              z-index: 2147483647 !important;
            }

            button[aria-label="Close chat"] {
              display: none !important;
            }
          }

          /* --- HEADER BAR --- */
          [role="dialog"] > div > div:first-child,
          [role="dialog"] header,
          div:has(> button[aria-label="Close chat"]) {
            background: linear-gradient(180deg, #F8FAFC 0%, #ECFDF5 100%) !important;
            border-bottom: 1px solid #E2E8F0 !important;
            padding: 14px 16px !important;
            color: #0F172A !important;
          }

          [role="dialog"] header span,
          [role="dialog"] > div > div:first-child span {
            color: #0F172A !important;
            font-family: var(--font-sora), "Sora", sans-serif !important;
            font-size: 14px !important;
            font-weight: 700 !important;
            letter-spacing: 0.02em !important;
          }

          /* Header Action Buttons */
          button[aria-label="Close chat"],
          button[aria-label="Expand chat"],
          button[aria-label="Shrink chat"],
          button[aria-label="Open full view"],
          button[aria-label="Exit full view"] {
            background: rgba(5, 150, 105, 0.06) !important;
            border: 1px solid rgba(5, 150, 105, 0.15) !important;
            border-radius: 6px !important;
            color: #0F172A !important;
            padding: 5px !important;
            transition: all 0.15s ease !important;
          }
          button[aria-label="Close chat"]:hover,
          button[aria-label="Expand chat"]:hover,
          button[aria-label="Open full view"]:hover {
            background: rgba(5, 150, 105, 0.15) !important;
            border-color: #059669 !important;
            color: #059669 !important;
          }

          /* --- MESSAGES & CHAT STREAM --- */
          [role="dialog"] div:has(> div > div[style*="border-radius"]),
          div[style*="overflow-y: auto"] {
            background: #FFFFFF !important;
            padding: 16px !important;
            gap: 14px !important;
          }

          /* Assistant Bubble */
          div[style*="flex-start"] > div {
            background: #F0FDF4 !important;
            border: 1px solid #DCFCE7 !important;
            color: #0F172A !important;
            font-size: 13.5px !important;
            line-height: 1.55 !important;
            border-radius: 12px 12px 12px 2px !important;
          }

          /* User Bubble */
          div[style*="flex-end"] > div {
            background: #059669 !important;
            color: #FFFFFF !important;
            font-size: 13.5px !important;
            line-height: 1.55 !important;
            border-radius: 12px 12px 2px 12px !important;
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25) !important;
          }

          /* --- STARTER / SUGGESTED QUESTIONS (HIGH CONTRAST) --- */
          div[role="group"][aria-label="Suggested questions"] {
            padding: 4px 16px 12px !important;
            gap: 8px !important;
          }

          div[role="group"][aria-label="Suggested questions"] button,
          button:has(.z-suggest-arrow) {
            background: #F8FAFC !important;
            border: 1px solid #E2E8F0 !important;
            border-radius: 10px !important;
            color: #0F172A !important;
            font-size: 13px !important;
            font-weight: 500 !important;
            line-height: 1.4 !important;
            padding: 10px 14px !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
            cursor: pointer !important;
            text-align: left !important;
          }

          div[role="group"][aria-label="Suggested questions"] button span,
          button:has(.z-suggest-arrow) span {
            color: #0F172A !important;
            font-weight: 500 !important;
          }

          div[role="group"][aria-label="Suggested questions"] button:hover,
          button:has(.z-suggest-arrow):hover {
            background: #ECFDF5 !important;
            border-color: #059669 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 4px 14px rgba(5, 150, 105, 0.15) !important;
          }

          div[role="group"][aria-label="Suggested questions"] button:hover span,
          button:has(.z-suggest-arrow):hover span {
            color: #059669 !important;
          }

          .z-suggest-arrow {
            fill: #059669 !important;
            stroke: #059669 !important;
            opacity: 0.85 !important;
          }

          /* --- INPUT COMPOSER --- */
          div:has(> div > textarea) {
            background: #FFFFFF !important;
            border-top: 1px solid #E2E8F0 !important;
            padding: 12px 14px !important;
          }

          div:has(> textarea) {
            background: #F8FAFC !important;
            border: 1px solid #CBD5E1 !important;
            border-radius: 12px !important;
            transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
          }

          div:has(> textarea):focus-within {
            border-color: #059669 !important;
            box-shadow: 0 0 0 1px #059669, 0 0 12px rgba(5, 150, 105, 0.15) !important;
          }

          textarea {
            color: #0F172A !important;
            font-size: 13.5px !important;
            font-family: var(--z-font) !important;
          }
          textarea::placeholder {
            color: #64748B !important;
          }

          button[aria-label="Send"] {
            background: #059669 !important;
            color: #FFFFFF !important;
            border-radius: 8px !important;
            transition: transform 0.15s ease, background 0.15s ease !important;
          }
          button[aria-label="Send"]:hover:not(:disabled) {
            background: #047857 !important;
            transform: scale(1.05) !important;
          }

          /* --- LAUNCHER FLOATING BUTTON --- */
          button[aria-label="Open chat"],
          button[aria-label="Close chat"] {
            background: linear-gradient(135deg, #10B981 0%, #059669 100%) !important;
            border: 1px solid rgba(255, 255, 255, 0.4) !important;
            box-shadow: 0 0 0 1px #CBD5E1, 0 8px 24px -4px rgba(5, 150, 105, 0.45) !important;
            color: #FFFFFF !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 56px !important;
            height: 56px !important;
            border-radius: 50% !important;
            cursor: pointer !important;
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease !important;
          }

          button[aria-label="Open chat"]:hover,
          button[aria-label="Close chat"]:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 0 0 2px #059669, 0 0 28px rgba(5, 150, 105, 0.55) !important;
          }

          /* Chat Icon Fallback */
          button[aria-label="Open chat"]:empty::after,
          button[aria-label="Open chat"]:not(:has(svg)):not(:has(img))::after {
            content: "" !important;
            display: block !important;
            width: 24px !important;
            height: 24px !important;
            background-color: #FFFFFF !important;
            -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E") no-repeat center / contain !important;
            mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E") no-repeat center / contain !important;
          }
        `;
      }

      // ============================================================
      // DARK THEME — ASAN SHIPPING OBSIDIAN & EMERALD (#10B981)
      // ============================================================
      return `
        :host, #zanderio-root {
          color-scheme: dark !important;
          --z-bg: #09090b !important;
          --z-bg-muted: #101014 !important;
          --z-border: #27272a !important;
          --z-text: #FAFAFA !important;
          --z-text-secondary: #A1A1AA !important;
          --z-text-disabled: #52525B !important;
          --z-font: var(--font-manrope), "Manrope", var(--font-sora), system-ui, sans-serif !important;
          --z-shadow-md: 0 0 0 1px #27272a, 0 20px 48px -15px rgba(16, 185, 129, 0.25), 0 10px 30px -10px rgba(0, 0, 0, 0.8) !important;
          --z-shadow-brand: 0 0 24px rgba(16, 185, 129, 0.4) !important;
        }

        /* --- DIALOG CONTAINER --- */
        [role="dialog"] {
          background: #09090b !important;
          border: 1px solid #27272a !important;
          box-shadow: 0 0 0 1px #27272a, 0 24px 56px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(16, 185, 129, 0.2) !important;
          backdrop-filter: blur(16px) !important;
          font-family: var(--z-font) !important;
        }

        /* Desktop & Tablet View (> 640px) */
        @media (min-width: 641px) {
          [role="dialog"] {
            width: 390px !important;
            max-width: calc(100vw - 32px) !important;
            height: min(630px, calc(100dvh - 110px)) !important;
            max-height: calc(100dvh - 110px) !important;
            bottom: 84px !important;
            right: 20px !important;
            border-radius: 16px !important;
          }
        }

        /* Mobile Screen Full View (< 641px) */
        @media (max-width: 640px) {
          [role="dialog"] {
            inset: 0 !important;
            width: 100vw !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            border-radius: 0 !important;
            border: none !important;
            position: fixed !important;
            z-index: 2147483647 !important;
          }

          button[aria-label="Close chat"] {
            display: none !important;
          }
        }

        /* --- HEADER BAR --- */
        [role="dialog"] > div > div:first-child,
        [role="dialog"] header,
        div:has(> button[aria-label="Close chat"]) {
          background: linear-gradient(180deg, #121915 0%, #09090b 100%) !important;
          border-bottom: 1px solid #27272a !important;
          padding: 14px 16px !important;
          color: #FAFAFA !important;
        }

        [role="dialog"] header span,
        [role="dialog"] > div > div:first-child span {
          color: #FAFAFA !important;
          font-family: var(--font-sora), "Sora", sans-serif !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          letter-spacing: 0.02em !important;
        }

        /* Header Action Buttons */
        button[aria-label="Close chat"],
        button[aria-label="Expand chat"],
        button[aria-label="Shrink chat"],
        button[aria-label="Open full view"],
        button[aria-label="Exit full view"] {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 6px !important;
          color: #D4D4D8 !important;
          padding: 5px !important;
          transition: all 0.15s ease !important;
        }
        button[aria-label="Close chat"]:hover,
        button[aria-label="Expand chat"]:hover,
        button[aria-label="Open full view"]:hover {
          background: rgba(16, 185, 129, 0.2) !important;
          border-color: #10B981 !important;
          color: #10B981 !important;
        }

        /* --- MESSAGES STREAM --- */
        [role="dialog"] div:has(> div > div[style*="border-radius"]),
        div[style*="overflow-y: auto"] {
          background: #09090b !important;
          padding: 16px !important;
          gap: 14px !important;
        }

        /* Assistant Bubble */
        div[style*="flex-start"] > div {
          background: #111418 !important;
          border: 1px solid #27272a !important;
          color: #FAFAFA !important;
          font-size: 13.5px !important;
          line-height: 1.6 !important;
          border-radius: 12px 12px 12px 2px !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
        }

        /* User Bubble */
        div[style*="flex-end"] > div {
          background: #10B981 !important;
          color: #FFFFFF !important;
          font-size: 13.5px !important;
          line-height: 1.6 !important;
          border-radius: 12px 12px 2px 12px !important;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35) !important;
        }

        /* --- STARTER / SUGGESTED QUESTIONS (HIGH CONTRAST) --- */
        div[role="group"][aria-label="Suggested questions"] {
          padding: 4px 16px 12px !important;
          gap: 8px !important;
        }

        div[role="group"][aria-label="Suggested questions"] button,
        button:has(.z-suggest-arrow) {
          background: #101216 !important;
          border: 1px solid #27272a !important;
          border-radius: 10px !important;
          color: #E4E4E7 !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          line-height: 1.4 !important;
          padding: 10px 14px !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35) !important;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
          cursor: pointer !important;
          text-align: left !important;
        }

        div[role="group"][aria-label="Suggested questions"] button span,
        button:has(.z-suggest-arrow) span {
          color: #E4E4E7 !important;
          font-weight: 500 !important;
        }

        div[role="group"][aria-label="Suggested questions"] button:hover,
        button:has(.z-suggest-arrow):hover {
          background: #141A17 !important;
          border-color: #10B981 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.25) !important;
        }

        div[role="group"][aria-label="Suggested questions"] button:hover span,
        button:has(.z-suggest-arrow):hover span {
          color: #10B981 !important;
        }

        .z-suggest-arrow {
          fill: #10B981 !important;
          stroke: #10B981 !important;
          opacity: 0.9 !important;
        }

        /* --- INPUT COMPOSER --- */
        div:has(> div > textarea) {
          background: #09090b !important;
          border-top: 1px solid #27272a !important;
          padding: 12px 14px !important;
        }

        div:has(> textarea) {
          background: #101216 !important;
          border: 1px solid #27272a !important;
          border-radius: 12px !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
        }

        div:has(> textarea):focus-within {
          border-color: #10B981 !important;
          box-shadow: 0 0 0 1px #10B981, 0 0 14px rgba(16, 185, 129, 0.2) !important;
        }

        textarea {
          color: #FAFAFA !important;
          font-size: 13.5px !important;
          font-family: var(--z-font) !important;
        }
        textarea::placeholder {
          color: #71717A !important;
        }

        button[aria-label="Send"] {
          background: #10B981 !important;
          color: #FFFFFF !important;
          border-radius: 8px !important;
          transition: transform 0.15s ease, background 0.15s ease !important;
        }
        button[aria-label="Send"]:hover:not(:disabled) {
          background: #059669 !important;
          transform: scale(1.05) !important;
        }

        /* --- LAUNCHER FLOATING BUTTON --- */
        button[aria-label="Open chat"],
        button[aria-label="Close chat"] {
          background: linear-gradient(135deg, #10B981 0%, #047857 100%) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 0 0 1px #27272a, 0 8px 24px -4px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3) !important;
          color: #FFFFFF !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 56px !important;
          height: 56px !important;
          border-radius: 50% !important;
          cursor: pointer !important;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease !important;
        }

        button[aria-label="Open chat"]:hover,
        button[aria-label="Close chat"]:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 0 0 2px #10B981, 0 0 32px rgba(16, 185, 129, 0.65) !important;
        }

        /* Fallback icon */
        button[aria-label="Open chat"]:empty::after,
        button[aria-label="Open chat"]:not(:has(svg)):not(:has(img))::after {
          content: "" !important;
          display: block !important;
          width: 24px !important;
          height: 24px !important;
          background-color: #FFFFFF !important;
          -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E") no-repeat center / contain !important;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E") no-repeat center / contain !important;
        }

        /* --- SCROLLBAR --- */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #09090b;
        }
        ::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${brandColor};
        }
      `;
    };

    const applyThemeToShadowRoot = () => {
      try {
        const host = document.getElementById(WIDGET_HOST_ID);
        if (!host || !host.shadowRoot) return false;

        const isDark = document.documentElement.classList.contains("dark") || resolvedTheme === "dark";
        const css = getThemeCSS(isDark);

        let styleEl = host.shadowRoot.getElementById(THEME_STYLE_ID) as HTMLStyleElement | null;
        if (!styleEl) {
          styleEl = document.createElement("style");
          styleEl.id = THEME_STYLE_ID;
          host.shadowRoot.appendChild(styleEl);
        }

        if (styleEl.textContent !== css) {
          styleEl.textContent = css;
        }

        if (shouldShow) {
          host.style.setProperty("display", "block", "important");
          host.style.setProperty("visibility", "visible", "important");
          host.style.setProperty("opacity", "1", "important");
          host.style.setProperty("pointer-events", "auto", "important");
        } else {
          host.style.setProperty("display", "none", "important");
          host.style.setProperty("visibility", "hidden", "important");
          host.style.setProperty("opacity", "0", "important");
          host.style.setProperty("pointer-events", "none", "important");
        }

        return true;
      } catch (e) {
        console.warn("ZanderioChat theme application error:", e);
        return false;
      }
    };

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const applied = applyThemeToShadowRoot();
      if (applied || attempts > 60) {
        clearInterval(interval);
      }
    }, 150);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && (m.attributeName === "class" || m.attributeName === "data-theme")) {
          applyThemeToShadowRoot();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [brandColorDark, brandColorLight, shouldShow, resolvedTheme]);

  // Returns null so it has identical output on SSR and Client (ZERO hydration mismatch)
  return null;
}

export default ZanderioChat;
