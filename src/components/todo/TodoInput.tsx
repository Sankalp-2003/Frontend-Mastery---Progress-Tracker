import { useState } from 'react';

interface TodoInputProps {
  onAdd: (title: string, notes: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    onAdd(title.trim(), notes.trim());
    setTitle('');
    setNotes('');
    setError('');
    setShowNotes(false);
  };

  return (
    <div className="bg-[--color-surface] border border-[--color-border] rounded-lg p-4 space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a todo..."
          className="flex-1 bg-[--color-bg] border border-[--color-border] rounded px-3 py-2 text-sm font-mono text-[--color-text-primary] placeholder-[--color-text-secondary] focus:outline-none focus:border-[--color-accent] transition-colors"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[--color-accent] text-white text-sm font-mono rounded hover:bg-blue-500 transition-colors"
        >
          Add
        </button>
      </div>
      {error && <p className="text-xs font-mono text-red-400">{error}</p>}
      <div>
        <button
          onClick={() => setShowNotes((v) => !v)}
          className="text-xs font-mono text-[--color-text-secondary] hover:text-[--color-text-primary] transition-colors"
        >
          {showNotes ? '▲ Hide notes' : '▼ Add notes'}
        </button>
        {showNotes && (
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)..."
            rows={3}
            className="mt-2 w-full bg-[--color-bg] border border-[--color-border] rounded px-3 py-2 text-sm font-mono text-[--color-text-primary] placeholder-[--color-text-secondary] focus:outline-none focus:border-[--color-accent] transition-colors resize-none"
          />
        )}
      </div>
    </div>
  );
}
