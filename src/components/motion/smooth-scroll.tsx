"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { isHydrated, setUpReveals } from "@/components/motion/reveals";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

// Smooth scrolling only for desktop mouse/trackpad users. Touch devices keep native
// scrolling (and CSS sticky, which ScrollSmoother's transforms would break).
const SMOOTH_QUERY = "(min-width: 64rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const RETRY_MS = 100;

const headerHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) * 16;

/** Scrolls to an element, through ScrollSmoother when it is running. */
export function scrollToElement(el: HTMLElement) {
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(el, true, `top ${headerHeight()}px`);
  else el.scrollIntoView({ block: "start" });
}

// Page wrapper: ScrollSmoother on desktop, scroll reveals everywhere (unless reduced motion).
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const revealTimer = useRef(0);

  // The smoother lives as long as the layout; matchMedia creates/kills it across breakpoints.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(SMOOTH_QUERY, () => {
      const smoother = ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.1, effects: true });
      return () => smoother.kill();
    });
    return () => mm.revert();
  });

  // Per page: CSS sticky doesn't work inside the smoother, so [data-sticky] elements are
  // pinned instead — same behaviour: stick at their CSS `top` until their parent ends.
  // Elements are pinned once hydrated (pinning moves them into a wrapper div).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(SMOOTH_QUERY, (context) => {
        const pinned = new WeakSet<Element>();
        let timer = 0;
        const pinAll = () => {
          let pending = false;
          context.add(() => {
            gsap.utils.toArray<HTMLElement>("[data-sticky]").forEach((el) => {
              if (pinned.has(el)) return;
              if (!isHydrated(el)) {
                pending = true;
                return;
              }
              pinned.add(el);
              const top = parseFloat(getComputedStyle(el).top) || 0;
              gsap.set(el, { position: "relative", top: 0 });
              ScrollTrigger.create({
                trigger: el,
                start: `top ${top}`,
                endTrigger: el.parentElement,
                end: `bottom ${top + el.offsetHeight}`,
                pin: true,
                pinSpacing: false,
              });
            });
          });
          if (pending) timer = window.setTimeout(pinAll, RETRY_MS);
          else ScrollTrigger.refresh();
        };
        pinAll();
        return () => window.clearTimeout(timer);
      });
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  // Reveals. Not reverted between pages: the footer's finished reveals must stay shown.
  // Content that streams in or hydrates later is picked up by retrying shortly.
  const runReveals = () => {
    window.clearTimeout(revealTimer.current);
    if (!document.documentElement.classList.contains("reveal")) return;
    if (setUpReveals()) revealTimer.current = window.setTimeout(runReveals, RETRY_MS);
  };

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const content = document.getElementById("smooth-content");
    const observer = new MutationObserver(runReveals);
    if (content) observer.observe(content, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      window.clearTimeout(revealTimer.current);
    };
    // runReveals only reads refs and the DOM.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On navigation: jump (don't glide) to the top or to the #hash target, then re-measure.
  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
      if (target) smoother.scrollTo(target, false, `top ${headerHeight()}px`);
      else smoother.scrollTop(0);
    }
    runReveals();
    ScrollTrigger.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content" className="flex min-h-svh flex-col pt-(--header-height)">
        {children}
      </div>
    </div>
  );
}
