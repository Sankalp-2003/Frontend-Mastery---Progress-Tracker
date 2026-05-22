interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
  className?: string;
}

export function Checkbox({ checked, onChange, label, id, className = '' }: CheckboxProps) {
  return (
    <label htmlFor={id} className={`flex items-start gap-3 cursor-pointer group ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        className="sr-only"
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all duration-200
          ${checked ? 'bg-[--color-accent] border-[--color-accent]' : 'border-[--color-border] group-hover:border-[--color-accent]'}`}
        aria-hidden="true"
      >
        {checked && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-checkmark"
            />
          </svg>
        )}
      </span>
      <span
        className={`text-sm transition-colors leading-relaxed ${
          checked
            ? 'line-through text-[--color-text-secondary]'
            : 'text-[--color-text-primary]'
        }`}
      >
        {label}
      </span>
    </label>
  );
}
