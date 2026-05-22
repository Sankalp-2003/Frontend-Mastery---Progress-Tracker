import { useMemo } from 'react';
import { curriculum, getAllTaskIds } from '@/data/curriculum';
import type { WeekProgress } from '@/types';
import { useTaskContext } from '@/contexts/TaskContext';

function getWeekTaskIds(weekNum: number): string[] {
  const week = curriculum.find((w) => w.num === weekNum);
  if (!week) return [];
  const ids: string[] = [];
  week.days.forEach((d) => {
    ids.push(`${d.id}_t0`, `${d.id}_t1`, `${d.id}_t2`);
  });
  ids.push(`${week.sunday.id}_mock`, `${week.sunday.id}_proj`);
  week.sunday.miniProject.coreFeatures.forEach((_, i) =>
    ids.push(`${week.sunday.id}_feat_${i}`)
  );
  return ids;
}

export function useProgress() {
  const { completedIds } = useTaskContext();
  const totalIds = useMemo(() => getAllTaskIds(), []);

  const weeklyProgress: WeekProgress[] = useMemo(
    () =>
      curriculum.map((week) => {
        const ids = getWeekTaskIds(week.num);
        const completed = ids.filter((id) => completedIds.has(id)).length;
        return {
          weekNum: week.num,
          completed,
          total: ids.length,
          pct: ids.length > 0 ? (completed / ids.length) * 100 : 0,
        };
      }),
    [completedIds]
  );

  const totalCompleted = useMemo(
    () => totalIds.filter((id) => completedIds.has(id)).length,
    [completedIds, totalIds]
  );

  const overallPct = totalIds.length > 0 ? (totalCompleted / totalIds.length) * 100 : 0;

  return { weeklyProgress, totalCompleted, totalTasks: totalIds.length, overallPct };
}
