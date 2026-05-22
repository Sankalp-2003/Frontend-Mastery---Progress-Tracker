import { useEffect, useState } from 'react';
import { getCompletedTaskCompletions } from '@/services/db';
import { useTaskContext } from '@/contexts/TaskContext';

const WEEKS = 16;
const DAYS = 7;
const START_DATE = new Date('2026-05-18'); // Monday before ROADMAP_START

function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const result = new Date(d);
  result.setDate(result.getDate() + n);
  return result;
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function ActivityHeatmap() {
  const [activityMap, setActivityMap] = useState<Map<string, number>>(new Map());
  const { completedIds } = useTaskContext();
  const today = new Date();

  useEffect(() => {
    getCompletedTaskCompletions().then((completions) => {
      const map = new Map<string, number>();
      for (const c of completions) {
        const key = c.completedAt.slice(0, 10);
        map.set(key, (map.get(key) ?? 0) + 1);
      }
      setActivityMap(map);
    });
  }, [completedIds]);

  function cellColor(count: number, isFuture: boolean): string {
    if (isFuture) return 'var(--color-surface-2)';
    if (count === 0) return 'var(--color-border)';
    if (count < 3) return 'rgba(91,140,255,0.3)';
    if (count < 6) return 'rgba(91,140,255,0.6)';
    return 'var(--color-accent)';
  }

  const cells: { date: Date; key: string; count: number; isFuture: boolean }[] = [];
  for (let col = 0; col < WEEKS; col++) {
    for (let row = 0; row < DAYS; row++) {
      const d = addDays(START_DATE, col * 7 + row);
      const key = dateKey(d);
      cells.push({
        date: d,
        key,
        count: activityMap.get(key) ?? 0,
        isFuture: d > today,
      });
    }
  }

  return (
    <div className="bg-[--color-surface] border border-[--color-border] rounded-lg p-4">
      <h2 className="font-syne font-bold text-[--color-text-primary] mb-3 text-sm tracking-wide uppercase">
        Activity (16 weeks)
      </h2>
      <div className="flex gap-1 overflow-x-auto pb-1">
        <div className="flex flex-col gap-1 mr-1">
          <div className="h-3" />
          {DAY_LABELS.map((l) => (
            <div key={l} className="h-3 text-[9px] font-mono text-[--color-text-secondary] leading-3 w-6">
              {l}
            </div>
          ))}
        </div>
        {Array.from({ length: WEEKS }, (_, col) => {
          const weekCells = cells.slice(col * DAYS, col * DAYS + DAYS);
          const weekStart = weekCells[0]?.date;
          return (
            <div key={col} className="flex flex-col gap-1">
              <div className="h-3 text-[9px] font-mono text-[--color-text-secondary] leading-3 text-center w-3">
                {weekStart && weekStart.getDate() <= 7
                  ? weekStart.toLocaleString('default', { month: 'short' }).slice(0, 1)
                  : ''}
              </div>
              {weekCells.map((cell) => (
                <div
                  key={cell.key}
                  title={`${cell.date.toDateString()} — ${cell.count} task${cell.count !== 1 ? 's' : ''}`}
                  className="w-3 h-3 rounded-sm"
                  style={{ background: cellColor(cell.count, cell.isFuture), opacity: cell.isFuture ? 0.3 : 1 }}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
