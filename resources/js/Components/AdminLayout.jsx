import { Head, Link } from '@inertiajs/react';
import FlashMessage from './FlashMessage';

export default function AdminLayout({ title, actions, children }) {
    return (
        <div className="min-h-screen">
            <Head title={`${title} | Manage projects`} />
            <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur">
                <div className="mx-auto flex h-20 max-w-5xl items-center justify-between gap-4 px-6">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/images/logo.png" alt="" className="h-11 w-[54px] rounded-xl border border-white/10 object-cover" />
                        <span className="leading-tight">
                            <span className="block text-base font-bold">Mark-dj Villar</span>
                            <span className="block text-[11px] font-medium uppercase tracking-wider text-peach">Manage projects</span>
                        </span>
                    </Link>
                    <Link href="/" className="rounded-md border border-white/20 px-4 py-1.5 text-sm font-bold hover:bg-white/10">
                        ← Back to portfolio
                    </Link>
                </div>
            </header>
            <main className="mx-auto max-w-5xl px-6 py-10">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
                    {actions}
                </div>
                <FlashMessage />
                {children}
            </main>
        </div>
    );
}
