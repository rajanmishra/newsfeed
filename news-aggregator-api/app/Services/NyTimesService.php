<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class NyTimesService implements NyTimesServiceInterface
{
    public function fetchNews($query, $category, $date)
    {
        // Implement the logic to fetch news from NY Times API
        $apiKey = env('NYTIMES_API_KEY');
        $url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' . $apiKey . '&q=' . urlencode($query);

        if (!empty($category)) {
            $url .= '&fq=news_desk:("' . urlencode($category) . '")';
        }

        if (!empty($date)) {
            $url .= '&begin_date=' . date('Ymd', strtotime($date)) . '&end_date=' . date('Ymd', strtotime($date));
        }

        $response = Http::get($url);

        if ($response->successful()) {
            $results = $response->json()['response']['docs'];
            return array_map(function ($article) {
                return [
                    'title' => $article['headline']['main'],
                    'description' => $article['abstract'],
                    'url' => $article['web_url'],
                    'source' => 'The New York Times',
                ];
            }, $results);
        }

        return [];
    }
}
