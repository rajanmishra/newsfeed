<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller as Controller;
use App\Services\GuardianServiceInterface;
use App\Services\NyTimesServiceInterface;
use App\Services\NewsServiceInterface;

class NewsController extends Controller
{
    private $guardianService;
    private $nyTimesService;
    private $newsService;

    public function __construct(
        GuardianServiceInterface $guardianService,
        NyTimesServiceInterface $nyTimesService,
        NewsServiceInterface $newsService
    ) {
        $this->guardianService = $guardianService;
        $this->nyTimesService = $nyTimesService;
        $this->newsService = $newsService;
    }


    public function fetchNews(Request $request)
    {
        $query = $request->input('q', '');
        $category = $request->input('category', '');
        $date = $request->input('date', '');

        $source = $request->input('source', 'all');
        $news = [];

        switch ($source) {
            case 'guardian':
                $news = $this->guardianService->fetchNews($query, $category, $date);
                break;
            case 'nytimes':
                $news = $this->nyTimesService->fetchNews($query, $category, $date);
                break;
            case 'newsapi':
                $news = $this->newsService->fetchNews($query, $category, $date);
                break;
            default:
                // Combine news from all sources if 'all' or unknown source
                $news = array_merge(
                    $this->guardianService->fetchNews($query, $category, $date),
                    $this->nyTimesService->fetchNews($query, $category, $date),
                    $this->newsService->fetchNews($query, $category, $date)
                );
                break;
        }

        return response()->json(['news' => $news]);
    }
}
