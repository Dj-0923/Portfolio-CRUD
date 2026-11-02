<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProjectCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_project_can_be_created_updated_and_deleted(): void
    {
        Storage::fake('public');

        $image = UploadedFile::fake()->createWithContent(
            'project.png',
            base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/rWQAAAAASUVORK5CYII=')
        );

        $this->get(route('projects.create'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Projects/Create')->has('categories'));
        $this->post(route('projects.store'), [
            'title' => 'Portfolio project',
            'category_id' => '__new',
            'new_category' => 'Web',
            'description' => 'A sample project description long enough for validation.',
            'tools' => 'Laravel, PHP',
            'date_completed' => now()->toDateString(),
            'image' => $image,
        ])->assertRedirect(route('projects.index'))
            ->assertSessionHas('success', 'Project created successfully.');

        $project = Project::firstOrFail();
        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'title' => 'Portfolio project',
        ]);
        $this->assertDatabaseHas('categories', ['name' => 'Web']);
        Storage::disk('public')->assertExists($project->image);

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Portfolio')
                ->has('projects', 1)
                ->where('projects.0.title', 'Portfolio project'));
        $this->get(route('projects.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Projects/Index')
                ->has('projects', 1));
        $this->get(route('projects.edit', $project))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Projects/Edit')
                ->where('project.title', 'Portfolio project')
                ->has('categories'));

        $category = Category::firstOrFail();
        $this->put(route('projects.update', $project), [
            'title' => 'Updated portfolio project',
            'category_id' => $category->id,
            'description' => 'An updated project description long enough for validation.',
            'tools' => 'Laravel, PHP, SQLite',
            'date_completed' => now()->toDateString(),
        ])->assertRedirect(route('projects.index'))
            ->assertSessionHas('success', 'Project updated successfully.');

        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'title' => 'Updated portfolio project',
            'tools' => 'Laravel, PHP, SQLite',
        ]);

        $this->from(route('projects.index'))
            ->delete(route('projects.destroy', $project))
            ->assertRedirect(route('projects.index'))
            ->assertSessionHas('success', 'Project deleted successfully.');
        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
        Storage::disk('public')->assertMissing($project->image);
    }

    public function test_duplicate_project_titles_are_rejected(): void
    {
        $category = Category::create(['name' => 'Web']);
        Project::create([
            'category_id' => $category->id,
            'title' => 'Existing project',
            'description' => 'An existing project description long enough.',
            'tools' => 'Laravel',
            'image' => 'projects/existing.png',
            'date_completed' => now()->toDateString(),
        ]);

        $this->from(route('projects.create'))->post(route('projects.store'), [
            'title' => 'Existing project',
            'category_id' => $category->id,
            'description' => 'A new project description long enough for validation.',
            'tools' => 'Laravel',
            'date_completed' => now()->toDateString(),
            'image' => UploadedFile::fake()->createWithContent(
                'project.png',
                base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/rWQAAAAASUVORK5CYII=')
            ),
        ])->assertRedirect(route('projects.create'))->assertSessionHasErrors('title');
    }
}
