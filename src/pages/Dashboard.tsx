import { StatBar } from '@/components/dashboard/StatBar';
import { WeeklyProgressChart } from '@/components/dashboard/WeeklyProgressChart';
import { StreakSection } from '@/components/dashboard/StreakSection';
import { CompletionDonut } from '@/components/dashboard/CompletionDonut';
import { TopicRings } from '@/components/dashboard/TopicRings';
import { ActivityHeatmap } from '@/components/dashboard/ActivityHeatmap';
import { useTaskContext } from '@/contexts/TaskContext';

export default function Dashboard() {
  const { isLoaded } = useTaskContext();

  if (!isLoaded) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="font-mono text-[--color-text-secondary] text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-6xl mx-auto">
      <StatBar />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeeklyProgressChart />
        <StreakSection />
        <CompletionDonut />
        <TopicRings />
      </div>
      <ActivityHeatmap />
    </div>
  );
}
