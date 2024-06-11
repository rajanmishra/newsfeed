<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\UserPreferences;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller as Controller;

class UserPreferencesController extends Controller
{
    public function show()
    {
        $preferences = UserPreferences::where('user_id', Auth::id())->firstOrFail();
        return response()->json($preferences);
    }

    public function update(Request $request)
    {
        $request->validate([
            'categories' => 'array',
            'sources' => 'array',
        ]);

        $preferences = UserPreferences::updateOrCreate(
            ['user_id' => Auth::id()],
            ['categories' => $request->categories, 'sources' => $request->sources]
        );

        return response()->json($preferences);
    }
}
