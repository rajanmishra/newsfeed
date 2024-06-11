<?php
namespace App\Services;

interface NewsServiceInterface
{
    public function fetchNews($query, $category, $date);
}
