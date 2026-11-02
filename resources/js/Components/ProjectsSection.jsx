import { Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import FlashMessage from './FlashMessage';
import ProjectCard from './ProjectCard';
import SectionTitle from './SectionTitle';

export default function ProjectsSection({ projects }) {
    const [filter, setFilter] = useState('all');
    const flash = usePage().props.flash?.success;
    const categories = useMemo(() => {
        const unique = new Map();
        projects.forEach((project) => unique.set(project.category.id, project.category));
        return [...unique.values()].sort((first, second) => first.name.localeCompare(second.name));
    }, [projects]);
    const visible = filter === 'all' ? projects : projects.filter((project) => String(project.category_id) === filter);

    return (
        <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20 px-6 py-20 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <SectionTitle id="projects-title" title="Projects Accomplished" subtitle="Curated creative suite and developer technologies." subtitleClass="max-w-xl" />
                {flash && <FlashMessage />}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Filter projects by category">
                        {[{ id: 'all', name: 'All' }, ...categories.map((category) => ({ id: String(category.id), name: category.name }))].map((category) => {
                            const active = filter === category.id;
                            return (
                                <button key={category.id} type="button" aria-pressed={active} onClick={() => setFilter(category.id)} className={`rounded-full border px-4 py-2 text-sm font-bold hover:text-white ${active ? 'border-coral bg-coral text-deep' : 'border-white/20 text-blush'}`}>
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>
                    <Link href="/projects/create" className="rounded-lg bg-coral px-5 py-2.5 text-sm font-bold text-deep hover:opacity-90">+ Add project</Link>
                </div>
                <p role="status" className="mt-3 text-sm text-mute">Showing {visible.length} of {projects.length} projects</p>
                {projects.length === 0 ? (
                    <div className="mt-6 rounded-2xl border-2 border-dashed border-white/20 p-10 text-center">
                        <p className="text-4xl" aria-hidden="true">📂</p>
                        <p className="mt-3 text-lg font-bold">No projects yet.</p>
                        <p className="mt-1 text-sm text-mute">Add a project to display it in your portfolio.</p>
                    </div>
                ) : (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {visible.map((project) => <ProjectCard key={project.id} project={project} />)}
                    </div>
                )}
            </div>
        </section>
    );
}
