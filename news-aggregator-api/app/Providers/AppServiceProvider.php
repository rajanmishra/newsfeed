<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\GuardianService;
use App\Services\NyTimesService;
use App\Services\NewsService;
use App\Services\NewsServiceInterface;
use App\Services\GuardianServiceInterface;
use App\Services\NyTimesServiceInterface;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->bind(GuardianServiceInterface::class, GuardianService::class);
        $this->app->bind(NyTimesServiceInterface::class, NyTimesService::class);
        $this->app->bind(NewsServiceInterface::class, NewsService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
