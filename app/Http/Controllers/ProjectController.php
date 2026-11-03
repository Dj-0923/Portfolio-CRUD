<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;
use Throwable;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::with('category')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create', [
            'project' => null,
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->normalizeNewCategorySelection($request);
        $data = $request->validate($this->rules(), $this->messages());
        $imagePath = $request->file('image')->store('projects', 'public');
        if ($imagePath === false) {
            throw new RuntimeException('Unable to store the project image.');
        }

        try {
            DB::transaction(function () use ($data, $imagePath): void {
                Project::create([
                    ...Arr::only($data, ['title', 'description', 'tools', 'project_url', 'repository_url', 'date_completed', 'role']),
                    'category_id' => $this->resolveCategoryId($data),
                    'image' => $imagePath,
                ]);
            });
        } catch (Throwable $exception) {
            Storage::disk('public')->delete($imagePath);
            throw $exception;
        }

        return to_route('projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $this->normalizeNewCategorySelection($request);
        $data = $request->validate($this->rules($project), $this->messages());
        $oldImagePath = $project->image;
        $newImagePath = $request->hasFile('image')
            ? $request->file('image')->store('projects', 'public')
            : null;
        if ($newImagePath === false) {
            throw new RuntimeException('Unable to store the replacement project image.');
        }

        try {
            DB::transaction(function () use ($data, $newImagePath, $project): void {
                $payload = [
                    ...Arr::only($data, ['title', 'description', 'tools', 'project_url', 'repository_url', 'date_completed']),
                    'category_id' => $this->resolveCategoryId($data),
                ];

                if ($newImagePath !== null) {
                    $payload['image'] = $newImagePath;
                }

                $project->update($payload);
            });
        } catch (Throwable $exception) {
            if ($newImagePath !== null) {
                Storage::disk('public')->delete($newImagePath);
            }

            throw $exception;
        }

        if ($newImagePath !== null) {
            Storage::disk('public')->delete($oldImagePath);
        }

        return to_route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $imagePath = $project->image;
        $project->delete();
        Storage::disk('public')->delete($imagePath);

        return back()->with('success', 'Project deleted successfully.');
    }

    private function rules(?Project $project = null): array
    {
        return [
            'title' => ['required', 'string', 'max:60', Rule::unique('projects', 'title')->ignore($project?->id)],
            'category_id' => ['nullable', 'required_without:new_category', 'exists:categories,id'],
            'new_category' => [
                'nullable',
                'required_without:category_id',
                'string',
                'max:30',
                function (string $attribute, mixed $value, \Closure $fail): void {
                    if ($value && Category::whereRaw('LOWER(name) = ?', [mb_strtolower(trim($value))])->exists()) {
                        $fail('That category already exists.');
                    }
                },
            ],
            'description' => ['required', 'string', 'min:20', 'max:300'],
            'tools' => ['required', 'string', 'max:80'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'repository_url' => ['nullable', 'url', 'max:255'],
            'date_completed' => ['required', 'date', 'before_or_equal:today'],
            'role' => ['required', 'string', 'max:80'],
            'image' => [$project ? 'nullable' : 'required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    private function messages(): array
    {
        return [
            'title.required' => 'Please enter a project title.',
            'title.unique' => 'You already have a project with this title.',
            'category_id.required_without' => 'Please choose a category or add a new one.',
            'new_category.required_without' => 'Enter the name of the new category.',
            'description.min' => 'The description must be at least :min characters.',
            'date_completed.before_or_equal' => 'The date completed cannot be in the future.',
            'image.required' => 'Please upload a project image.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'The image must be a JPG, PNG or WEBP file.',
            'image.max' => 'The image must not be larger than 2 MB.',
        ];
    }

    private function resolveCategoryId(array $data): int
    {
        if (! empty($data['new_category'])) {
            return Category::create(['name' => trim($data['new_category'])])->id;
        }

        return (int) $data['category_id'];
    }

    private function normalizeNewCategorySelection(Request $request): void
    {
        if ($request->input('category_id') === '__new') {
            $request->merge(['category_id' => null]);
        }
    }
}
