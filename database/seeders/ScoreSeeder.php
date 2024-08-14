<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Score;

class ScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Score::create(['name' => 'Betty', 'score' => 70]);
        Score::create(['name' => 'Eileen', 'score' => 56]);
        Score::create(['name' => 'Gerald', 'score' => 30]);
    }
}
