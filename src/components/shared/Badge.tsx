import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'accent';

export function Badge({
  children,
  variant = 'default',
}: {
  children: ReactNode;
  variant?: BadgeVariant;
}) {
  const cls: Record<BadgeVariant, string> = {
    default: 'bg-[--color-surface-2] text-[--color-text-secondary]',
    success: 'bg-[#4cba8a]/20 text-[--color-success]',
    warning: 'bg-[#e8a030]/20 text-[--color-warning]',
    accent: 'bg-[#d4893a]/20 text-[--color-accent]',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-mono font-medium ${cls[variant]}`}>
      {children}
    </span>
  );
}
