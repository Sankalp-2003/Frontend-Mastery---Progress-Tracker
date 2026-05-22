import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';

function barColor(pct: number): string {
  if (pct === 0) return 'var(--color-border)';
  if (pct < 50) return 'var(--color-warning)';
  if (pct < 100) return 'var(--color-accent)';
  return 'var(--color-success)';
}

export function WeeklyProgressChart() {
  const { weeklyProgress } = useProgress();
  const navigate = useNavigate();

  const data = weeklyProgress.map((w) => ({
    name: `W${w.weekNum}`,
    pct: Math.round(w.pct),
    weekNum: w.weekNum,
    completed: w.completed,
    total: w.total,
  }));

  return (
    <div className="bg-[--color-surface] border border-[--color-border] rounded-lg p-4">
      <h2 className="font-syne font-bold text-[--color-text-primary] mb-4 text-sm tracking-wide uppercase">
        Weekly Progress
      </h2>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 11, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: 'rgba(91,140,255,0.06)' }}
            contentStyle={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              fontFamily: 'JetBrains Mono',
              fontSize: 12,
              color: 'var(--color-text-primary)',
            }}
            formatter={(value, _, props) => [
              `${String(value)}% (${(props.payload as { completed?: number })?.completed ?? 0}/${(props.payload as { total?: number })?.total ?? 0})`,
              'Progress',
            ]}
          />
          <Bar
            dataKey="pct"
            radius={[3, 3, 0, 0]}
            cursor="pointer"
            onClick={(d) => navigate('/tasks', { state: { weekNum: (d as unknown as { weekNum: number }).weekNum } })}
          >
            {data.map((entry) => (
              <Cell key={entry.weekNum} fill={barColor(entry.pct)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
