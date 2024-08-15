<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Score;

class ScoreController extends Controller
{
    public function index()
    {
        $scores = Score::orderBy('score', 'desc')->get();
 
        return response()->json($scores);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'score' => 'required|integer',
        ]);

        $score = abs(100 - intval($request->input('score')));

        // Create a new score record
        $score = Score::create([
            'name' => $request->input('name'),
            'score' => $score,
        ]);

        // Return the created score
        return response()->json($score);
    }
}
