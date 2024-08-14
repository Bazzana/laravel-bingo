<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class ScoresController extends Controller
{
    public function index()
    {
        $scores = Score::all()
 
        return response()->json($scores);
    }
}
