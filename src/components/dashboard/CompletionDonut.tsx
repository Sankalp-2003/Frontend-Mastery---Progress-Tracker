import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useProgress } from '@/hooks/useProgress';

export function CompletionDonut() {
  const { totalCompleted, totalTasks, weeklyProgress } = useProgress();
  const inProgress = weeklyProgress.filter((w) => w.completed > 0 && w.completed < w.total).length;
  const notStarted = weeklyProgress.filter((w) => w.completed === 0).length;
  const done = weeklyProgress.filter((w) => w.pct === 100).length;

  const remaining = totalTasks - totalCompleted;
  const data = [
    { name: 'Completed', value: totalCompleted, color: 'var(--color-success)' },
    { name: 'Remaining', value: remaining, color: 'var(--color-border)' },
  ].filter((d) => d.value > 0);

  const pct = Math.round((totalCompleted / Math.max(totalTasks, 1)) * 100);

  return (
    <div className="bg-[--color-surface] border border-[--color-border] rounded-lg p-4">
      <h2 className="font-syne font-bold text-[--color-text-primary] mb-2 text-sm tracking-wide uppercase">
        Overall Completion
      </h2>
      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-syne font-bold text-3xl text-[--color-text-primary]">{pct}%</div>
          <div className="text-xs font-mono text-[--color-text-secondary]">complete</div>
        </div>
      </div>
      <div className="flex gap-4 justify-center mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[--color-success]" />
          <span className="text-xs font-mono text-[--color-text-secondary]">{done} weeks done</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[--color-accent]" />
          <span className="text-xs font-mono text-[--color-text-secondary]">{inProgress} in progress</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[--color-border]" />
          <span className="text-xs font-mono text-[--color-text-secondary]">{notStarted} not started</span>
        </div>
      </div>
    </div>
  );
}
