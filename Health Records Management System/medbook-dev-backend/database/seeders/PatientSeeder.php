<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Patient;
use App\Models\Gender;
use App\Models\Service;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $patientsData = [
            ['name' => 'Linus Kiarie', 'date_of_birth' => '1980-01-01', 'gender_id' => 1],
            ['name' => 'Nala Tamui',  'date_of_birth' => '1985-02-15', 'gender_id' => 2],
        ];

        foreach ($patientsData as $patientData) {
            $gender = Gender::find($patientData['gender_id']);
            $service = Service::inRandomOrder()->first();
            $service2 = Service::inRandomOrder()->first();

            $patient = new Patient($patientData);
            $patient->gender()->associate($gender);
            $patient->save();
            $patient->services()->attach($service);
            $patient->services()->attach($service2);
        }
    }
}
