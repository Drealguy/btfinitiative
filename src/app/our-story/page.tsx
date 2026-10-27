import type { Metadata } from "next";
import { Beginning } from "@/components/our-story/beginning";
import { ClosingCta } from "@/components/our-story/closing-cta";
import { Founder } from "@/components/our-story/founder";
import { LookingAhead } from "@/components/our-story/looking-ahead";
import { MissionVision } from "@/components/our-story/mission-vision";
import { Purpose } from "@/components/our-story/purpose";
import { StoryHero } from "@/components/our-story/story-hero";
import { Values } from "@/components/our-story/values";
import { Ribbon } from "@/components/ui/ribbon";
import { values } from "@/content/our-story";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Beyond The Fall Initiative began, the founder behind it, and the beliefs that guide our work helping small business owners rise again.",
};

export default function OurStoryPage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <StoryHero />
      <Beginning />
      <Founder />
      <Purpose />
      <MissionVision />
      <Values />
      <Ribbon items={values.ribbon} />
      <LookingAhead />
      <ClosingCta />
    </main>
  );
}
