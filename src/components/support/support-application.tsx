"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { submitApplication } from "@/app/get-support/actions";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@/components/icons";
import {
  CheckboxField,
  ChoiceGroup,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/support/fields";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { RisingSteps } from "@/components/ui/rising-steps";
import { scrollToElement } from "@/components/motion/smooth-scroll";
import { Tag } from "@/components/ui/tag";
import { supportIntro, supportOptions, supportSteps } from "@/content/get-support";
import {
  emptyApplication,
  validateStep,
  type SupportApplication as Answers,
  type SupportErrors,
} from "@/lib/support-application";

type Stage = "welcome" | "questions" | "done";

const pad = (n: number) => String(n).padStart(2, "0");
const gutter = "px-4 sm:px-8 lg:px-12 xl:px-20";

// One-question-at-a-time support application: welcome → 7 questions → thank you.
export function SupportApplication() {
  const [stage, setStage] = useState<Stage>("welcome");
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [answers, setAnswers] = useState<Answers>(emptyApplication);
  const [errors, setErrors] = useState<SupportErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, startSubmit] = useTransition();
  const panelRef = useRef<HTMLElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  const step = supportSteps[stepIndex];
  const total = supportSteps.length;
  const isLast = stepIndex === total - 1;
  const firstName = answers.fullName.trim().split(/\s+/)[0] || "";
  const personalise = (text: string) =>
    firstName ? text.replaceAll("{name}", firstName) : text.replace(/,? ?\{name\}/g, "");

  const update = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  // On every new screen: bring it into view and move focus to it.
  useEffect(() => {
    const panel = panelRef.current;
    if (panel && panel.getBoundingClientRect().top < 0) scrollToElement(panel);
    if (stage !== "questions") return;
    const container = stepRef.current;
    if (!container) return;
    // Desktop: straight into the first field. Touch: focus the question, so the keyboard doesn't pop up.
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    const field = pointerFine ? container.querySelector<HTMLElement>("input, select, textarea") : null;
    (field ?? container.querySelector<HTMLElement>("h2"))?.focus({ preventScroll: true });
  }, [stage, stepIndex]);

  const start = () => {
    setDirection("forward");
    setStage("questions");
  };

  const goBack = () => {
    setErrors({});
    setDirection("back");
    if (stepIndex === 0) setStage("welcome");
    else setStepIndex((index) => index - 1);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const stepErrors = validateStep(step.id, answers);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      requestAnimationFrame(() => stepRef.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus());
      return;
    }
    if (!isLast) {
      setDirection("forward");
      setStepIndex((index) => index + 1);
      return;
    }
    setSubmitError(null);
    startSubmit(async () => {
      const result = await submitApplication(answers);
      if (result.ok) {
        setDirection("forward");
        setStage("done");
      } else {
        setSubmitError(result.error);
      }
    });
  };

  const stepStatus = (index: number) => {
    if (stage === "done" || (stage === "questions" && index < stepIndex)) return "done";
    if (stage === "questions" && index === stepIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="grid min-h-[calc(100svh-var(--header-height))] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* Intro + step overview. On phones it only shows on the welcome screen. */}
      <aside
        className={`on-dark relative isolate overflow-hidden bg-night text-white ${stage === "welcome" ? "" : "max-lg:hidden"}`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={supportIntro.image}
            alt=""
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover object-[center_25%]"
          />
          {/* Maroon wash: strongest behind the heading and steps, letting the photo through at the bottom. */}
          <div className="absolute inset-0 bg-linear-to-b from-night/95 via-night/85 via-55% to-night/45" />
          <div className="texture-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
          <RisingSteps className="absolute right-6 bottom-8 w-16 opacity-60 lg:right-10 lg:bottom-10 lg:w-24" />
        </div>

        <div className={`flex h-full flex-col py-12 sm:py-14 lg:py-16 short:py-10 ${gutter} xl:px-16`}>
          <Tag>{supportIntro.label}</Tag>
          <h1 className="mt-6 text-h2 text-white lg:text-h1 short:text-h2">
            {supportIntro.title.lead} <span className="text-sun">{supportIntro.title.highlight}</span>
          </h1>
          <p className="mt-5 max-w-md text-lead text-white/80 short:mt-4 short:text-lg">{supportIntro.description}</p>

          <ol aria-label="Application steps" className="mt-10 hidden flex-col gap-0.5 lg:flex short:mt-7">
            {supportSteps.map((item, index) => {
              const status = stepStatus(index);
              return (
                <li key={item.id} className="flex items-center gap-4 py-1.5 short:py-1">
                  <span
                    aria-hidden="true"
                    className={`grid size-8 shrink-0 place-items-center rounded-lg font-heading text-sm font-semibold transition-colors duration-300 short:size-7 ${
                      status === "done"
                        ? "bg-sun text-night"
                        : status === "current"
                          ? "bg-primary text-primary-foreground"
                          : "bg-white/5 text-white/50 ring-1 ring-white/10"
                    }`}
                  >
                    {status === "done" ? <CheckIcon className="size-3.5" /> : pad(index + 1)}
                  </span>
                  <span
                    className={`transition-colors duration-300 ${
                      status === "current" ? "font-bold text-white" : status === "done" ? "text-white/85" : "text-white/55"
                    }`}
                  >
                    {item.title}
                    {status !== "upcoming" && <span className="sr-only"> ({status === "done" ? "completed" : "current step"})</span>}
                  </span>
                </li>
              );
            })}
          </ol>

          <ul className="mt-10 flex flex-wrap gap-2 lg:mt-auto lg:pt-10 short:pt-6">
            {supportIntro.facts.map((fact) => (
              <li key={fact} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/85 ring-1 ring-white/10">
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <section ref={panelRef} aria-label="Support application" className="flex scroll-mt-(--header-height) flex-col bg-paper">
        {stage === "welcome" && (
          <div className={`flex flex-1 items-center py-12 sm:py-16 ${gutter}`}>
            <div className="mx-auto w-full max-w-xl animate-step-forward">
              <p className="text-sm font-bold tracking-[0.14em] text-primary-ink uppercase">{supportIntro.welcome.eyebrow}</p>
              <h2 className="mt-3 text-h2 text-night">{supportIntro.welcome.title}</h2>
              <p className="mt-4 text-lg text-muted">{supportIntro.welcome.description}</p>
              <ul className="mt-8 grid gap-3">
                {supportIntro.welcome.checklist.map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 font-medium text-night ring-1 ring-line">
                    <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center bg-primary">
                      <span className="size-2 bg-night" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button size="lg" onClick={start} className="w-full sm:w-auto">
                  {supportIntro.welcome.cta}
                  <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
                <span className="text-center text-sm text-muted sm:text-left">{supportIntro.welcome.time}</span>
              </div>
            </div>
          </div>
        )}

        {stage === "questions" && (
          <form noValidate onSubmit={onSubmit} className="flex flex-1 flex-col">
            {/* Progress */}
            <div className={`border-b border-line py-5 ${gutter}`}>
              <div className="mx-auto max-w-xl">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-bold text-night">
                    Question {stepIndex + 1} <span className="font-medium text-muted">of {total}</span>
                  </span>
                  <span className="truncate text-muted">{step.title}</span>
                </div>
                <div aria-hidden="true" className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
                  {supportSteps.map((item, index) => (
                    <span
                      key={item.id}
                      className={`h-1.5 rounded-full transition-colors duration-500 ${index <= stepIndex ? "bg-primary" : "bg-night/10"}`}
                    />
                  ))}
                </div>
                <p className="sr-only" aria-live="polite">
                  Question {stepIndex + 1} of {total}: {step.title}
                </p>
              </div>
            </div>

            {/* Current question */}
            <div className={`flex flex-1 flex-col justify-center py-10 sm:py-14 ${gutter}`}>
              <div
                key={step.id}
                ref={stepRef}
                className={`mx-auto w-full max-w-xl ${direction === "forward" ? "animate-step-forward" : "animate-step-back"}`}
              >
                <p className="flex items-center gap-2 font-heading text-sm font-semibold text-primary-ink">
                  {pad(stepIndex + 1)}
                  <ArrowRightIcon className="size-3.5" />
                </p>
                <h2 tabIndex={-1} className="mt-3 text-h3 text-night focus:outline-none sm:text-h2">
                  {personalise(step.question)}
                </h2>
                <p className="mt-3 text-lg text-muted">{step.helper}</p>

                <div className="mt-8 space-y-6">
                  {step.id === "name" && (
                    <TextField
                      id="fullName"
                      label="Full name"
                      autoComplete="name"
                      maxLength={80}
                      placeholder="e.g. Folake Adeyemi"
                      value={answers.fullName}
                      onValueChange={(value) => update("fullName", value)}
                      error={errors.fullName}
                    />
                  )}

                  {step.id === "contact" && (
                    <>
                      <TextField
                        id="phone"
                        type="tel"
                        label="Phone number"
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={20}
                        placeholder="e.g. 0803 123 4567"
                        value={answers.phone}
                        onValueChange={(value) => update("phone", value)}
                        error={errors.phone}
                      />
                      <TextField
                        id="email"
                        type="email"
                        label="Email address"
                        optional
                        autoComplete="email"
                        inputMode="email"
                        maxLength={120}
                        placeholder="you@example.com"
                        value={answers.email}
                        onValueChange={(value) => update("email", value)}
                        error={errors.email}
                      />
                    </>
                  )}

                  {step.id === "location" && (
                    <div className="grid gap-6 sm:grid-cols-2">
                      <SelectField
                        id="state"
                        label="State"
                        placeholder="Choose a state"
                        options={supportOptions.states}
                        value={answers.state}
                        onValueChange={(value) => update("state", value)}
                        error={errors.state}
                      />
                      <TextField
                        id="city"
                        label="City or town"
                        autoComplete="address-level2"
                        maxLength={60}
                        placeholder="e.g. Ibadan"
                        value={answers.city}
                        onValueChange={(value) => update("city", value)}
                        error={errors.city}
                      />
                    </div>
                  )}

                  {step.id === "business" && (
                    <>
                      <TextField
                        id="businessName"
                        label="Business name"
                        optional
                        autoComplete="organization"
                        maxLength={80}
                        placeholder="What's it called?"
                        value={answers.businessName}
                        onValueChange={(value) => update("businessName", value)}
                      />
                      <ChoiceGroup
                        name="businessType"
                        legend="What kind of business is it?"
                        options={supportOptions.businessType}
                        value={answers.businessType}
                        onValueChange={(value) => update("businessType", value)}
                        error={errors.businessType}
                      />
                      <ChoiceGroup
                        name="businessStatus"
                        legend="Where do things stand today?"
                        columns={1}
                        options={supportOptions.businessStatus}
                        value={answers.businessStatus}
                        onValueChange={(value) => update("businessStatus", value)}
                        error={errors.businessStatus}
                      />
                    </>
                  )}

                  {step.id === "setback" && (
                    <>
                      <ChoiceGroup
                        multiple
                        name="setbacks"
                        legend="What happened to your business?"
                        options={supportOptions.setbacks}
                        value={answers.setbacks}
                        onValueChange={(value) => update("setbacks", value)}
                        error={errors.setbacks}
                      />
                      <TextAreaField
                        id="setbackStory"
                        label="Tell us more, in your own words"
                        maxLength={1500}
                        placeholder="What happened, and how has it affected you and your business?"
                        value={answers.setbackStory}
                        onValueChange={(value) => update("setbackStory", value)}
                        error={errors.setbackStory}
                      />
                    </>
                  )}

                  {step.id === "support" && (
                    <>
                      <ChoiceGroup
                        multiple
                        name="supportNeeds"
                        legend="Support that would help"
                        options={supportOptions.supportNeeds}
                        value={answers.supportNeeds}
                        onValueChange={(value) => update("supportNeeds", value)}
                        error={errors.supportNeeds}
                      />
                      <TextField
                        id="amount"
                        label="Roughly how much would help you start again?"
                        optional
                        inputMode="numeric"
                        maxLength={40}
                        placeholder="e.g. ₦250,000"
                        value={answers.amount}
                        onValueChange={(value) => update("amount", value)}
                      />
                    </>
                  )}

                  {step.id === "final" && (
                    <>
                      <ChoiceGroup
                        name="shareStory"
                        legend="Would you be open to sharing your story to inspire others?"
                        columns={1}
                        options={supportOptions.shareStory}
                        value={answers.shareStory}
                        onValueChange={(value) => update("shareStory", value)}
                        error={errors.shareStory}
                      />
                      <SelectField
                        id="heardFrom"
                        label="How did you hear about us?"
                        optional
                        placeholder="Choose one"
                        options={supportOptions.heardFrom}
                        value={answers.heardFrom}
                        onValueChange={(value) => update("heardFrom", value)}
                      />
                      <CheckboxField
                        id="consent"
                        checked={answers.consent}
                        onCheckedChange={(value) => update("consent", value)}
                        error={errors.consent}
                      >
                        I confirm that the information I&apos;ve shared is true, and I agree to be contacted by Beyond
                        The Fall Initiative about my application.
                      </CheckboxField>
                    </>
                  )}
                </div>

                {submitError && (
                  <p role="alert" className="mt-6 rounded-2xl bg-primary/10 px-4 py-3 font-bold text-primary-ink">
                    {submitError}
                  </p>
                )}
              </div>
            </div>

            {/* Actions — pinned to the bottom on phones for easy thumb reach */}
            <div
              className={`sticky bottom-0 z-10 border-t border-line bg-paper/90 py-3 backdrop-blur-md sm:py-4 lg:static lg:border-t-0 lg:bg-transparent lg:pb-12 lg:backdrop-blur-none ${gutter}`}
            >
              <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
                <Button variant="ghost" size="lg" onClick={goBack} className="-ml-3 px-4 sm:-ml-4">
                  <ArrowLeftIcon className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  Back
                </Button>
                <div className="flex items-center gap-4">
                  <span className="hidden text-sm text-muted md:inline">
                    or press{" "}
                    <kbd className="rounded-md bg-surface px-1.5 py-0.5 font-sans text-xs font-bold text-night ring-1 ring-line">
                      Enter ↵
                    </kbd>
                  </span>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isLast ? (isSubmitting ? "Submitting…" : "Submit application") : "Continue"}
                    {!isSubmitting && (
                      <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}

        {stage === "done" && (
          <div className={`flex flex-1 items-center py-16 sm:py-20 ${gutter}`}>
            <div className="mx-auto w-full max-w-xl animate-step-forward" role="status">
              <span className="grid size-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <CheckIcon className="size-7" />
              </span>
              <p className="mt-8 text-sm font-bold tracking-[0.14em] text-primary-ink uppercase">{supportIntro.success.eyebrow}</p>
              <h2 className="mt-3 text-h2 text-night">{personalise(supportIntro.success.title)}</h2>
              <p className="mt-4 text-lg text-muted">{supportIntro.success.description}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={supportIntro.success.primary.href} size="lg" className="w-full sm:w-auto">
                  {supportIntro.success.primary.label}
                </ButtonLink>
                <ButtonLink
                  href={supportIntro.success.secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant="light"
                  icon
                  className="w-full ring-1 ring-line sm:w-auto"
                >
                  {supportIntro.success.secondary.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
