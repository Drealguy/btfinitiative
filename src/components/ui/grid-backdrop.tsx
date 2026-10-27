// Blueprint grid behind a light section, fading out towards the bottom.
// Place it first inside a `relative isolate` section.
export function GridBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="texture-grid absolute inset-0 -z-10 [mask-image:radial-gradient(110%_70%_at_50%_0%,black_30%,transparent_80%)]"
    />
  );
}
