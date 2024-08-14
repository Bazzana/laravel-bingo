<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class BingoController extends Controller
{
    /**
     * Generate a new 'unique' bingo number, expects a query parameter for already returned numbers
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function generateNumber(Request $request) {

        // Get any of our previously returned numbers
        $previous_numbers = explode(',',$request->input('numbers'));
        $previous_numbers_array = array_map('intval', $previous_numbers);

        // Take the same approach to generating our numbers as the frontend
        $all_numbers = range(intval(1), 100);
        
        // Remove any previously returned numbers and 0
        $bingo_numbers = array_diff($all_numbers, $previous_numbers_array);

        // Randomise
        $bingo_numbers = Arr::shuffle($bingo_numbers);
 
        // If the resulting array is empty, return 0 otherwise return the 1st element in the array
        return empty($bingo_numbers) ? response()->json(0) : response()->json($bingo_numbers[0]);
    }
}
