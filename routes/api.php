<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BingoController;
use App\Http\Controllers\ScoreController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Get a bingo number
Route::get('/getNumber', [BingoController::class, 'generateNumber']);

// Validate our marked number 
Route::post('/markNumber', [BingoController::class, 'validateNumber']);

// Get all bingo scores
Route::get('/scores', [ScoreController::class, 'index']);

// Add a new bingo score
Route::post('/scores', [ScoreController::class, 'store']);