import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { BlockTitle } from "@/components/ui/block-title";
import { ButtonLink } from "@/components/ui/button-link";
import { IndexLabel } from "@/components/ui/index-label";
import { PixelText } from "@/components/ui/pixel-text";
import { SteppedFrame } from "@/components/ui/stepped-frame";
import { Tag } from "@/components/ui/tag";
import { whatWeDo } from "@/content/home";

// One column of the panel: a numbered label on top, content below.
function Panel({ index, label, className = "", children }: { index: string; label: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col bg-surface p-6 sm:p-8 ${className}`}>
      <IndexLabel index={index} label={label} />
      {children}
    </div>
  );
}

export function WhatWeDo() {
  const { purpose, ways, offer } = whatWeDo;

  return (
    <section aria-labelledby="what-we-do-title" className="section-space relative isolate overflow-hidden border-t border-line bg-paper">
      <div
        aria-hidden="true"
        className="texture-grid absolute inset-0 -z-10 [mask-image:radial-gradient(110%_70%_at_50%_0%,black_30%,transparent_80%)]"
      />

      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-end lg:gap-12">
          <div>
            <Tag>{whatWeDo.label}</Tag>
            <BlockTitle
              id="what-we-do-title"
              lead={whatWeDo.title.lead}
              highlight={whatWeDo.title.highlight}
              stagger
              fit
              className="mt-6 text-h1"
            />
          </div>
          <p data-reveal="up" className="max-w-md text-lg text-muted lg:justify-self-end lg:text-right">{whatWeDo.description}</p>
        </div>

        {/* Three columns from 1024px; on tablets the first spans the full width above the other two. */}
        <div data-reveal="stagger" className="mt-12 grid gap-px border border-line bg-line sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          <Panel index="01" label={purpose.label} className="md:col-span-2 lg:col-span-1">
            {/* Tablets: text left, photo right. Elsewhere: photo top-right, text below. */}
            <div className="flex flex-1 flex-col md:max-lg:flex-row-reverse md:max-lg:items-end md:max-lg:gap-10">
              <SteppedFrame
                step="clamp(1rem, 0.6rem + 1.4vw, 1.75rem)"
                className="mt-6 -mr-6 ml-auto w-3/5 max-w-xs shrink-0 sm:-mr-8 md:max-lg:w-2/5 lg:max-w-none"
                frameClassName="aspect-square"
              >
                <Image
                  src={purpose.image}
                  alt="A smiling stall owner holding a phone behind her counter"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 18rem, (min-width: 768px) 40vw, 60vw"
                  className="object-cover object-[55%_30%]"
                />
              </SteppedFrame>

              <div className="mt-auto flex flex-col pt-10 md:max-lg:flex-1">
                <p className="max-w-md font-heading text-h4 leading-tight font-semibold tracking-tight text-night/45 lg:text-h3 lg:leading-tight">
                  {purpose.statement.map((part) =>
                    part.strong ? (
                      <strong key={part.text} className="font-semibold text-night">
                        {part.text}
                      </strong>
                    ) : (
                      part.text
                    ),
                  )}
                </p>

                <ButtonLink href={whatWeDo.cta.href} size="lg" className="mt-8 self-start">
                  {whatWeDo.cta.label}
                </ButtonLink>
              </div>
            </div>
          </Panel>

          <Panel index="02" label={ways.label}>
            <PixelText value={ways.figure} className="mt-10 h-16 w-auto self-start text-night sm:h-20" />
            <p className="mt-5 max-w-60 font-bold text-ink">
              <span className="sr-only">{Number(ways.figure)} </span>
              {ways.caption}
            </p>

            <div className="mt-auto -mb-6 pt-10 sm:-mb-8">
              <div data-reveal="image" className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={ways.image}
                  alt="A shopkeeper leaning on the glass counter of his shop"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 24rem, (min-width: 768px) 45vw, 100vw"
                  className="object-cover object-[65%_40%]"
                />
                <Tag className="absolute top-3 left-3">{ways.imageLabel}</Tag>
              </div>
            </div>
          </Panel>

          <Panel index="03" label={offer.label}>
            <div className="my-auto py-10">
              <p className="max-w-sm text-muted">{offer.description}</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {whatWeDo.items.map((item) => (
                  <li key={item.label} className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center bg-primary text-primary-foreground">
                      <CheckIcon className="size-3.5" />
                    </span>
                    <span className="bg-sun-tint px-2 py-0.5 font-medium text-night">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={whatWeDo.link.href}
              className="group inline-flex items-center gap-2 self-start border-b border-night pb-1.5 font-heading text-[0.8125rem] font-semibold tracking-[0.14em] text-night uppercase transition-colors duration-200 hover:border-primary hover:text-primary-ink"
            >
              {whatWeDo.link.label}
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Panel>
        </div>
      </div>
    </section>
  );
}
