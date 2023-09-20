<?php

namespace Database\Seeders;

use App\Models\PatientService;
use Illuminate\Database\Seeder;

class PatientServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PatientService::create(['name' => 'Inpatient', 'id' => 1]);
        PatientService::create(['name' => 'Outpatient', 'id' => 2]);
    }
}
