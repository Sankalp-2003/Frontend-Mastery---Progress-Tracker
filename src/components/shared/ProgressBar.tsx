export function ProgressBar({ pct, className = '' }: { pct: number; className?: string }) {
  return (
    <div className={`h-1 bg-[--color-border] rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-[--color-accent] rounded-full transition-all duration-700"
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  );
}
