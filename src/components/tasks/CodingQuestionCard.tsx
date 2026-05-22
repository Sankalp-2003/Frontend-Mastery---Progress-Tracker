import { useState } from 'react';
import type { CodingQuestion } from '@/types';
import { Checkbox } from '@/components/shared/Checkbox';

interface CodingQuestionCardProps {
  question: CodingQuestion;
  taskId: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

export function CodingQuestionCard({ question, taskId, completed, onToggle }: CodingQuestionCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`border rounded-lg transition-colors ${
        completed ? 'border-[--color-border] bg-[--color-surface]' : 'border-[--color-border] bg-[--color-surface]'
      }`}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-3 p-3 text-left group"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${completed ? 'bg-[--color-success]' : 'bg-[--color-accent]'}`}
          />
          <span
            className={`text-sm font-mono truncate ${
              completed ? 'line-through text-[--color-text-secondary]' : 'text-[--color-text-primary]'
            }`}
          >
            {question.title}
          </span>
        </div>
        <span className="text-[--color-text-secondary] text-xs shrink-0">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-3 border-t border-[--color-border] pt-3">
          <p className="text-sm text-[--color-text-primary] leading-relaxed">
            {question.problemStatement}
          </p>

          <div>
            <div className="text-xs font-mono text-[--color-text-secondary] mb-1">Input / Output</div>
            <pre className="text-xs font-mono bg-[--color-bg] border border-[--color-border] rounded p-3 overflow-x-auto text-[--color-text-primary] leading-relaxed whitespace-pre-wrap">
              {question.inputOutputExample}
            </pre>
          </div>

          <div>
            <div className="text-xs font-mono text-[--color-text-secondary] mb-1">Hint →</div>
            <p className="text-sm text-[--color-text-secondary] leading-relaxed">{question.hint}</p>
          </div>

          <div>
            <div className="text-xs font-mono text-[--color-text-secondary] mb-1">Interviewer tests →</div>
            <p className="text-sm text-[--color-text-secondary] leading-relaxed">{question.whyAsked}</p>
          </div>

          <div className="pt-1">
            <Checkbox
              id={taskId}
              checked={completed}
              onChange={() => onToggle(taskId)}
              label="Mark complete"
            />
          </div>
        </div>
      )}
    </div>
  );
}
