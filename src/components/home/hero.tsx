import Image from "next/image";
import { BlockTitle } from "@/components/ui/block-title";
import { ButtonLink } from "@/components/ui/button-link";
import { FactSheet } from "@/components/ui/fact-sheet";
import { SteppedFrame } from "@/components/ui/stepped-frame";
import { Tag } from "@/components/ui/tag";
import { hero, heroProof } from "@/content/home";

function HeroProof() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex shrink-0 -space-x-3">
        {heroProof.avatars.map((avatar) => (
          <Image
            key={avatar.src}
            src={avatar}
            alt=""
            width={44}
            height={44}
            sizes="44px"
            className="size-11 rounded-full object-cover object-[50%_25%] ring-3 ring-paper"
          />
        ))}
      </div>
      <p className="leading-snug">
        <span className="block font-bold text-ink">
          {heroProof.stat} {heroProof.statLabel}
        </span>
        <span className="block text-sm text-muted">{heroProof.detail}</span>
      </p>
    </div>
  );
}

// Stepped photo with a label chip and a small fact sheet laid over it.
function HeroPhoto() {
  return (
    <figure className="relative">
      <SteppedFrame frameClassName="aspect-[5/4] sm:aspect-[3/2] lg:aspect-[4/5] lg:max-h-[calc(100svh-var(--header-height)-11rem)] lg:min-h-[26rem]">
        <Image
          src={hero.image}
          alt="A shopkeeper behind the counter of a well-stocked provision store"
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 80rem) 34rem, (min-width: 64rem) 42vw, 100vw"
          className="object-cover object-[50%_40%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-night-deep/45 to-transparent" />
      </SteppedFrame>

      <span className="absolute top-3 right-3 inline-flex items-center gap-2 bg-night px-3 py-2 font-heading text-[0.75rem] leading-none font-semibold tracking-[0.12em] text-white uppercase sm:top-4 sm:right-4">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-sun" />
        {hero.imageLabel}
      </span>

      <FactSheet facts={hero.facts} className="mt-3 sm:absolute sm:bottom-4 sm:left-4 sm:mt-0 sm:w-[19rem] lg:bottom-5 lg:left-5" />
    </figure>
  );
}

export function Hero() {
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-paper lg:min-h-[calc(100svh-var(--header-height))]">
      <div
        aria-hidden="true"
        className="texture-grid absolute inset-0 -z-10 [mask-image:radial-gradient(120%_90%_at_50%_0%,black_40%,transparent_85%)]"
      />

      <div className="container-site flex flex-1 flex-col pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pb-14 short:pt-6 short:pb-8">
        <div className="flex items-center justify-between gap-6">
          <Tag>{hero.eyebrow}</Tag>
          <p className="hidden font-heading text-[0.75rem] font-semibold tracking-[0.16em] text-muted uppercase lg:block">
            [&nbsp;{hero.note}&nbsp;]
          </p>
        </div>

        <div className="mt-8 grid flex-1 items-center gap-10 sm:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20 short:mt-6">
          <div>
            <BlockTitle
              as="h1"
              lead={hero.title.lead}
              highlight={hero.title.highlight}
              className="text-display short:text-[clamp(2.75rem,0.75rem+4vw,4.25rem)]"
            />

            <p data-reveal="up" className="mt-7 max-w-xl text-lead text-muted short:mt-5">{hero.description}</p>

            <div data-reveal="up" className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 short:mt-6">
              <ButtonLink href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} size="lg" variant="light" icon>
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>

            <div data-reveal="up" className="mt-9 short:mt-6">
              <HeroProof />
            </div>
          </div>

          <HeroPhoto />
        </div>
      </div>
    </section>
  );
}
