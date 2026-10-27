import { VideoGallery } from "@/components/home/video-gallery";
import { ButtonLink } from "@/components/ui/button-link";
import { PillText } from "@/components/ui/pill-text";
import { RisingSteps } from "@/components/ui/rising-steps";
import { storiesInsights } from "@/content/home";

export function StoriesInsights() {
  return (
    // overflow-clip (not hidden) so the stacking cards can stay sticky.
    <section aria-labelledby="stories-title" className="on-dark section-space relative isolate overflow-clip bg-night">
      {/* Texture: warm glow, film grain, rising-steps brand motif */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="texture-glow absolute inset-0" />
        <div className="texture-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <RisingSteps className="absolute top-10 right-6 hidden w-24 md:block lg:top-16 lg:right-12 lg:w-32" />
        <RisingSteps className="absolute bottom-10 left-6 hidden w-16 rotate-180 opacity-40 md:block lg:left-12 lg:w-20" />
      </div>

      <div className="container-site">
        <p data-reveal="up" className="text-center font-heading text-[0.75rem] font-semibold tracking-[0.16em] text-sun uppercase">
          [&nbsp;{storiesInsights.label}&nbsp;]
        </p>

        {/* Statement with photos set inline as pills */}
        <h2 id="stories-title" data-reveal="up" className="mx-auto mt-6 max-w-5xl text-center text-h2 leading-[1.18] tracking-[-0.03em] text-white lg:text-h1 lg:leading-[1.15]">
          <PillText parts={storiesInsights.statement} />
        </h2>

        <div className="mt-14 sm:mt-20">
          <VideoGallery videos={storiesInsights.videos} source={storiesInsights.source} summary={storiesInsights.summary} />
        </div>

        <div className="mt-10 flex justify-center sm:mt-14">
          <ButtonLink
            href={storiesInsights.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="light"
            icon
            className="w-full sm:w-auto"
          >
            {storiesInsights.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
