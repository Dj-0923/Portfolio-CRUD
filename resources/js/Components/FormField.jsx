export const inputClass = (error) =>
    `mt-2 w-full rounded-lg border bg-ink px-4 py-2.5 text-white placeholder:text-mute ${
        error ? 'border-red-400' : 'border-white/30'
    }`;

export default function FormField({ id, label, error, children, className = '' }) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block font-sans text-xs font-medium uppercase tracking-widest text-peach">
                {label}
            </label>
            {children}
            <p id={`${id}-error`} role={error ? 'alert' : undefined} className="mt-1 min-h-5 text-sm font-bold text-red-400">
                {error}
            </p>
        </div>
    );
}
