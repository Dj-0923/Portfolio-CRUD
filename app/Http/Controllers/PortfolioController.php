<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Portfolio', [
            'projects' => Project::with('category')->latest()->get(),
            'portfolio' => require resource_path('data/portfolio.php'),
        ]);
    }
}
