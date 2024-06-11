<?php
// app/Models/UserPreferences.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreferences extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'categories', 'sources'];

    protected $casts = [
        'categories' => 'array',
        'sources' => 'array',
    ];
}
