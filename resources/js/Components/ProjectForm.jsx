import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import FormField, { inputClass } from './FormField';

const NEW_CATEGORY = '__new';
const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

export default function ProjectForm({ project = null, categories }) {
    const isEdit = project !== null;
    const [imageName, setImageName] = useState('');
    const form = useForm({
        ...(isEdit ? { _method: 'put' } : {}),
        title: project?.title ?? '',
        category_id: project ? String(project.category_id) : categories.length ? '' : NEW_CATEGORY,
        new_category: '',
        description: project?.description ?? '',
        tools: project?.tools ?? '',
        project_url: project?.project_url ?? '',
        repository_url: project?.repository_url ?? '',
        date_completed: project?.date_completed ?? '',
        image: null,
    });
    const { data, setData, errors, processing } = form;
    const isNewCategory = data.category_id === NEW_CATEGORY;

    const submit = (event) => {
        event.preventDefault();
        form.transform((values) => ({
            ...values,
            category_id: values.category_id === NEW_CATEGORY ? '' : values.category_id,
            new_category: values.category_id === NEW_CATEGORY ? values.new_category : '',
        }));
        form.post(isEdit ? `/projects/${project.id}` : '/projects', {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => form.transform((values) => values),
        });
    };

    return (
        <form onSubmit={submit} encType="multipart/form-data" noValidate className="grid gap-x-6 gap-y-4 rounded-2xl border border-white/10 bg-panel p-6 sm:grid-cols-2 sm:p-8">
            <FormField id="title" label="Title" error={errors.title} className="sm:col-span-2">
                <input id="title" type="text" maxLength="60" required value={data.title} onChange={(event) => setData('title', event.target.value)} placeholder="e.g. Figma - Lendy Prototype" aria-describedby="title-error" className={inputClass(errors.title)} />
            </FormField>

            <FormField id="category_id" label="Category" error={errors.category_id}>
                <select id="category_id" value={data.category_id} onChange={(event) => setData('category_id', event.target.value)} aria-describedby="category_id-error" className={inputClass(errors.category_id)}>
                    <option value="">Choose one</option>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                    <option value={NEW_CATEGORY}>+ Add new category…</option>
                </select>
            </FormField>

            <FormField id="date_completed" label="Date completed" error={errors.date_completed}>
                <div className="relative">
                    <input id="date_completed" type="date" max={today} required value={data.date_completed} onChange={(event) => setData('date_completed', event.target.value)} aria-describedby="date_completed-error" className={`${inputClass(errors.date_completed)} date-completed-input pr-11`} />
                    <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-peach" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M16 3v4M8 3v4M3 11h18" />
                    </svg>
                </div>
            </FormField>

            {isNewCategory && (
                <FormField id="new_category" label="New category name" error={errors.new_category} className="sm:col-span-2">
                    <input id="new_category" type="text" maxLength="30" required value={data.new_category} onChange={(event) => setData('new_category', event.target.value)} placeholder="e.g. Web" aria-describedby="new_category-error" className={inputClass(errors.new_category)} />
                </FormField>
            )}

            <FormField id="description" label="Description" error={errors.description} className="sm:col-span-2">
                <textarea id="description" rows="4" minLength="20" maxLength="300" required value={data.description} onChange={(event) => setData('description', event.target.value)} aria-describedby="description-error" className={inputClass(errors.description)} />
            </FormField>

            <FormField id="tools" label="Tech stack / tools" error={errors.tools} className="sm:col-span-2">
                <input id="tools" type="text" maxLength="80" required value={data.tools} onChange={(event) => setData('tools', event.target.value)} placeholder="Flutter, Dart, Figma" aria-describedby="tools-error" className={inputClass(errors.tools)} />
            </FormField>

            <FormField id="project_url" label="Project URL (optional)" error={errors.project_url}>
                <input id="project_url" type="url" maxLength="255" value={data.project_url} onChange={(event) => setData('project_url', event.target.value)} placeholder="https://..." aria-describedby="project_url-error" className={inputClass(errors.project_url)} />
            </FormField>

            <FormField id="repository_url" label="Repository URL (optional)" error={errors.repository_url}>
                <input id="repository_url" type="url" maxLength="255" value={data.repository_url} onChange={(event) => setData('repository_url', event.target.value)} placeholder="https://github.com/..." aria-describedby="repository_url-error" className={inputClass(errors.repository_url)} />
            </FormField>

            <FormField id="image" label={isEdit ? 'Replace image (optional)' : 'Image'} error={errors.image} className="sm:col-span-2">
                <input
                    id="image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    required={!isEdit}
                    onChange={(event) => {
                        const file = event.target.files?.[0] ?? null;
                        setData('image', file);
                        setImageName(file?.name ?? '');
                    }}
                    aria-describedby="image-error"
                    className={`${inputClass(errors.image)} image-file-input`}
                />
                <p className="mt-1 text-sm text-mute">{imageName || 'JPG, PNG, or WEBP; maximum 2 MB.'}</p>
                {isEdit && (
                    <div className="mt-3 flex items-center gap-3">
                        <img src={project.image_url} alt="" className="h-16 w-28 rounded-lg border border-white/10 object-cover" />
                        <p className="text-sm text-mute">Current image. Choose a file only if you want to replace it.</p>
                    </div>
                )}
            </FormField>

            <div className="mt-2 flex gap-3 sm:col-span-2">
                <button type="submit" disabled={processing} className="rounded-lg bg-coral px-6 py-2.5 font-bold text-deep hover:opacity-90 disabled:opacity-60">
                    {processing ? 'Saving…' : isEdit ? 'Update project' : 'Save project'}
                </button>
                <Link href="/projects" className="rounded-lg bg-white/10 px-6 py-2.5 font-bold hover:bg-white/20">Cancel</Link>
            </div>
        </form>
    );
}
