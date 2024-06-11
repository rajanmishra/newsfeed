<?php
namespace App\Services;

interface GuardianServiceInterface
{
    public function fetchNews($query, $category, $date);
}
