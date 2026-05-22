import type { Todo, TaskCompletion } from '@/types';

const DB_NAME = 'frontend-mastery-db';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error('IndexedDB blocked'));
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('task-completions')) {
        db.createObjectStore('task-completions', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('todos')) {
        db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

function tx<T>(
  storeName: string,
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const transaction = db.transaction(storeName, mode);
        const store = transaction.objectStore(storeName);
        const req = fn(store);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
  );
}

export async function markTaskComplete(id: string): Promise<void> {
  const completion: TaskCompletion = { id, completedAt: new Date().toISOString() };
  await tx('task-completions', 'readwrite', (store) => store.put(completion));
}

export async function markTaskIncomplete(id: string): Promise<void> {
  await tx('task-completions', 'readwrite', (store) => store.delete(id));
}

export async function getCompletedTaskIds(): Promise<string[]> {
  const completions = await tx<TaskCompletion[]>(
    'task-completions',
    'readonly',
    (store) => store.getAll()
  );
  return completions.map((c) => c.id);
}

export async function getCompletedTaskCompletions(): Promise<TaskCompletion[]> {
  return tx('task-completions', 'readonly', (store) => store.getAll());
}

export async function clearAllCompletions(): Promise<void> {
  await tx<undefined>('task-completions', 'readwrite', (store) => store.clear());
}

export async function putCompletions(completions: TaskCompletion[]): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('task-completions', 'readwrite');
    const store = transaction.objectStore('task-completions');
    completions.forEach((c) => store.put(c));
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function addTodo(todo: Omit<Todo, 'id'>): Promise<number> {
  const key = await tx<IDBValidKey>('todos', 'readwrite', (store) => store.add(todo));
  return key as number;
}

export async function updateTodo(todo: Todo): Promise<void> {
  await tx('todos', 'readwrite', (store) => store.put(todo));
}

export async function deleteTodo(id: number): Promise<void> {
  await tx('todos', 'readwrite', (store) => store.delete(id));
}

export async function getAllTodos(): Promise<Todo[]> {
  return tx('todos', 'readonly', (store) => store.getAll());
}

export async function clearAllTodos(): Promise<void> {
  await tx<undefined>('todos', 'readwrite', (store) => store.clear());
}

export async function putTodos(todos: Todo[]): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('todos', 'readwrite');
    const store = transaction.objectStore('todos');
    todos.forEach((t) => store.put(t));
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}
