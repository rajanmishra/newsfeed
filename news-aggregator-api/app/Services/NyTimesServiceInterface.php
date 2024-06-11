<?php
namespace App\Services;

interface NyTimesServiceInterface
{
    public function fetchNews($query, $category, $date);
}
