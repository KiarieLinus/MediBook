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
        PatientGender::create(['name' => 'Male', 'id' => 1]);
        PatientGender::create(['name' => 'Female', 'id' => 2]);
    }
}
