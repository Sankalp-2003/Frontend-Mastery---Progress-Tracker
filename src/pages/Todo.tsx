import { useState, useMemo } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { useTaskContext } from '@/contexts/TaskContext';
import { TodoInput } from '@/components/todo/TodoInput';
import { TodoFilter } from '@/components/todo/TodoFilter';
import { TodoItem } from '@/components/todo/TodoItem';
import type { TodoStatus } from '@/types';

type Filter = 'all' | TodoStatus;

export default function Todo() {
  const { todos, add, update, remove, cycleStatus } = useTodos();
  const { addToast } = useTaskContext();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return todos;
    return todos.filter((t) => t.status === filter);
  }, [todos, filter]);

  const counts = useMemo(
    () => ({
      all: todos.length,
      pending: todos.filter((t) => t.status === 'pending').length,
      'in-progress': todos.filter((t) => t.status === 'in-progress').length,
      done: todos.filter((t) => t.status === 'done').length,
    }),
    [todos]
  );

  const handleAdd = async (title: string, notes: string) => {
    await add(title, notes);
    addToast('Todo added', 'success');
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="font-syne font-bold text-2xl text-[--color-text-primary]">Todo</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoFilter active={filter} onChange={setFilter} counts={counts} />
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-[--color-text-secondary] font-mono text-sm">
          {filter === 'all' ? 'No todos yet. Add one above.' : `No ${filter} todos.`}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={update}
              onDelete={remove}
              onCycleStatus={cycleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
