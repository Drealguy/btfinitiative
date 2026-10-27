import Image from "next/image";
import { BlockTitle } from "@/components/ui/block-title";
import { IndexLabel } from "@/components/ui/index-label";
import { RisingSteps } from "@/components/ui/rising-steps";
import { SteppedFrame } from "@/components/ui/stepped-frame";
import { Tag } from "@/components/ui/tag";
import { missionVision } from "@/content/our-story";

// id="mission" is the target of the homepage's "Our Mission" button.
export function MissionVision() {
  const { mission, vision } = missionVision;

  return (
    <section id="mission" aria-labelledby="mission-title" className="section-space border-t border-line bg-surface">
      <div className="container-site">
        <Tag>{missionVision.label}</Tag>
        <BlockTitle
          id="mission-title"
          lead={missionVision.title.lead}
          highlight={missionVision.title.highlight}
          stagger
          fit
          surface="white"
          className="mt-6 text-h1"
        />

        <div data-reveal="stagger" className="mt-12 grid gap-px border border-line bg-line sm:mt-16 lg:grid-cols-2">
          <article className="flex flex-col bg-paper p-6 sm:p-10 lg:min-h-[34rem]">
            <IndexLabel index="01" label={mission.label} />
            <SteppedFrame
              step="clamp(1rem, 0.6rem + 1.4vw, 1.75rem)"
              className="mt-6 -mr-6 ml-auto w-3/5 max-w-sm sm:-mr-10"
              frameClassName="aspect-[4/3]"
            >
              <Image
                src={mission.image}
                alt={mission.imageAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 22rem, 60vw"
                className="object-cover object-[35%_40%]"
              />
            </SteppedFrame>
            <h3 className="mt-auto max-w-md pt-10 text-h3 text-night">{mission.title}</h3>
            <p className="mt-4 max-w-lg text-lg text-muted">{mission.text}</p>
          </article>

          <article className="on-dark relative isolate flex flex-col overflow-hidden bg-night p-6 text-white sm:p-10 lg:min-h-[34rem]">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div className="texture-glow absolute inset-0" />
              <div className="texture-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
            </div>
            <IndexLabel tone="dark" index="02" label={vision.label} />
            <RisingSteps className="mt-6 ml-auto w-24 sm:w-32" />
            <h3 className="mt-auto max-w-md pt-10 text-h3">{vision.title}</h3>
            <p className="mt-4 max-w-lg text-lg text-white/75">{vision.text}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
