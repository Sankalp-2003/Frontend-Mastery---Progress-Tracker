import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { curriculum } from '@/data/curriculum';
import { useTaskContext } from '@/contexts/TaskContext';
import { useProgress } from '@/hooks/useProgress';
import { WeekAccordion } from '@/components/tasks/WeekAccordion';
import { SundayAccordion } from '@/components/tasks/SundayAccordion';

const ROADMAP_START = new Date('2026-05-25');

function getCurrentWeekNum(): number {
  const today = new Date();
  const diff = Math.floor((today.getTime() - ROADMAP_START.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const weekNum = Math.max(1, Math.min(12, diff + 1));
  return weekNum;
}

export default function Tasks() {
  const { completedIds, toggleTask, isLoaded } = useTaskContext();
  const { weeklyProgress } = useProgress();
  const location = useLocation();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromState = (location.state as { weekNum?: number } | null)?.weekNum;
    if (fromState) {
      setOpenKey(`w${fromState}`);
    } else {
      const current = getCurrentWeekNum();
      setOpenKey(`w${current}`);
    }
  }, [location.state]);

  useEffect(() => {
    if (openKey && openRef.current) {
      setTimeout(() => openRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [openKey]);

  if (!isLoaded) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="font-mono text-[--color-text-secondary] text-sm">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="font-syne font-bold text-2xl text-[--color-text-primary] mb-6">
        12-Week Roadmap
      </h1>
      {curriculum.map((week) => {
        const weekKey = `w${week.num}`;
        const sunKey = `w${week.num}_sun`;
        const progress = weeklyProgress.find((w) => w.weekNum === week.num);
        const isWeekOpen = openKey === weekKey;
        const isSunOpen = openKey === sunKey;

        return (
          <div key={week.num} ref={isWeekOpen || isSunOpen ? openRef : undefined}>
            <WeekAccordion
              week={week}
              isOpen={isWeekOpen}
              onToggle={() => setOpenKey(isWeekOpen ? null : weekKey)}
              completedIds={completedIds}
              onTaskToggle={toggleTask}
              completed={progress?.completed ?? 0}
              total={progress?.total ?? 0}
              pct={progress?.pct ?? 0}
            />
            <SundayAccordion
              sunday={week.sunday}
              weekNum={week.num}
              isOpen={isSunOpen}
              onToggle={() => setOpenKey(isSunOpen ? null : sunKey)}
              completedIds={completedIds}
            />
          </div>
        );
      })}
    </div>
  );
}
