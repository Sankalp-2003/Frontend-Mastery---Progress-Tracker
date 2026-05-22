import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { useStreaks } from '@/hooks/useStreaks';

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (target === 0) { setValue(0); return; }
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

function Stat({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  const displayed = useCountUp(value);
  return (
    <div className="bg-[--color-surface] border border-[--color-border] rounded-lg p-4">
      <div className="font-syne font-bold text-3xl text-[--color-text-primary] animate-countUp tabular-nums">
        {displayed}{suffix}
      </div>
      <div className="text-xs font-mono text-[--color-text-secondary] mt-1">{label}</div>
    </div>
  );
}

export function StatBar() {
  const { totalCompleted, totalTasks, overallPct } = useProgress();
  const { current, longest } = useStreaks();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      <Stat label="tasks completed" value={totalCompleted} />
      <Stat label="total tasks" value={totalTasks} />
      <Stat label="current streak" value={current} suffix=" days" />
      <Stat label="longest streak" value={longest} suffix=" days" />
      <Stat label="overall progress" value={Math.round(overallPct)} suffix="%" />
    </div>
  );
}
