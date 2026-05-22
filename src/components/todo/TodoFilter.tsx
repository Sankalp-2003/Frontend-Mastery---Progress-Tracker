import type { TodoStatus } from '@/types';

type Filter = 'all' | TodoStatus;

interface TodoFilterProps {
  active: Filter;
  onChange: (f: Filter) => void;
  counts: Record<Filter, number>;
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

export function TodoFilter({ active, onChange, counts }: TodoFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3 py-1.5 text-xs font-mono rounded border transition-colors
            ${
              active === value
                ? 'bg-[--color-accent] border-[--color-accent] text-white'
                : 'border-[--color-border] text-[--color-text-secondary] hover:border-[--color-accent] hover:text-[--color-text-primary]'
            }`}
        >
          {label} ({counts[value]})
        </button>
      ))}
    </div>
  );
}
