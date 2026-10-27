import { cacheLife } from "next/cache";

// Cache Components forbids reading the clock during prerender, so the year is cached
// and refreshed daily — it rolls over at New Year without a rebuild.
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
