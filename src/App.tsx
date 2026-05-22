import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from '@/contexts/TaskContext';
import { Navigation } from '@/components/layout/Navigation';
import { Header } from '@/components/layout/Header';
import { ToastContainer } from '@/components/shared/Toast';
import { useTaskContext } from '@/contexts/TaskContext';
import Dashboard from '@/pages/Dashboard';
import Tasks from '@/pages/Tasks';
import Todo from '@/pages/Todo';

function AppShell() {
  const { toasts } = useTaskContext();
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text-primary)' }}>
      <Header />
      <Navigation />
      <main className="pb-20 md:pb-0 md:ml-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </main>
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <AppShell />
      </TaskProvider>
    </BrowserRouter>
  );
}
