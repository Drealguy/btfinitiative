import Image from "next/image";
import { BlockTitle } from "@/components/ui/block-title";
import { IndexLabel } from "@/components/ui/index-label";
import { SteppedFrame } from "@/components/ui/stepped-frame";
import { Tag } from "@/components/ui/tag";
import { beginning } from "@/content/our-story";

const number = (index: number) => String(index + 1).padStart(2, "0");

// Heading and photo stay pinned on the left (desktop) while the story reads down
// the right in three chapters.
export function Beginning() {
  return (
    <section aria-labelledby="beginning-title" className="section-space border-t border-line bg-surface">
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 xl:gap-24">
        <div data-sticky className="lg:sticky lg:top-[calc(var(--header-height)+2.5rem)] lg:self-start">
          <Tag>{beginning.label}</Tag>
          <BlockTitle
            id="beginning-title"
            lead={beginning.title.lead}
            highlight={beginning.title.highlight}
            stagger
            fit="always"
            surface="white"
            className="mt-6"
          />
          <figure className="relative mt-10 max-w-md">
            <SteppedFrame step="clamp(1rem, 0.6rem + 1.4vw, 1.75rem)" frameClassName="aspect-square">
              <Image
                src={beginning.image}
                alt={beginning.imageAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover object-[50%_15%] grayscale"
              />
            </SteppedFrame>
            <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-night px-3 py-2 font-heading text-[0.75rem] leading-none font-semibold tracking-[0.12em] text-white uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
              {beginning.caption}
            </figcaption>
          </figure>
        </div>

        <ol data-reveal="stagger" className="flex flex-col">
          {beginning.chapters.map((chapter, index) => (
            <li key={chapter.label} className="border-t border-line py-8 first:border-t-0 first:pt-0 last:pb-0 sm:py-10">
              <IndexLabel index={number(index)} label={chapter.label} />
              <div className="mt-5 space-y-5 text-lg text-muted">
                {chapter.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {chapter.question && (
                <p className="my-8 font-heading text-h3 leading-[1.3] font-semibold tracking-tight">
                  <span className="bg-primary px-[0.14em] text-primary-foreground box-decoration-clone">{chapter.question}</span>
                </p>
              )}
              {chapter.after && (
                <div className="space-y-5 text-lg text-muted">
                  {chapter.after.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
