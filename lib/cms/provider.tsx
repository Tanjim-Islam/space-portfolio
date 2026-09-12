"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchPublished, type ResolvedContent } from "./content";
import { CMS_URL, CMS_KEY, SITE, FALLBACK } from "./config";
const Context = createContext<ResolvedContent>(FALLBACK);
export const usePortfolio = () => useContext(Context);
export function PortfolioProvider({ children, initial }: { children: React.ReactNode; initial?: ResolvedContent }) {
  const [content, setContent] = useState(initial ?? FALLBACK);
  useEffect(() => {
    let active = true;
    let fetching = false;
    async function refresh() {
      if (fetching || document.visibilityState === "hidden") return;
      fetching = true;
      try { const next = await fetchPublished(CMS_URL, CMS_KEY, SITE, FALLBACK); if (active) setContent(current => JSON.stringify(current) === JSON.stringify(next) ? current : next); }
      catch (error) { console.warn("Portfolio CMS unavailable. Keeping the last content.", error); }
      finally { fetching = false; }
    }
    if (!initial) void refresh();
    const timer = window.setInterval(() => void refresh(), 30000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => { active = false; window.clearInterval(timer); window.removeEventListener("focus", refresh); document.removeEventListener("visibilitychange", refresh); };
  }, [initial]);
  return <Context.Provider value={content}>{children}</Context.Provider>;
}
