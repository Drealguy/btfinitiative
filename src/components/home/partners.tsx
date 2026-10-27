import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { BlockTitle } from "@/components/ui/block-title";
import { ButtonLink } from "@/components/ui/button-link";
import { IndexLabel } from "@/components/ui/index-label";
import { RisingSteps } from "@/components/ui/rising-steps";
import { Tag } from "@/components/ui/tag";
import { partners } from "@/content/home";

type Logo = (typeof partners.logos)[number];

// Simple placeholder logo marks — replace each with the partner's real SVG logo.
const marks: Record<Logo["mark"], ReactNode> = {
  ring: (
    <>
      <circle cx="14" cy="14" r="10.5" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="14" cy="14" r="4" fill="currentColor" />
    </>
  ),
  leaf: <path d="M5 23C5 12 12 5 23 5c0 11-7 18-18 18zm0 0l9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />,
  stack: (
    <>
      <rect x="4" y="5" width="20" height="4" rx="2" fill="currentColor" />
      <rect x="4" y="12" width="15" height="4" rx="2" fill="currentColor" />
      <rect x="4" y="19" width="20" height="4" rx="2" fill="currentColor" />
    </>
  ),
  wave: <path d="M3 17c3.5-5 7-5 11 0s7.5 5 11 0M3 10c3.5-5 7-5 11 0s7.5 5 11 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />,
  sun: (
    <>
      <path d="M6 20a8 8 0 0116 0z" fill="currentColor" />
      <path d="M14 4v4M5 8l2.5 2.5M23 8l-2.5 2.5M3 24h22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  diamond: (
    <>
      <rect x="6" y="6" width="16" height="16" transform="rotate(45 14 14)" fill="currentColor" />
      <rect x="11" y="11" width="6" height="6" transform="rotate(45 14 14)" fill="var(--surface)" />
    </>
  ),
  arch: <path d="M5 24V14a9 9 0 0118 0v10M11 24v-9a3 3 0 016 0v9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />,
  spark: <path d="M14 2l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="currentColor" />,
};

const wordmark: Record<Logo["style"], string> = {
  title: "text-xl font-semibold tracking-tight",
  upper: "text-sm font-bold tracking-[0.18em] uppercase",
  bold: "text-2xl font-extrabold tracking-tighter",
};

function PartnerLogo({ logo, featured = false }: { logo: Logo; featured?: boolean }) {
  return (
    <span className={`flex items-center font-heading leading-tight ${featured ? "gap-4" : "gap-2.5"}`}>
      <svg viewBox="0 0 28 28" aria-hidden="true" className={`shrink-0 ${featured ? "size-11 sm:size-14" : "size-7"}`}>
        {marks[logo.mark]}
      </svg>
      <span className={featured ? "text-h2 font-bold tracking-tight" : wordmark[logo.style]}>{logo.name}</span>
    </span>
  );
}

const cellBase = "flex min-h-36 flex-col justify-between gap-6 p-4 sm:min-h-40 sm:p-6";

// Partner grid: the principal partner as a large featured tile, the rest in a bordered
// grid, and a final tile inviting new partners. 2 columns on phones/tablets, 4 from 1024px.
export function Partners() {
  const [featured, ...rest] = partners.logos;
  const number = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <section aria-labelledby="partners-title" className="section-space relative isolate overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="texture-grid absolute inset-0 -z-10 [mask-image:radial-gradient(110%_70%_at_50%_0%,black_30%,transparent_80%)]"
      />

      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Tag>{partners.label}</Tag>
            <BlockTitle
              id="partners-title"
              lead={partners.title.lead}
              highlight={partners.title.highlight}
              stagger
              fit
              className="mt-6 text-h1"
            />
          </div>
          <ButtonLink href={partners.cta.href} size="lg" variant="light" icon className="shrink-0 self-start lg:self-auto">
            {partners.cta.label}
          </ButtonLink>
        </div>

        <ul data-reveal="stagger" className="mt-12 grid grid-cols-2 gap-px border border-line bg-line sm:mt-16 lg:grid-cols-4">
          <li className="on-dark relative isolate col-span-2 flex min-h-72 flex-col justify-between gap-10 overflow-hidden bg-night p-5 text-white sm:min-h-80 sm:p-8 lg:row-span-2">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <Image
                src={partners.featuredImage}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover object-[70%_40%] grayscale"
              />
              <div className="absolute inset-0 bg-linear-to-t from-night via-night/80 to-night/35" />
              <div className="texture-glow absolute inset-0" />
              <div className="texture-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
              <RisingSteps className="absolute top-5 right-5 w-16 sm:top-8 sm:right-8 sm:w-24" />
            </div>
            <IndexLabel tone="dark" index={number(0)} label={featured.role} />
            <div>
              <PartnerLogo logo={featured} featured />
              <p className="mt-4 text-sm text-white/70">{partners.featuredDetail}</p>
            </div>
          </li>

          {rest.map((logo, index) => (
            <li key={logo.name} className={`${cellBase} bg-surface text-night`}>
              <IndexLabel index={number(index + 1)} label={logo.role} />
              <PartnerLogo logo={logo} />
            </li>
          ))}

          <li className="flex">
            <Link
              href={partners.invite.href}
              className={`${cellBase} group w-full bg-sun-tint text-night transition-colors duration-300 hover:bg-sun`}
            >
              <IndexLabel index={number(partners.logos.length)} label={partners.invite.label} />
              <span className="font-heading text-h4 font-semibold tracking-tight">
                {partners.invite.text}
                <ArrowRightIcon className="ml-2 inline-block size-5 align-[-0.1em] transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
