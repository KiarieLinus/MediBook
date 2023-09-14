<?php

namespace Database\Seeders;

use App\Models\PatientGender;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatientGenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PatientGender::create(['gender' => 'Male']);
        PatientGender::create(['gender' => 'Female']);
    }
}
