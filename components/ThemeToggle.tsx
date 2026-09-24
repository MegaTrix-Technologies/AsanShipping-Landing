"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 p-2 rounded-xl border border-border bg-card text-muted-foreground opacity-50" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="p-2 rounded-xl border border-border bg-card text-foreground hover:bg-accent transition-colors cursor-pointer flex items-center justify-center"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-12" />
      ) : (
        <Moon className="w-4 h-4 text-foreground transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
