import { useStreaks } from '@/hooks/useStreaks';

export function StreakSection() {
  const { current, longest, last30 } = useStreaks();

  return (
    <div className="bg-[--color-surface] border border-[--color-border] rounded-lg p-4">
      <h2 className="font-syne font-bold text-[--color-text-primary] mb-4 text-sm tracking-wide uppercase">
        Study Streak
      </h2>
      <div className="flex items-end gap-6 mb-4">
        <div>
          <div className="font-syne font-bold text-4xl" style={{ color: 'var(--color-accent-2)' }}>
            🔥 {current}
          </div>
          <div className="text-xs font-mono text-[--color-text-secondary] mt-1">current streak</div>
        </div>
        <div>
          <div className="font-syne font-bold text-2xl text-[--color-text-secondary]">{longest}</div>
          <div className="text-xs font-mono text-[--color-text-secondary] mt-1">best streak</div>
        </div>
      </div>
      <div className="flex gap-1 flex-wrap">
        {last30.map((active, i) => (
          <div
            key={i}
            title={`${30 - i} days ago`}
            className={`w-4 h-4 rounded-sm ${active ? 'bg-[--color-success]' : 'bg-[--color-border]'}`}
          />
        ))}
      </div>
      <div className="text-xs font-mono text-[--color-text-secondary] mt-2">last 30 days</div>
    </div>
  );
}
