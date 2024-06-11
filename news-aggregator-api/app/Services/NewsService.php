<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class NewsService implements NewsServiceInterface
{
    public function fetchNews($query, $category, $date)
    {
        $apiKey = env('NEWS_API_KEY');
        $url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' . $apiKey . '&q=' . urlencode($query);

        if (!empty($category)) {
            $url .= '&category=' . urlencode($category);
        }

        if (!empty($date)) {
            $url .= '&from=' . urlencode($date) . '&to=' . urlencode($date);
        }

        $response = Http::get($url);

        if ($response->successful()) {
            return $response->json()['articles'];
        }

        return [];
    }
}
