<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\UserPreferencesController;
 
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
    Route::post('/profile', [AuthController::class, 'profile'])->middleware('auth:api');
});


Route::get('/news', [NewsController::class, 'fetchNews'])->middleware('auth:api');
Route::get('/user/preferences', [UserPreferencesController::class, 'show'])->middleware('auth:api');
Route::post('/user/preferences', [UserPreferencesController::class, 'update'])->middleware('auth:api');
