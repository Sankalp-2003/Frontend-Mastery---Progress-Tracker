import { useMemo, useState, useEffect } from 'react';
import type { StreakData } from '@/types';
import { useTaskContext } from '@/contexts/TaskContext';
import { getCompletedTaskCompletions } from '@/services/db';

export function useStreaks(): StreakData {
  const [datesWithActivity, setDatesWithActivity] = useState<Set<string>>(new Set());
  const { completedIds } = useTaskContext();

  useEffect(() => {
    getCompletedTaskCompletions().then((completions) => {
      const dates = new Set(completions.map((c) => c.completedAt.slice(0, 10)));
      setDatesWithActivity(dates);
    });
  }, [completedIds]);

  return useMemo(() => {
    const today = new Date();

    const last30: boolean[] = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (29 - i));
      return datesWithActivity.has(d.toISOString().slice(0, 10));
    });

    let current = 0;
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      if (datesWithActivity.has(d.toISOString().slice(0, 10))) {
        current++;
      } else {
        break;
      }
    }

    const sorted = Array.from(datesWithActivity).sort();
    let longest = 0;
    let run = 0;
    let prev: string | null = null;
    for (const dateStr of sorted) {
      if (prev) {
        const prevD = new Date(prev);
        const currD = new Date(dateStr);
        const diff = (currD.getTime() - prevD.getTime()) / 86400000;
        if (diff === 1) {
          run++;
        } else {
          run = 1;
        }
      } else {
        run = 1;
      }
      longest = Math.max(longest, run);
      prev = dateStr;
    }
    longest = Math.max(longest, current);

    return { current, longest, last30 };
  }, [datesWithActivity]);
}
