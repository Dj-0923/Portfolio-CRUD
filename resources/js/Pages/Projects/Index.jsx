import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';
import DeleteProjectButton from '../../Components/DeleteProjectButton';

export default function Index({ projects }) {
    return (
        <AdminLayout
            title="Projects"
            actions={<Link href="/projects/create" className="rounded-lg bg-coral px-5 py-2.5 text-sm font-bold text-deep hover:opacity-90">+ New project</Link>}
        >
            <Head title="Manage projects" />
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-panel">
                <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="text-xs uppercase tracking-widest text-peach">
                        <tr>
                            <th className="p-4">Image</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Tools</th>
                            <th className="p-4">Completed</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-mute">No projects yet. Click “New project” to add one.</td></tr>}
                        {projects.map((project) => (
                            <tr key={project.id} className="border-t border-white/10">
                                <td className="p-4"><img src={project.image_url} alt="" className="h-12 w-20 rounded-md object-cover" /></td>
                                <td className="p-4 font-bold">{project.title}</td>
                                <td className="p-4">{project.category.name}</td>
                                <td className="p-4 text-blush">{project.tools}</td>
                                <td className="p-4">{project.date_completed}</td>
                                <td className="p-4">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/projects/${project.id}/edit`} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-bold hover:bg-white/20">✏️ Edit</Link>
                                        <DeleteProjectButton project={project} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
