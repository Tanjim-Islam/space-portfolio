import { fetchPublished } from "./content";
import { CMS_URL, CMS_KEY, SITE, FALLBACK } from "./config";
export async function getPortfolio() {
  try { return await fetchPublished(CMS_URL, CMS_KEY, SITE, FALLBACK); }
  catch (error) { console.warn("Portfolio CMS unavailable. Using bundled content.", error); return FALLBACK; }
}
