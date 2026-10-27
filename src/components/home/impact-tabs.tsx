"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { IndexLabel } from "@/components/ui/index-label";
import { SteppedFrame } from "@/components/ui/stepped-frame";

export type ImpactStory = {
  name: string;
  business: string;
  location: string;
  image: StaticImageData;
  story: string[];
  quote: string;
};

const storyNumber = (index: number) => String(index + 1).padStart(2, "0");

function AllStoriesLink({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`group items-center gap-2 self-start border-b border-night pb-1.5 font-heading text-[0.8125rem] font-semibold tracking-[0.14em] text-night uppercase transition-colors duration-200 hover:border-primary hover:text-primary-ink ${className}`}
    >
      {label}
      <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

// Names on the left act as tabs; the selected person's story and photo show in the card.
export function ImpactTabs({ stories, cta }: { stories: ImpactStory[]; cta: { label: string; href: string } }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  // Arrow keys move between people (standard tabs keyboard pattern).
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = stories.length - 1;
    const next = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowRight: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      {/* One bordered panel: people (tabs) on the left, the selected story on the right. */}
      <div data-reveal="stagger" className="grid gap-px border border-line bg-line lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div className="flex flex-col gap-px">
          <div
            role="tablist"
            aria-label="Impact stories"
            aria-orientation="vertical"
            className="grid grid-cols-2 gap-px lg:grid-cols-1"
          >
            {stories.map((story, index) => {
              const selected = index === active;
              return (
                <button
                  key={story.name}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${index}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${index}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={`flex flex-col items-start p-4 text-left transition-colors duration-300 sm:p-5 lg:p-6 ${
                    selected ? "bg-primary text-primary-foreground" : "bg-surface text-night hover:bg-sun-tint"
                  }`}
                >
                  <IndexLabel tone={selected ? "accent" : "light"} index={storyNumber(index)} label={story.business} />
                  <span className="mt-3 font-heading text-lg font-semibold tracking-tight sm:text-xl lg:text-h4">{story.name}</span>
                  <span className={`mt-0.5 text-sm ${selected ? "text-ink/70" : "text-muted"}`}>{story.location}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop: fills the rest of the column under the names. */}
          <div className="hidden flex-1 items-end bg-surface p-6 lg:flex">
            <AllStoriesLink {...cta} className="inline-flex" />
          </div>
        </div>

        {/* All panels share one grid cell, so the card keeps the height of the longest story. */}
        <div className="grid bg-surface">
          {stories.map((story, index) => {
            const selected = index === active;
            return (
              <article
                key={story.name}
                role="tabpanel"
                id={`${baseId}-panel-${index}`}
                aria-labelledby={`${baseId}-tab-${index}`}
                inert={!selected}
                className={`col-start-1 row-start-1 grid transition-[opacity,translate] duration-500 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] ${
                  selected ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                }`}
              >
                <div className="p-3 sm:p-4 md:order-last md:pl-0">
                  <SteppedFrame
                    step="clamp(1rem, 0.6rem + 1.4vw, 1.75rem)"
                    className="h-full"
                    frameClassName="aspect-[4/3] sm:aspect-[16/10] md:aspect-auto md:h-full md:min-h-[28rem]"
                  >
                    <Image
                      src={story.image}
                      alt={`${story.name} at their ${story.business.toLowerCase()}`}
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 768px) 40vw, 100vw"
                      placeholder="blur"
                      className="object-cover object-top"
                    />
                  </SteppedFrame>
                </div>

                <div className="flex flex-col px-5 pt-3 pb-6 sm:px-8 sm:pb-8 md:pt-8">
                  <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
                    <IndexLabel index={storyNumber(index)} label="Story" />
                    <span className="font-heading text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase">
                      [&nbsp;{story.location}&nbsp;]
                    </span>
                  </div>
                  <h3 className="mt-6 text-h3 text-night">{story.name}</h3>
                  <span className="mt-3 self-start bg-sun-tint px-2 py-0.5 text-sm font-medium text-night">{story.business}</span>
                  <div className="mt-5 space-y-4 text-muted">
                    {story.story.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-6 md:mt-auto md:pt-6">
                    <blockquote className="border-l-2 border-primary pl-4 font-heading text-lg leading-snug font-semibold tracking-tight text-night">
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <AllStoriesLink {...cta} className="mt-8 inline-flex lg:hidden" />
    </>
  );
}
