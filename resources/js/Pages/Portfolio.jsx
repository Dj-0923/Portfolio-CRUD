import { Head } from '@inertiajs/react';
import { useState } from 'react';
import ContactForm from '../Components/ContactForm';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import HeroPortrait from '../Components/HeroPortrait';
import ProjectsSection from '../Components/ProjectsSection';
import SectionTitle from '../Components/SectionTitle';

const aboutCards = [
    ['Who I Am', 'Mark-dj Villar, a third-year BSIT student. I love turning ideas into working projects and learning something new with every build.'],
    ['What I Enjoy', 'I enjoy exploring new technologies, solving complex problems, and creating innovative solutions.'],
    ['What I Study', 'BS Information Technology at Urdaneta City University, with hands-on work in web development, 3D modeling, vector design, and UI prototyping.'],
    ['Beyond the Screen', 'When I’m not building, I’m exploring new tools, watching tutorials, and playing online games. Always curious, always learning.'],
];

export default function Portfolio({ projects, portfolio }) {
    const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

    return (
        <>
            <Head title="Mark-dj Villar | Portfolio">
                <meta name="description" content="Portfolio of Mark-dj Villar, a third-year BSIT student building websites, apps, 3D scenes, and vector art." />
            </Head>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-coral focus:px-4 focus:py-2 focus:text-deep">Skip to content</a>
            <Navbar theme={theme} onThemeChange={setTheme} />
            <main id="main">
                <section id="home" aria-labelledby="hero-title" className="relative overflow-x-clip">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:px-16 lg:py-20">
                        <div>
                            <p className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-peach">Mark-dj Villar • Y3 BSIT • Web &amp; Creative Developer</p>
                            <h1 id="hero-title" className="text-5xl font-extrabold leading-[1.05] tracking-tighter sm:text-6xl lg:text-7xl">
                                Coding with <span className="italic text-coral">Rhythm</span>, Building with Intuition &amp; Precision.
                            </h1>
                            <p className="mt-8 max-w-xl text-lg leading-relaxed text-blush">
                                I&apos;m a third-year BSIT student who turns ideas into working websites, apps, and 3D scenes. I care about clean code, clear design, and finishing what I start.
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <a href="#projects" className="inline-flex items-center gap-2 rounded-lg bg-coral px-8 py-3.5 font-bold text-deep hover:opacity-90">
                                    Explore Projects <span aria-hidden="true">→</span>
                                </a>
                                <a href="#about" className="inline-flex items-center gap-2 rounded-lg bg-panel px-8 py-3.5 font-bold hover:bg-white/15">
                                    About Me <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        <HeroPortrait theme={theme} />
                    </div>
                </section>

                <section id="about" aria-labelledby="about-title" className="scroll-mt-20 px-6 py-20 lg:px-16">
                    <div className="mx-auto max-w-7xl">
                        <SectionTitle id="about-title" title="About Me" subtitle="A third-year BSIT student who learns by building, one small project at a time." subtitleClass="max-w-2xl" />
                        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                            <article className="rounded-2xl border border-white/10 bg-panel p-6 lg:p-8">
                                <img src="/images/profile.png" alt="Portrait of Mark-dj Villar" width="80" height="80" className="h-20 w-20 rounded-full border-2 border-coral bg-white object-cover" />
                                <h3 className="mt-6 text-2xl font-extrabold">Hi, I’m Mark-dj</h3>
                                <p className="mt-4 leading-relaxed text-blush">I’m a third-year BSIT student who loves turning ideas into working projects. I enjoy 3D modeling, game design, and clean UI, and I’m always learning something new with every build. Fast to start, careful to finish, and curious about everything.</p>
                                <blockquote className="mt-6 rounded-xl border border-white/10 bg-ink p-4">
                                    <p className="font-sans text-xs uppercase tracking-widest text-coral">My goal</p>
                                    <p className="mt-2 text-blush">“Small edits today, bigger builds tomorrow. I keep learning, one function and one fix at a time, until the code I read becomes the code I can write.”</p>
                                </blockquote>
                            </article>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {aboutCards.map(([heading, body]) => (
                                    <article key={heading} className="rounded-2xl border border-white/10 bg-panel p-6">
                                        <h3 className="text-lg font-extrabold">{heading}</h3>
                                        <p className="mt-3 text-sm leading-relaxed text-blush">{body}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="education" aria-labelledby="education-title" className="scroll-mt-20 px-6 py-20 lg:px-16">
                    <div className="mx-auto max-w-7xl">
                        <SectionTitle id="education-title" title="Education" />
                        <ol className="mt-10 max-w-2xl space-y-10 border-l-2 border-coral pl-8">
                            {portfolio.education.map((item) => (
                                <li key={`${item.years}-${item.title}`} className="relative">
                                    <span aria-hidden="true" className="absolute -left-10 top-1.5 h-3.5 w-3.5 rounded-full bg-coral" />
                                    <p className="font-sans text-xs uppercase tracking-widest text-peach">{item.years}</p>
                                    <h3 className="mt-1 text-xl font-extrabold">{item.title}</h3>
                                    <p className="mt-1 text-white">{item.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20 px-6 py-20 lg:px-16">
                    <div className="mx-auto max-w-7xl">
                        <SectionTitle id="skills-title" title="Skills" subtitle="Categorized capabilities spanning codebases, 3D engines, and graphic suites." subtitleClass="max-w-xl" />
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(portfolio.skills).map(([group, items]) => (
                                <article key={group} className="rounded-2xl border border-white/10 bg-panel p-6">
                                    <h3 className="text-xl font-extrabold">{group}</h3>
                                    <ul className="mt-5 space-y-2">
                                        {items.map(([name, note]) => (
                                            <li key={name} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-ink px-3 py-2.5 text-sm">
                                                <span>{name}</span><span className="text-right font-sans text-xs text-coral">{note}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <ProjectsSection projects={projects} />

                <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 px-6 py-20 lg:px-16">
                    <div className="mx-auto max-w-7xl">
                        <SectionTitle id="contact-title" title="Let’s build something epic together." subtitle="Whether you have an internship opening, an exciting freelance collaboration, or want to explore vibe coding workflows, reach out!" subtitleClass="max-w-2xl" />
                        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                            <div className="space-y-4">
                                <ul className="space-y-3">
                                    <li className="rounded-2xl border border-white/10 bg-panel p-4">
                                        <p className="font-sans text-xs uppercase tracking-widest text-peach">Email</p>
                                        <a href={`mailto:${portfolio.contact.email}`} className="mt-1 block break-all font-bold no-underline">{portfolio.contact.email}</a>
                                    </li>
                                    <li className="rounded-2xl border border-white/10 bg-panel p-4">
                                        <p className="font-sans text-xs uppercase tracking-widest text-peach">Social</p>
                                        <a href={portfolio.contact.facebook.url} target="_blank" rel="noopener noreferrer" className="mt-1 block font-bold no-underline">{portfolio.contact.facebook.label}</a>
                                    </li>
                                    <li className="rounded-2xl border border-white/10 bg-panel p-4">
                                        <p className="font-sans text-xs uppercase tracking-widest text-peach">GitHub</p>
                                        <a href={portfolio.contact.github.url} target="_blank" rel="noopener noreferrer" className="mt-1 block break-all font-bold no-underline">{portfolio.contact.github.label}</a>
                                    </li>
                                </ul>
                            </div>
                            <ContactForm />
                        </div>
                    </div>
                </section>
            </main>
            <Footer portfolio={portfolio} />
        </>
    );
}
