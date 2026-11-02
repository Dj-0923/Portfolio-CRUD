import { useEffect, useRef } from 'react';

export default function ConfirmDialog({ open, title, message, busy, onConfirm, onCancel }) {
    const cancelRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        cancelRef.current?.focus();
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && !busy) onCancel();
            if (event.key === 'Tab') {
                event.preventDefault();
                cancelRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.classList.add('overflow-hidden');
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.classList.remove('overflow-hidden');
        };
    }, [open, busy, onCancel]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-confirmation-title"
            aria-describedby="delete-confirmation-message"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !busy) onCancel();
            }}
        >
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-2xl">
                <div className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                        <svg aria-hidden="true" focusable="false" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 9v4m0 4h.01" />
                            <path d="M10.3 3.9 1.8 18.2A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                        </svg>
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                        <h2 id="delete-confirmation-title" className="text-xl font-extrabold">{title}</h2>
                        <p id="delete-confirmation-message" className="mt-2 text-left text-sm leading-relaxed text-blush">{message}</p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 border-t border-white/10 bg-black/10 px-6 py-4">
                    <button ref={cancelRef} type="button" onClick={onCancel} disabled={busy} className="rounded-lg border border-white/20 px-4 py-2 text-sm font-bold hover:bg-white/10 disabled:opacity-60">
                        Cancel
                    </button>
                    <button type="button" onClick={onConfirm} disabled={busy} className="delete-action rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-60">
                        {busy ? 'Deleting…' : 'Delete project'}
                    </button>
                </div>
            </div>
        </div>
    );
}
