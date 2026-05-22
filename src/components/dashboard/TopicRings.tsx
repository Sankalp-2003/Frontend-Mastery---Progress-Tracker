import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { curriculum } from '@/data/curriculum';

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Ring({
  pct,
  weekNum,
  theme,
  onClick,
}: {
  pct: number;
  weekNum: number;
  theme: string;
  onClick: () => void;
}) {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
    el.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)';
    requestAnimationFrame(() => {
      el.style.strokeDashoffset = String(offset);
    });
  }, [pct]);

  const color =
    pct === 100
      ? 'var(--color-success)'
      : pct > 0
        ? 'var(--color-accent)'
        : 'var(--color-border)';

  return (
    <button
      onClick={onClick}
      title={`Week ${weekNum}: ${theme} — ${Math.round(pct)}%`}
      className="flex flex-col items-center gap-1 group focus:outline-none"
    >
      <svg width="52" height="52" viewBox="0 0 52 52" className="rotate-[-90deg]">
        <circle
          cx="26"
          cy="26"
          r={RADIUS}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="4"
        />
        <circle
          ref={circleRef}
          cx="26"
          cy="26"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>
      <span className="text-[10px] font-mono text-[--color-text-secondary] group-hover:text-[--color-text-primary] transition-colors">
        W{weekNum}
      </span>
    </button>
  );
}

export function TopicRings() {
  const { weeklyProgress } = useProgress();
  const navigate = useNavigate();

  return (
    <div className="bg-[--color-surface] border border-[--color-border] rounded-lg p-4">
      <h2 className="font-syne font-bold text-[--color-text-primary] mb-4 text-sm tracking-wide uppercase">
        12 Weeks
      </h2>
      <div className="grid grid-cols-6 gap-2">
        {weeklyProgress.map((w) => {
          const week = curriculum.find((c) => c.num === w.weekNum);
          return (
            <Ring
              key={w.weekNum}
              pct={w.pct}
              weekNum={w.weekNum}
              theme={week?.theme ?? ''}
              onClick={() => navigate('/tasks', { state: { weekNum: w.weekNum } })}
            />
          );
        })}
      </div>
    </div>
  );
}
