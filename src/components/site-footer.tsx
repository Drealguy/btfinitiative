import Image from "next/image";
import Link from "next/link";
import butcher from "@/assets/hero/butcher.jpg";
import { CurrentYear } from "@/components/current-year";
import { ArrowUpIcon, ArrowUpRightIcon, YouTubeIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { BlockTitle } from "@/components/ui/block-title";
import { ButtonLink } from "@/components/ui/button-link";
import { FactSheet } from "@/components/ui/fact-sheet";
import { PixelText } from "@/components/ui/pixel-text";
import { SteppedFrame } from "@/components/ui/stepped-frame";
import { footerContent, youtubeChannel } from "@/lib/navigation";

const labelClass = "font-heading text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase";

// Closing banner: stepped photo with the call to action and a fact sheet beside it.
function FooterBanner() {
  const { cta } = footerContent;

  return (
    <div className="relative">
      <SteppedFrame
        step="clamp(1.25rem, 0.6rem + 2.4vw, 3rem)"
        frameClassName="flex min-h-[20rem] sm:min-h-[24rem] lg:min-h-[26rem]"
      >
        <Image
          src={butcher}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 80rem) 75rem, 100vw"
          className="object-cover object-[75%_35%]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-night-deep/75 via-night-deep/35 to-night-deep/10" />

        <div className="relative flex flex-1 flex-col justify-center px-6 py-14 sm:px-10 lg:px-14 lg:pr-[24rem]">
          <span className="self-start bg-night px-2 py-1 font-heading text-[0.75rem] font-semibold tracking-[0.12em] text-white">
            {cta.hashtag}
          </span>
          <BlockTitle lead={cta.title.lead} highlight={cta.title.highlight} stagger fit className="mt-4 text-display" />
        </div>
      </SteppedFrame>

      <FactSheet facts={cta.facts} className="mt-3 lg:absolute lg:top-1/2 lg:right-10 lg:mt-0 lg:w-80 lg:-translate-y-1/2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <ButtonLink href={cta.primary.href}>{cta.primary.label}</ButtonLink>
          <Link
            href={cta.secondary.href}
            className="font-bold text-night underline-offset-4 transition-colors duration-200 hover:text-primary-ink hover:underline"
          >
            {cta.secondary.label}
          </Link>
        </div>
      </FactSheet>
    </div>
  );
}

export function SiteFooter() {
  const { tagline, about, columns, watch } = footerContent;

  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-paper text-ink">
      <div
        aria-hidden="true"
        className="texture-grid absolute inset-0 -z-10 [mask-image:radial-gradient(110%_60%_at_50%_0%,black_30%,transparent_80%)]"
      />

      <div className="container-site pt-16 sm:pt-20 lg:pt-24">
        <FooterBanner />

        {/* Brand + links */}
        <div data-reveal="stagger" className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.75fr)_minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Beyond The Fall Initiative — home" className="inline-block rounded-md">
              <Logo className="h-20 sm:h-24" />
            </Link>
            <p className="mt-5 max-w-xs text-sm text-muted">{about}</p>
            <a
              href={youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Beyond Before on YouTube"
              className="mt-5 grid size-10 place-items-center rounded-full border border-line bg-surface text-night transition-colors duration-200 hover:border-primary hover:text-primary-ink"
            >
              <YouTubeIcon className="size-4" />
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className={labelClass}>[&nbsp;{column.title}&nbsp;]</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="font-medium text-ink transition-colors duration-200 hover:text-primary-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <h3 className={labelClass}>[&nbsp;{watch.title}&nbsp;]</h3>
            <p className="mt-5 max-w-sm font-heading text-h4 font-semibold tracking-tight text-night">{watch.text}</p>
            {/* Styled like an input pill; it is a plain link to the channel. */}
            <a
              href={youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 flex h-13 max-w-sm items-center justify-between gap-3 rounded-full border border-line bg-surface pr-1.5 pl-5 transition-colors duration-200 hover:border-primary"
            >
              <span className="flex min-w-0 items-center gap-2.5 font-medium text-ink">
                <YouTubeIcon aria-hidden="true" className="size-5 shrink-0 text-primary" />
                <span className="truncate">{watch.label}</span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-night text-white transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRightIcon className="size-4" />
              </span>
            </a>
          </div>
        </div>

        {/* Oversized pixel wordmark — two lines from 640px, three on phones. Each line's
            width is proportional to its length so all letters share one pixel size. */}
        <div aria-hidden="true" data-reveal="up" className="text-night">
          <div className="hidden flex-col gap-[1.1vw] sm:flex">
            <PixelText value="BEYOND THE FALL" accentFrom={11} className="w-full" />
            <PixelText value="INITIATIVE" className="w-[66.3%]" />
          </div>
          <div className="flex flex-col gap-[2.2vw] sm:hidden">
            <PixelText value="BEYOND" className="w-[59.3%]" />
            <PixelText value="THE FALL" accentFrom={4} className="w-[79.7%]" />
            <PixelText value="INITIATIVE" className="w-full" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className={labelClass}>
            © <CurrentYear /> Beyond The Fall Initiative · Nigeria
          </p>
          <p className={`hidden xl:block ${labelClass}`}>[&nbsp;{tagline}&nbsp;]</p>
          <a
            href="#top"
            className={`group inline-flex h-10 shrink-0 items-center gap-3 self-start rounded-full whitespace-nowrap border border-line bg-surface pr-1 pl-4 transition-colors duration-200 hover:border-primary sm:self-auto ${labelClass} text-ink`}
          >
            Back to top
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <ArrowUpIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
