import type { Metadata } from "next";
import { SupportApplication } from "@/components/support/support-application";

export const metadata: Metadata = {
  title: "Get Support",
  description:
    "Apply for support from Beyond The Fall Initiative — seven short questions about you, your business and what happened.",
};

export default function GetSupportPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <SupportApplication />
    </main>
  );
}
