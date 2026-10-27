// Brand marker: terracotta square with a night core, as in Tag. Size it with className.
export function BrandSquare({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center bg-primary ${className}`}>
      <span className="size-[36%] bg-night" />
    </span>
  );
}
