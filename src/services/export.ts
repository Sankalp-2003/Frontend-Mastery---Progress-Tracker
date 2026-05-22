import type { ExportData } from '@/types';
import {
  getCompletedTaskCompletions,
  getAllTodos,
  putCompletions,
  putTodos,
} from './db';

export async function exportData(): Promise<void> {
  const taskCompletions = await getCompletedTaskCompletions();
  const todos = await getAllTodos();
  const data: ExportData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    taskCompletions,
    todos,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `frontend-mastery-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importData(file: File): Promise<void> {
  const text = await file.text();
  const data: unknown = JSON.parse(text);
  if (!isExportData(data)) throw new Error('Invalid backup file format');
  await putCompletions(data.taskCompletions);
  await putTodos(data.todos);
}

function isExportData(v: unknown): v is ExportData {
  if (typeof v !== 'object' || v === null) return false;
  const d = v as Record<string, unknown>;
  return (
    d['version'] === 1 &&
    Array.isArray(d['taskCompletions']) &&
    Array.isArray(d['todos'])
  );
}
