import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { ToastMessage, ToastType } from '@/types';
import { getCompletedTaskIds, markTaskComplete, markTaskIncomplete } from '@/services/db';

interface TaskContextValue {
  completedIds: Set<string>;
  toggleTask: (id: string) => Promise<void>;
  isLoaded: boolean;
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastType) => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    getCompletedTaskIds().then((ids) => {
      setCompletedIds(new Set(ids));
      setIsLoaded(true);
    });
  }, []);

  const toggleTask = useCallback(
    async (id: string) => {
      if (completedIds.has(id)) {
        await markTaskIncomplete(id);
        setCompletedIds((prev) => {
          const s = new Set(prev);
          s.delete(id);
          return s;
        });
      } else {
        await markTaskComplete(id);
        setCompletedIds((prev) => new Set(prev).add(id));
      }
    },
    [completedIds]
  );

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  return (
    <TaskContext.Provider value={{ completedIds, toggleTask, isLoaded, toasts, addToast }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskContext must be used within TaskProvider');
  return ctx;
}
