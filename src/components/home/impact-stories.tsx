import { ImpactTabs } from "@/components/home/impact-tabs";
import { BlockTitle } from "@/components/ui/block-title";
import { Tag } from "@/components/ui/tag";
import { impactStories } from "@/content/home";

export function ImpactStories() {
  return (
    <section aria-labelledby="impact-title" className="section-space relative isolate overflow-hidden border-t border-line bg-paper">
      <div
        aria-hidden="true"
        className="texture-grid absolute inset-0 -z-10 [mask-image:radial-gradient(110%_70%_at_50%_0%,black_30%,transparent_80%)]"
      />

      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-12">
          <div>
            <Tag>{impactStories.label}</Tag>
            <BlockTitle
              id="impact-title"
              lead={impactStories.title.lead}
              highlight={impactStories.title.highlight}
              stagger
              fit
              className="mt-6 text-h1"
            />
          </div>
          <p data-reveal="up" className="max-w-md text-lg text-muted lg:justify-self-end lg:text-right">{impactStories.description}</p>
        </div>

        <div className="mt-12 sm:mt-16">
          <ImpactTabs stories={impactStories.stories} cta={impactStories.cta} />
        </div>
      </div>
    </section>
  );
}
