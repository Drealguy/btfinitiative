"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button-link";
import { primaryNav, supportCta } from "@/lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const closeMenu = () => setMenuOpen(false);

  // Lift the header with a shadow once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // While the mobile menu is open: lock page scroll, close on Escape or on resize to desktop.
  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-surface transition-[border-color,box-shadow] duration-300 ${
        scrolled || menuOpen
          ? "border-line shadow-[0_8px_24px_-16px_rgb(28_26_23/0.25)]"
          : "border-transparent"
      }`}
    >
      <div className="container-site flex h-(--header-height) items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="Beyond The Fall Initiative — home"
          onClick={closeMenu}
          className="justify-self-start rounded-md"
        >
          <Logo eager />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-11">
            {primaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block py-2 text-[1.0625rem] font-medium transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-primary after:transition-transform after:duration-300 ${
                      active
                        ? "text-primary-ink after:scale-x-100"
                        : "text-ink after:scale-x-0 hover:text-primary-ink hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 justify-self-end sm:gap-3">
          <ButtonLink
            href={supportCta.href}
            size="responsive"
            className="max-sm:hidden"
          >
            {supportCta.label}
          </ButtonLink>

          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-ink/5 lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3.5 w-5.5">
              <span
                className={`absolute top-0 left-0 h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute top-3 left-0 h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`fixed inset-x-0 top-(--header-height) bottom-0 overflow-y-auto bg-surface transition-[opacity,translate] duration-300 lg:hidden ${
          menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Primary" className="container-site flex min-h-full flex-col pt-4 pb-10">
          <ul className="flex flex-col">
            {primaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMenu}
                    className={`flex items-center justify-between py-5 font-heading text-h4 font-semibold tracking-tight transition-colors duration-200 ${
                      active ? "text-primary-ink" : "text-ink hover:text-primary-ink"
                    }`}
                  >
                    {item.label}
                    {active && <span aria-hidden="true" className="size-2 rounded-full bg-primary" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex flex-col gap-5 pt-10">
            <p className="max-w-xs text-muted">
              A fall should never mean the end of someone&apos;s story.
            </p>
            <ButtonLink href={supportCta.href} size="lg" onClick={closeMenu} className="w-full">
              {supportCta.label}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
