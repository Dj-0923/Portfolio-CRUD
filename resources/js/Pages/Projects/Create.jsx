import { Head } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';
import ProjectForm from '../../Components/ProjectForm';

export default function Create({ categories }) {
    return (
        <AdminLayout title="New project">
            <Head title="New project" />
            <ProjectForm categories={categories} />
        </AdminLayout>
    );
}
