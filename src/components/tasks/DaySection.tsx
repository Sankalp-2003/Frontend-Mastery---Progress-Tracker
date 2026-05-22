import type { DayTask } from '@/types';
import { TopicTask } from './TopicTask';
import { CodingQuestionCard } from './CodingQuestionCard';

interface DaySectionProps {
  day: DayTask;
  completedIds: Set<string>;
  onToggle: (id: string) => void;
}

export function DaySection({ day, completedIds, onToggle }: DaySectionProps) {
  return (
    <div className="py-3 border-b border-[--color-border] last:border-b-0">
      <div className="text-xs font-mono text-[--color-text-secondary] mb-2">{day.dayLabel}</div>
      <TopicTask
        dayId={day.id}
        topics={day.topics}
        completed={completedIds.has(`${day.id}_t0`)}
        onToggle={onToggle}
      />
      <div className="mt-3 space-y-2">
        {day.codingQuestions.map((q, qi) => (
          <CodingQuestionCard
            key={q.id}
            question={q}
            taskId={`${day.id}_t${qi + 1}`}
            completed={completedIds.has(`${day.id}_t${qi + 1}`)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
