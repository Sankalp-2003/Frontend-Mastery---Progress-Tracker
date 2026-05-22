import { useRef } from 'react';
import type { Week } from '@/types';
import { Badge } from '@/components/shared/Badge';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { DaySection } from './DaySection';

interface WeekAccordionProps {
  week: Week;
  isOpen: boolean;
  onToggle: () => void;
  completedIds: Set<string>;
  onTaskToggle: (id: string) => void;
  completed: number;
  total: number;
  pct: number;
}

export function WeekAccordion({
  week,
  isOpen,
  onToggle,
  completedIds,
  onTaskToggle,
  completed,
  total,
  pct,
}: WeekAccordionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const is100 = pct >= 100;

  const badgeVariant = is100 ? 'success' : pct > 0 ? 'accent' : 'default';

  return (
    <div
      className={`border rounded-lg mb-2 overflow-hidden transition-colors duration-300 ${
        is100 ? 'border-[--color-success]/30' : 'border-[--color-border]'
      }`}
    >
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
          is100 ? 'bg-[#4cba8a]/5 hover:bg-[#4cba8a]/10' : 'bg-[--color-surface] hover:bg-[--color-surface-2]'
        }`}
      >
        <span
          className={`text-xl transition-transform duration-200 shrink-0 text-[--color-text-secondary] ${isOpen ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-mono text-xs text-[--color-accent]">Week {week.num}</span>
            <Badge variant={badgeVariant}>
              {completed}/{total}
            </Badge>
          </div>
          <div className="font-syne font-bold text-[--color-text-primary] truncate">{week.theme}</div>
          <ProgressBar pct={pct} className="mt-2" />
        </div>
      </button>

      {isOpen && (
        <div ref={contentRef} className="bg-[--color-surface] border-t border-[--color-border]">
          <div className="p-4 pb-1">
            <p className="text-xs font-mono text-[--color-text-secondary] leading-relaxed">{week.why}</p>
          </div>
          <div className="px-4">
            {week.days.map((day) => (
              <DaySection
                key={day.id}
                day={day}
                completedIds={completedIds}
                onToggle={onTaskToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
