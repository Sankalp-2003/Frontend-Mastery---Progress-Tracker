import { Checkbox } from '@/components/shared/Checkbox';

interface TopicTaskProps {
  dayId: string;
  topics: string[];
  completed: boolean;
  onToggle: (id: string) => void;
}

export function TopicTask({ dayId, topics, completed, onToggle }: TopicTaskProps) {
  const id = `${dayId}_t0`;
  return (
    <div className="py-2">
      <Checkbox
        id={id}
        checked={completed}
        onChange={() => onToggle(id)}
        label={topics.join(' · ')}
      />
    </div>
  );
}
