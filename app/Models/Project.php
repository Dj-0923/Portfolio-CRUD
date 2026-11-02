<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    // Only these columns can be mass-assigned (Project::create / ->update).
    protected $fillable = [
        'category_id',
        'title',
        'description',
        'tools',
        'project_url',
        'repository_url',
        'image',
        'date_completed',
    ];

    // Sent to React together with the normal columns.
    protected $appends = ['image_url'];

    protected function casts(): array
    {
        return ['date_completed' => 'date:Y-m-d'];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    // /storage/projects/xxxx.png (needs: php artisan storage:link)
    protected function imageUrl(): Attribute
    {
        return Attribute::get(fn () => '/storage/'.$this->image);
    }
}
