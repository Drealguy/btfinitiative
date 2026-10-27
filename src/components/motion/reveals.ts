import { gsap } from "gsap";

// Scroll reveals. Mark an element with data-reveal="…":
//   title   — BlockTitle: each line wipes in from the left like a slider
//   image   — a photo frame unveils from the bottom while the photo settles from a zoom
//   up      — fades up
//   stagger — its children fade up one after another
// Elements start hidden through CSS (`.reveal [data-reveal]`), so nothing flashes before
// this runs. The `reveal` class is only set when JS runs and motion is allowed.

const handled = new WeakSet<Element>();

/**
 * True once React has hydrated the element. Streamed page content can sit in the DOM
 * before it is hydrated; touching its styles then makes hydration fail.
 */
export const isHydrated = (el: Element) => Object.keys(el).some((key) => key.startsWith("__reactFiber$"));

const EASE = "expo.inOut";

function reveal(el: HTMLElement) {
  const scrollTrigger = { trigger: el, start: "top 88%", once: true };
  gsap.set(el, { visibility: "visible" });

  switch (el.dataset.reveal) {
    case "title":
      gsap.fromTo(
        el.querySelectorAll(":scope > span"),
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE, stagger: 0.16, clearProps: "clipPath", scrollTrigger },
      );
      break;

    case "image": {
      const timeline = gsap.timeline({ scrollTrigger });
      timeline.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: EASE, clearProps: "clipPath" },
      );
      const image = el.querySelector("img");
      if (image) timeline.fromTo(image, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out", clearProps: "transform" }, 0);
      break;
    }

    case "stagger":
      gsap.fromTo(
        el.children,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.12, clearProps: "transform", scrollTrigger },
      );
      break;

    default:
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", clearProps: "transform", scrollTrigger },
      );
  }
}

/**
 * Sets up every not-yet-handled [data-reveal] element inside `root`.
 * Returns true if some are still waiting for hydration (call again shortly).
 */
export function setUpReveals(root: ParentNode = document) {
  let pending = false;
  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    if (handled.has(el)) return;
    if (!isHydrated(el)) {
      pending = true;
      return;
    }
    handled.add(el);
    reveal(el);
  });
  return pending;
}
