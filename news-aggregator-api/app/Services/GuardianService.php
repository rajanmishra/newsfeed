<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class GuardianService implements GuardianServiceInterface
{
    public function fetchNews($query, $category, $date)
    {
        $apiKey = env('GUARDIAN_API_KEY');
        $url = 'https://content.guardianapis.com/search?api-key=' . $apiKey . '&q=' . urlencode($query);

        if (!empty($category)) {
            $url .= '&section=' . urlencode($category);
        }

        if (!empty($date)) {
            $url .= '&from-date=' . urlencode($date) . '&to-date=' . urlencode($date);
        }

        $response = Http::get($url);

        if ($response->successful()) {
            $results = $response->json()['response']['results'];
            return array_map(function ($article) {
                return [
                    'title' => $article['webTitle'],
                    'description' => '',
                    'url' => $article['webUrl'],
                    'source' => 'The Guardian',
                ];
            }, $results);
        }

        return [];
    }
}
