import { useState } from 'react';
import type { Todo } from '@/types';
import { Badge } from '@/components/shared/Badge';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onCycleStatus: (todo: Todo) => void;
}

const STATUS_BADGE: Record<string, { label: string; variant: 'default' | 'accent' | 'success' }> = {
  pending: { label: 'Pending', variant: 'default' },
  'in-progress': { label: 'In Progress', variant: 'accent' },
  done: { label: 'Done', variant: 'success' },
};

export function TodoItem({ todo, onUpdate, onDelete, onCycleStatus }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editNotes, setEditNotes] = useState(todo.notes);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate({ ...todo, title: editTitle.trim(), notes: editNotes.trim() });
    setEditing(false);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(todo.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  const badge = STATUS_BADGE[todo.status] ?? STATUS_BADGE['pending'];

  if (editing) {
    return (
      <div className="bg-[--color-surface] border border-[--color-accent] rounded-lg p-4 space-y-3">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="w-full bg-[--color-bg] border border-[--color-border] rounded px-3 py-2 text-sm font-mono text-[--color-text-primary] focus:outline-none focus:border-[--color-accent]"
          autoFocus
        />
        <textarea
          value={editNotes}
          onChange={(e) => setEditNotes(e.target.value)}
          placeholder="Notes..."
          rows={2}
          className="w-full bg-[--color-bg] border border-[--color-border] rounded px-3 py-2 text-sm font-mono text-[--color-text-primary] placeholder-[--color-text-secondary] focus:outline-none focus:border-[--color-accent] resize-none"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 text-xs font-mono bg-[--color-accent] text-white rounded hover:bg-blue-500 transition-colors"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="px-3 py-1 text-xs font-mono border border-[--color-border] text-[--color-text-secondary] rounded hover:text-[--color-text-primary] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[--color-surface] border border-[--color-border] rounded-lg p-4 transition-opacity ${
        todo.status === 'done' ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-mono text-[--color-text-primary] ${todo.status === 'done' ? 'line-through text-[--color-text-secondary]' : ''}`}
            >
              {todo.title}
            </span>
            <Badge variant={badge.variant}>{badge.label}</Badge>
          </div>
          {todo.notes && (
            <div className="mt-1">
              <button
                onClick={() => setShowNotes((v) => !v)}
                className="text-xs font-mono text-[--color-text-secondary] hover:text-[--color-text-primary] transition-colors"
              >
                {showNotes ? '▲ hide notes' : '▼ notes'}
              </button>
              {showNotes && (
                <p className="mt-1 text-xs font-mono text-[--color-text-secondary] leading-relaxed">
                  {todo.notes}
                </p>
              )}
            </div>
          )}
          <div className="mt-1 text-[10px] font-mono text-[--color-text-secondary]">
            {new Date(todo.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => onCycleStatus(todo)}
            title="Cycle status"
            className="px-2 py-1 text-xs font-mono border border-[--color-border] rounded text-[--color-text-secondary] hover:border-[--color-accent] hover:text-[--color-accent] transition-colors"
          >
            ↻
          </button>
          <button
            onClick={() => setEditing(true)}
            className="px-2 py-1 text-xs font-mono border border-[--color-border] rounded text-[--color-text-secondary] hover:border-[--color-accent] hover:text-[--color-accent] transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className={`px-2 py-1 text-xs font-mono border rounded transition-colors ${
              confirmDelete
                ? 'border-red-500 text-red-500 bg-red-500/10'
                : 'border-[--color-border] text-[--color-text-secondary] hover:border-red-500 hover:text-red-400'
            }`}
          >
            {confirmDelete ? 'Confirm?' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
