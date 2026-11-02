export default function Footer({ portfolio }) {
    return (
        <footer className="border-t border-white/10 px-6 py-12 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
                <div>
                    <p className="text-xl font-extrabold">Mark-dj Villar</p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-blush">3rd year IT student and creative vibe coder engineering high-impact web interactions, experimental visual systems, and performant digital experiences.</p>
                </div>
                <nav aria-label="Footer">
                    <p className="font-sans text-xs uppercase tracking-widest text-peach">Quick navigation</p>
                    <ul className="mt-3 space-y-2 text-sm">
                        {portfolio.nav.map((item) => <li key={item.id}><a href={`#${item.id}`} className="text-blush hover:text-white">{item.footer}</a></li>)}
                    </ul>
                </nav>
                <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-peach">Connect</p>
                    <ul className="mt-3 space-y-2 text-sm">
                        <li><a href={`mailto:${portfolio.contact.email}`} className="text-blush hover:text-white">Email</a></li>
                        <li><a href={portfolio.contact.github.url} target="_blank" rel="noopener noreferrer" className="text-blush hover:text-white">GitHub</a></li>
                    </ul>
                </div>
            </div>
            <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-6 text-sm text-mute sm:flex-row sm:justify-between">
                <p>&copy; <span>{new Date().getFullYear()}</span> Mark-dj Villar. Vibe Coder.</p>
                <p><a href="#main" className="underline underline-offset-4">Back to top</a></p>
            </div>
        </footer>
    );
}
