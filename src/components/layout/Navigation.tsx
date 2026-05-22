import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '◈' },
  { to: '/tasks', label: 'Tasks', icon: '◉' },
  { to: '/todo', label: 'Todo', icon: '◎' },
];

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:fixed md:left-0 md:top-0 md:bottom-0 md:w-16 md:right-auto bg-[--color-surface] border-t md:border-t-0 md:border-r border-[--color-border] flex flex-row md:flex-col items-center justify-around md:justify-start md:pt-6 md:gap-1 z-40">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 p-3 w-full text-xs font-mono transition-colors
            ${isActive ? 'text-[--color-accent]' : 'text-[--color-text-secondary] hover:text-[--color-text-primary]'}`
          }
        >
          <span className="text-lg leading-none">{icon}</span>
          <span className="hidden md:block text-[10px]">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
