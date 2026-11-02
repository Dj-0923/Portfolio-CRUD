import { useEffect, useRef, useState } from 'react';

const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

export default function Navbar({ theme, onThemeChange }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const navRef = useRef(null);
    const navListRef = useRef(null);
    const indicatorRef = useRef(null);

    useEffect(() => {
        const updateActiveSection = () => {
            let current = 'home';
            links.forEach(({ id }) => {
                const section = document.getElementById(id);
                if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', updateActiveSection, { passive: true });
        window.addEventListener('resize', updateActiveSection);
        updateActiveSection();
        return () => {
            window.removeEventListener('scroll', updateActiveSection);
            window.removeEventListener('resize', updateActiveSection);
        };
    }, []);

    useEffect(() => {
        const activeLink = navRef.current?.querySelector(`[data-nav="${activeSection}"]`);
        const list = navListRef.current;
        const indicator = indicatorRef.current;
        if (!activeLink || !list || !indicator || !navRef.current?.offsetWidth) return;
        const listRect = list.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.height = `${linkRect.height}px`;
        indicator.style.transform = `translate3d(${linkRect.left - listRect.left}px, ${linkRect.top - listRect.top}px, 0)`;
        indicator.classList.add('is-visible');
    }, [activeSection, menuOpen]);

    const changeTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        const apply = () => {
            document.documentElement.dataset.theme = nextTheme;
            onThemeChange(nextTheme);
            try {
                localStorage.setItem('portfolio-theme', nextTheme);
            } catch (error) {
                console.warn('Unable to save the selected color theme.', error);
            }
        };
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reduceMotion && typeof document.startViewTransition === 'function') {
            const rect = document.getElementById('theme-toggle')?.getBoundingClientRect();
            if (rect) {
                document.documentElement.style.setProperty('--theme-switch-x', `${rect.left + rect.width / 2}px`);
                document.documentElement.style.setProperty('--theme-switch-y', `${rect.top + rect.height / 2}px`);
            }
            document.startViewTransition(apply);
        } else {
            apply();
        }
    };

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur">
            <div className="relative mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-16">
                <a href="#home" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
                    <img src="/images/logo.png" alt="" className="h-11 w-[54px] rounded-xl border border-white/10 object-cover" />
                    <span className="leading-tight">
                        <span className="block text-base font-bold">Mark-dj Villar</span>
                        <span className="block font-sans text-[11px] font-medium uppercase tracking-wider text-peach">Y-3 BSIT</span>
                    </span>
                </a>
                <nav ref={navRef} id="site-nav" aria-label="Main" className={`${menuOpen ? 'block' : 'hidden'} absolute right-6 top-full w-64 max-w-[calc(100%-3rem)] rounded-b-xl border border-t-0 border-white/10 bg-ink px-3 py-3 shadow-2xl lg:static lg:col-start-2 lg:block lg:w-auto lg:max-w-none lg:justify-self-center lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none`}>
                    <ul ref={navListRef} className="relative flex flex-col gap-1 lg:flex-row lg:rounded-xl lg:bg-panel lg:p-1">
                        <span ref={indicatorRef} aria-hidden="true" className="nav-indicator" />
                        {links.map(({ id, label }) => (
                            <li key={id}>
                                <a
                                    data-nav={id}
                                    href={`#${id}`}
                                    aria-current={activeSection === id ? 'true' : undefined}
                                    onClick={() => setMenuOpen(false)}
                                    className={`nav-link block rounded-lg px-4 py-2 text-sm text-mute hover:text-white aria-[current=true]:font-bold aria-[current=true]:text-deep lg:text-base ${activeSection === id ? 'font-bold text-deep' : ''}`}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="col-start-2 flex items-center justify-self-end gap-3 md:col-start-3">
                    <a href="#contact" className="hidden rounded-md bg-coral px-4 py-1.5 text-sm font-bold text-deep hover:opacity-90 lg:inline-block">Get in Touch</a>
                    <button id="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen((open) => !open)} className="rounded-md border border-white/20 p-2 lg:hidden">
                        <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <img src="/images/profile.png" alt="" width="32" height="32" className="h-10 w-10 shrink-0 rounded-full border border-white/20 object-cover" />
                    <button id="theme-toggle" type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} aria-pressed={theme === 'light'} onClick={changeTheme} className="rounded-md border border-white/20 p-2 text-blush transition-colors hover:bg-white/10" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                        <svg className="theme-toggle-icon theme-icon-moon h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
                        </svg>
                        <svg className="theme-toggle-icon theme-icon-sun h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
