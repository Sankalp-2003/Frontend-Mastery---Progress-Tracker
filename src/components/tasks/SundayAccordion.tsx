import { useState } from 'react';
import type { SundayTask } from '@/types';
import { useTaskContext } from '@/contexts/TaskContext';
import { Checkbox } from '@/components/shared/Checkbox';
import { MiniProjectCard } from './MiniProjectCard';

interface SundayAccordionProps {
  sunday: SundayTask;
  weekNum: number;
  isOpen: boolean;
  onToggle: () => void;
  completedIds: Set<string>;
}

export function SundayAccordion({
  sunday,
  weekNum,
  isOpen,
  onToggle,
  completedIds,
}: SundayAccordionProps) {
  const { toggleTask, addToast } = useTaskContext();
  const mockId = `${sunday.id}_mock`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(sunday.mockInterviewPrompt).then(() => {
      addToast('Mock interview prompt copied!', 'success');
    });
  };

  const [animating] = useState(false);

  return (
    <div
      className={`border border-[--color-border] rounded-lg mb-2 overflow-hidden transition-colors ${
        animating ? '' : ''
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 p-4 text-left bg-[--color-surface] hover:bg-[--color-surface-2] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`text-lg transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            ▾
          </span>
          <div>
            <div className="font-mono text-xs text-[--color-accent] mb-0.5">Week {weekNum} — Sunday</div>
            <div className="font-syne font-bold text-[--color-text-primary] text-sm">
              Mock Interview + Mini Project
            </div>
          </div>
        </div>
        <div className="text-xs font-mono text-[--color-text-secondary] shrink-0">{sunday.dayLabel}</div>
      </button>

      {isOpen && (
        <div className="p-4 bg-[--color-surface] border-t border-[--color-border] space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-mono text-[--color-text-secondary] uppercase tracking-wide">
                Mock Interview Prompt
              </div>
              <button
                onClick={copyPrompt}
                className="text-xs font-mono text-[--color-accent] border border-[--color-accent]/30 px-2 py-1 rounded hover:bg-[--color-accent]/10 transition-colors"
              >
                Copy prompt
              </button>
            </div>
            <blockquote className="border-l-2 border-[--color-border] pl-3 text-sm text-[--color-text-secondary] leading-relaxed line-clamp-4">
              {sunday.mockInterviewPrompt}
            </blockquote>
            <div className="mt-3">
              <Checkbox
                id={mockId}
                checked={completedIds.has(mockId)}
                onChange={() => toggleTask(mockId)}
                label="Mock interview completed"
              />
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-[--color-text-secondary] uppercase tracking-wide mb-3">
              Mini Project
            </div>
            <MiniProjectCard
              project={sunday.miniProject}
              sundayId={sunday.id}
              completedIds={completedIds}
              onToggle={toggleTask}
            />
          </div>
        </div>
      )}
    </div>
  );
}
