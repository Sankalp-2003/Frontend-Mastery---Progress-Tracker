import { useState } from 'react';
import type { MiniProject } from '@/types';
import { Checkbox } from '@/components/shared/Checkbox';

interface MiniProjectCardProps {
  project: MiniProject;
  sundayId: string;
  completedIds: Set<string>;
  onToggle: (id: string) => void;
}

export function MiniProjectCard({ project, sundayId, completedIds, onToggle }: MiniProjectCardProps) {
  const [showExample, setShowExample] = useState(false);
  const projId = `${sundayId}_proj`;

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-syne font-bold text-[--color-text-primary]">{project.name}</div>
          <p className="text-sm text-[--color-text-secondary] mt-1 leading-relaxed">{project.whatToBuild}</p>
        </div>
      </div>

      <button
        onClick={() => setShowExample((v) => !v)}
        className="text-xs font-mono text-[--color-accent] hover:underline"
      >
        {showExample ? 'Hide example ▲' : 'Show detailed example ▼'}
      </button>

      {showExample && (
        <blockquote className="border-l-2 border-[--color-accent] pl-3 text-sm text-[--color-text-secondary] leading-relaxed italic">
          {project.detailedExample}
        </blockquote>
      )}

      <div className="space-y-2">
        <div className="text-xs font-mono text-[--color-text-secondary] uppercase tracking-wide">
          Core Features
        </div>
        {project.coreFeatures.map((feature, i) => {
          const featId = `${sundayId}_feat_${i}`;
          return (
            <Checkbox
              key={featId}
              id={featId}
              checked={completedIds.has(featId)}
              onChange={() => onToggle(featId)}
              label={feature}
            />
          );
        })}
      </div>

      {project.whatYouProved && (
        <p className="text-xs font-mono text-[--color-text-secondary] pt-1">
          <span className="text-[--color-accent]">You proved:</span> {project.whatYouProved}
        </p>
      )}

      <div className="pt-2 border-t border-[--color-border]">
        <Checkbox
          id={projId}
          checked={completedIds.has(projId)}
          onChange={() => onToggle(projId)}
          label="Project completed"
        />
      </div>
    </div>
  );
}
