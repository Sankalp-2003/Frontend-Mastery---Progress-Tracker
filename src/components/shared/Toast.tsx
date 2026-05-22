import type { ToastMessage } from '@/types';

export function ToastContainer({ toasts }: { toasts: ToastMessage[] }) {
  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 md:bottom-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2 rounded text-sm font-mono font-medium shadow-lg animate-slideIn
            ${
              t.type === 'success'
                ? 'bg-[--color-success] text-black'
                : t.type === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-[--color-accent] text-white'
            }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
