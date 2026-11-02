<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ProjectValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_required_project_fields_are_validated(): void
    {
        $this->from(route('projects.create'))
            ->post(route('projects.store'), [])
            ->assertRedirect(route('projects.create'))
            ->assertSessionHasErrors(['title', 'category_id', 'new_category', 'description', 'tools', 'date_completed', 'image']);
    }

    public function test_project_title_cannot_exceed_its_maximum_length(): void
    {
        $this->submitProject(['title' => str_repeat('x', 61)])
            ->assertSessionHasErrors('title');
    }

    public function test_updating_a_project_without_changing_its_unique_title_is_allowed(): void
    {
        $category = Category::create(['name' => 'Web']);
        $project = Project::create([
            'category_id' => $category->id,
            'title' => 'Existing project',
            'description' => 'An existing project description long enough.',
            'tools' => 'Laravel',
            'image' => 'projects/existing.png',
            'date_completed' => now()->toDateString(),
        ]);

        $this->put(route('projects.update', $project), [
            'title' => $project->title,
            'category_id' => $category->id,
            'description' => $project->description,
            'tools' => $project->tools,
            'date_completed' => $project->date_completed->format('Y-m-d'),
        ])->assertRedirect(route('projects.index'))
            ->assertSessionHasNoErrors();
    }

    public function test_project_url_must_be_a_valid_url(): void
    {
        $this->submitProject(['project_url' => 'not-a-url'])
            ->assertSessionHasErrors('project_url');
    }

    public function test_completion_date_cannot_be_in_the_future(): void
    {
        $this->submitProject(['date_completed' => now()->addDay()->toDateString()])
            ->assertSessionHasErrors('date_completed');
    }

    public function test_uploaded_project_image_must_be_an_image(): void
    {
        $this->submitProject([
            'image' => UploadedFile::fake()->create('notes.txt', 20, 'text/plain'),
        ])->assertSessionHasErrors('image');
    }

    public function test_uploaded_project_image_cannot_exceed_two_megabytes(): void
    {
        $png = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/rWQAAAAASUVORK5CYII=');
        $this->submitProject([
            'image' => UploadedFile::fake()->createWithContent('large.png', $png.str_repeat('x', 2 * 1024 * 1024)),
        ])->assertSessionHasErrors('image');
    }

    private function submitProject(array $overrides = [])
    {
        $category = Category::firstOrCreate(['name' => 'Web']);
        $payload = array_merge([
            'title' => 'Validation project',
            'category_id' => $category->id,
            'description' => 'A valid project description long enough for validation.',
            'tools' => 'Laravel, PHP',
            'date_completed' => now()->toDateString(),
            'image' => UploadedFile::fake()->createWithContent(
                'project.png',
                base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/rWQAAAAASUVORK5CYII=')
            ),
        ], $overrides);

        return $this->from(route('projects.create'))->post(route('projects.store'), $payload);
    }
}
