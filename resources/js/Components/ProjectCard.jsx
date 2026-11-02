import { Link } from '@inertiajs/react';
import DeleteProjectButton from './DeleteProjectButton';

export default function ProjectCard({ project }) {
    const tools = project.tools.split(',').map((tool) => tool.trim()).filter(Boolean);

    return (
        <article className="overflow-hidden rounded-2xl border border-white/10 bg-panel">
            <img src={project.image_url} alt={`Preview of ${project.title}`} width="640" height="360" loading="lazy" className="aspect-video w-full object-cover" />
            <div className="p-5">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-coral">{project.category.name}</p>
                <h3 className="mt-1 text-lg font-extrabold">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blush">{project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools used">
                    {tools.map((tool) => <li key={tool} className="rounded-full border border-white/15 bg-ink px-3 py-1 font-sans text-xs text-peach">{tool}</li>)}
                </ul>
                {(project.project_url || project.repository_url) && (
                    <p className="mt-4 flex gap-4 text-sm font-bold">
                        {project.project_url && <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-4">Live ↗</a>}
                        {project.repository_url && <a href={project.repository_url} target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-4">Code ↗</a>}
                    </p>
                )}
                <div className="mt-5 flex gap-2 border-t border-white/10 pt-4">
                    <Link href={`/projects/${project.id}/edit`} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-bold hover:bg-white/20">✏️ Edit</Link>
                    <DeleteProjectButton project={project} />
                </div>
            </div>
        </article>
    );
}
