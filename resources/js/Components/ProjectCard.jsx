import { Link } from '@inertiajs/react';

export default function ProjectCard({ project }) {
    const tools = project.tools.split(',').map((tool) => tool.trim()).filter(Boolean);

    return (
        <article className="overflow-hidden rounded-2xl border border-white/10 bg-panel">
            <Link
                href="/projects"
                aria-label={`Manage project: ${project.title}`}
                className="block transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
            >
                <img src={project.image_url} alt="" width="640" height="360" loading="lazy" className="aspect-video w-full object-cover" />
                <span className="block p-5">
                    <span className="block font-sans text-xs font-bold uppercase tracking-widest text-coral">{project.category.name}</span>
                    <span role="heading" aria-level="3" className="mt-1 block text-lg font-extrabold">{project.title}</span>
                    {project.role && (
                        <p className="mt-1 text-sm text-peach">My role: {project.role}</p>
                     )}
                    <span className="mt-2 block text-sm leading-relaxed text-blush">{project.description}</span>
                    <span className="mt-3 block text-xs font-bold text-mute">Click to manage this project</span>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools used">
                        {tools.map((tool) => <li key={tool} className="rounded-full border border-white/15 bg-ink px-3 py-1 font-sans text-xs text-peach">{tool}</li>)}
                    </ul>
                </span>
            </Link>
            <div className="px-5 pb-5">
                {(project.project_url || project.repository_url) && (
                    <p className="mt-4 flex gap-4 text-sm font-bold">
                        {project.project_url && <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-4">Live ↗</a>}
                        {project.repository_url && <a href={project.repository_url} target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-4">Code ↗</a>}
                    </p>
                )}
            </div>
        </article>
    );
}
