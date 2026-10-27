// Decorative brand motif: the terracotta-and-night square from the brand reference,
// repeated as rising steps — a quiet nod to bouncing back.
export function RisingSteps({ className = "" }: { className?: string }) {
  const steps = [
    { x: 0, y: 104, fill: "var(--primary)", opacity: 0.45 },
    { x: 52, y: 52, fill: "var(--primary)", opacity: 0.75 },
    { x: 104, y: 0, fill: "var(--sun)", opacity: 1 },
  ];

  return (
    <svg viewBox="0 0 136 136" aria-hidden="true" className={className}>
      {steps.map((step) => (
        <g key={step.x} opacity={step.opacity}>
          <rect x={step.x} y={step.y} width="32" height="32" fill={step.fill} />
          <rect x={step.x + 10} y={step.y + 10} width="12" height="12" fill="var(--night)" />
        </g>
      ))}
    </svg>
  );
}
