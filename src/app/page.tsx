import { Hero } from "@/components/home/hero";
import { ImpactStories } from "@/components/home/impact-stories";
import { Partners } from "@/components/home/partners";
import { StoriesInsights } from "@/components/home/stories-insights";
import { WhatWeDo } from "@/components/home/what-we-do";
import { Ribbon } from "@/components/ui/ribbon";
import { hero } from "@/content/home";

export default function Home() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <Hero />
      <WhatWeDo />
      <Ribbon items={hero.ribbon} />
      <StoriesInsights />
      <Partners />
      <ImpactStories />
    </main>
  );
}
