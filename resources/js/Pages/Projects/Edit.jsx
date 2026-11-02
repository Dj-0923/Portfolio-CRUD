import { Head } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';
import ProjectForm from '../../Components/ProjectForm';

export default function Edit({ project, categories }) {
    return (
        <AdminLayout title="Edit project">
            <Head title={`Edit ${project.title}`} />
            <ProjectForm project={project} categories={categories} />
        </AdminLayout>
    );
}
