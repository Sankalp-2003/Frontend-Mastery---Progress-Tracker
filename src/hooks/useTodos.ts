import { useState, useEffect, useCallback } from 'react';
import type { Todo, TodoStatus } from '@/types';
import { getAllTodos, addTodo, updateTodo, deleteTodo } from '@/services/db';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getAllTodos().then(setTodos);
  }, []);

  const add = useCallback(async (title: string, notes: string) => {
    const now = new Date().toISOString();
    const id = await addTodo({ title, notes, status: 'pending', createdAt: now, updatedAt: now });
    setTodos((prev) => [
      ...prev,
      { id, title, notes, status: 'pending', createdAt: now, updatedAt: now },
    ]);
  }, []);

  const update = useCallback(async (todo: Todo) => {
    const updated = { ...todo, updatedAt: new Date().toISOString() };
    await updateTodo(updated);
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
  }, []);

  const remove = useCallback(async (id: number) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const cycleStatus = useCallback(
    async (todo: Todo) => {
      const next: TodoStatus =
        todo.status === 'pending'
          ? 'in-progress'
          : todo.status === 'in-progress'
            ? 'done'
            : 'pending';
      await update({ ...todo, status: next });
    },
    [update]
  );

  return { todos, add, update, remove, cycleStatus };
}
