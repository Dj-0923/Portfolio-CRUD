import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const message = usePage().props.flash?.success;
    if (!message) return null;

    return (
        <p role="status" className="mb-6 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm font-bold text-green-500">
            {message}
        </p>
    );
}
