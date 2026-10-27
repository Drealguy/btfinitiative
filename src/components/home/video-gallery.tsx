"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, CloseIcon, PlayIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export type Video = {
  id: string;
  title: string;
  tags: readonly string[];
  /** Short hook shown above the title. */
  kicker?: string;
  summary?: string;
  guest?: { name: string; role: string };
};

const thumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

type VideoGalleryProps = {
  videos: readonly Video[];
  /** Where the videos come from, shown on each card. */
  source: string;
  /** Used when a video has no summary of its own. */
  summary: string;
};

// Split cards — text left, thumbnail right — that stack on top of each other as you scroll
// from 1024px; below that they sit in a swipeable row. Each opens an in-page player.
export function VideoGallery({ videos, source, summary }: VideoGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<Video | null>(null);

  const open = (video: Video) => {
    setCurrent(video);
    dialogRef.current?.showModal();
  };

  // Lock page scroll while the player is open.
  useEffect(() => {
    if (!current) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [current]);

  return (
    <>
      {/* Phones/tablets: horizontal snap row bleeding to the screen edges, next card peeking in. */}
      <ol className="-mx-[clamp(1rem,4vw,2.5rem)] flex snap-x snap-mandatory scroll-px-[clamp(1rem,4vw,2.5rem)] gap-4 overflow-x-auto px-[clamp(1rem,4vw,2.5rem)] pb-2 [scrollbar-width:none] lg:mx-0 lg:snap-none lg:flex-col lg:gap-10 lg:overflow-visible lg:px-0 lg:pb-0">
        {videos.map((video, index) => (
          <li
            key={video.id}
            data-sticky
            className="flex w-[86%] max-w-md shrink-0 snap-start lg:sticky lg:w-auto lg:max-w-none"
            style={{ top: `calc(var(--header-height) + 1.5rem + ${index} * 1.25rem)` }}
          >
            <article data-reveal="up" className="on-light flex w-full flex-col overflow-hidden bg-surface text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)] lg:grid lg:min-h-[24rem] lg:grid-cols-[1fr_1.3fr]">
              <div className="order-2 flex flex-1 flex-col p-5 sm:p-8 lg:order-1 lg:p-10 short:lg:p-8">
                <div className="flex items-center justify-between gap-4 border-b border-line pb-4 font-heading text-[0.75rem] font-semibold tracking-[0.14em] uppercase">
                  <span className="text-primary-ink">— {String(index + 1).padStart(2, "0")}</span>
                  <span className="text-muted">[&nbsp;{source}&nbsp;]</span>
                </div>

                {video.kicker && (
                  <p className="mt-6 font-heading font-semibold tracking-tight text-primary-ink lg:mt-8">{video.kicker}</p>
                )}
                <h3 className={`max-w-xl text-h4 text-night sm:text-h3 ${video.kicker ? "mt-2" : "mt-6 lg:mt-8"}`}>{video.title}</h3>

                <div className="mt-6 flex flex-1 flex-col justify-end lg:mt-auto lg:flex-none lg:pt-8">
                  {video.guest && (
                    <p className="mb-4 border-l-2 border-primary pl-3 leading-snug">
                      <span className="block font-heading text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase">Guest</span>
                      <span className="mt-1 block font-bold text-night">{video.guest.name}</span>
                      <span className="block text-sm text-muted">{video.guest.role}</span>
                    </p>
                  )}
                  <p className="max-w-md text-muted">{video.summary ?? summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {video.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-line px-2 py-1 font-heading text-[0.75rem] leading-none font-semibold tracking-[0.12em] text-muted uppercase"
                      >
                        # {tag}
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="lg"
                    onClick={() => open(video)}
                    aria-label={`Watch the story: ${video.title}`}
                    className="mt-6 self-start short:lg:mt-5"
                  >
                    <PlayIcon className="size-4" />
                    Watch the story
                  </Button>
                </div>
              </div>

              {/* Mouse shortcut to the same player; keyboard and screen-reader users get the button above. */}
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => open(video)}
                className="group relative order-1 aspect-video overflow-hidden bg-night-deep lg:order-2 lg:aspect-auto"
              >
                {/* Blurred copy fills the frame; the full 16:9 thumbnail sits on top uncropped. */}
                <Image
                  src={thumbnail(video.id)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 44rem, 100vw"
                  className="scale-125 object-cover opacity-60 blur-2xl"
                />
                <Image
                  src={thumbnail(video.id)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 44rem, 100vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-night-deep/10 transition-colors duration-300 group-hover:bg-transparent" />
                <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-110 sm:size-16 lg:size-20">
                  <PlayIcon className="ml-0.5 size-5 sm:ml-1 sm:size-6 lg:size-7" />
                </span>
              </button>
            </article>
          </li>
        ))}
      </ol>

      <dialog
        ref={dialogRef}
        aria-label={current?.title ?? "Video player"}
        onClose={() => setCurrent(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close();
        }}
        className="on-dark m-auto w-[min(100%-2rem,64rem)] max-w-none overflow-visible bg-transparent p-0 text-white backdrop:bg-night-deep/85 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-heading text-base font-semibold tracking-tight sm:text-lg">{current.title}</p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close video"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>
            <div className="aspect-video overflow-hidden rounded-2xl bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0`}
                title={current.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="size-full"
              />
            </div>
            <a
              href={watchUrl(current.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 self-start font-bold text-sun transition-colors duration-200 hover:text-white"
            >
              Watch on YouTube
              <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        )}
      </dialog>
    </>
  );
}
