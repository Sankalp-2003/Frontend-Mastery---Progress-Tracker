import { useRef } from 'react';
import { exportData, importData } from '@/services/export';
import { useTaskContext } from '@/contexts/TaskContext';

export function Header() {
  const { addToast } = useTaskContext();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    try {
      await exportData();
      addToast('Backup downloaded', 'success');
    } catch {
      addToast('Export failed', 'error');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importData(file);
      addToast('Data imported — reload to see changes', 'success');
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Import failed', 'error');
    }
    e.target.value = '';
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-[--color-border] bg-[--color-surface] sticky top-0 z-30 md:ml-16">
      <h1 className="font-syne font-bold text-[--color-text-primary] tracking-tight text-lg">
        Frontend <span className="text-[--color-accent]">Mastery</span>
      </h1>
      <div className="flex gap-2">
        <button
          onClick={handleExport}
          className="px-3 py-1 text-xs font-mono border border-[--color-border] rounded text-[--color-text-secondary] hover:border-[--color-accent] hover:text-[--color-accent] transition-colors"
        >
          Export
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="px-3 py-1 text-xs font-mono border border-[--color-border] rounded text-[--color-text-secondary] hover:border-[--color-accent] hover:text-[--color-accent] transition-colors"
        >
          Import
        </button>
        <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
      </div>
    </header>
  );
}
