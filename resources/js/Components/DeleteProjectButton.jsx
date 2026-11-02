import { router } from '@inertiajs/react';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

export default function DeleteProjectButton({ project }) {
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);

    const destroy = () => {
        router.delete(`/projects/${project.id}`, {
            preserveScroll: true,
            onStart: () => setBusy(true),
            onFinish: () => {
                setBusy(false);
                setOpen(false);
            },
        });
    };

    return (
        <>
            <button type="button" onClick={() => setOpen(true)} className="delete-action rounded-lg bg-red-700 px-3 py-1.5 text-sm font-bold text-white hover:bg-red-600">
                <svg aria-hidden="true" focusable="false" className="mr-1 inline-block h-4 w-4 align-[-0.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2m3 0-1 14H6L5 6" />
                    <path d="M10 11v5m4-5v5" />
                </svg>
                Delete
            </button>
            <ConfirmDialog
                open={open}
                busy={busy}
                title="Confirmation"
                message={`Are you sure you want to delete “${project.title}”? This action cannot be undone.`}
                onConfirm={destroy}
                onCancel={() => setOpen(false)}
            />
        </>
    );
}
