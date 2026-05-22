export interface CodingQuestion {
  id: string;
  title: string;
  problemStatement: string;
  inputOutputExample: string;
  hint: string;
  whyAsked: string;
}

export interface DayTask {
  id: string;
  date: string;
  dayLabel: string;
  topics: string[];
  codingQuestions: CodingQuestion[];
}

export interface MiniProject {
  name: string;
  whatToBuild: string;
  detailedExample: string;
  coreFeatures: string[];
  whatYouProved: string;
}

export interface SundayTask {
  id: string;
  date: string;
  dayLabel: string;
  mockInterviewPrompt: string;
  miniProject: MiniProject;
}

export interface Week {
  num: number;
  theme: string;
  why: string;
  startDate: string;
  endDate: string;
  days: DayTask[];
  sunday: SundayTask;
}

export type TaskId = string;

export interface TaskCompletion {
  id: TaskId;
  completedAt: string;
}

export type TodoStatus = 'pending' | 'in-progress' | 'done';

export interface Todo {
  id: number;
  title: string;
  notes: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ExportData {
  version: 1;
  exportedAt: string;
  taskCompletions: TaskCompletion[];
  todos: Todo[];
}

export interface WeekProgress {
  weekNum: number;
  completed: number;
  total: number;
  pct: number;
}

export interface StreakData {
  current: number;
  longest: number;
  last30: boolean[];
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}
