<?php

namespace Database\Factories;

use App\Models\Patient;
use App\Models\PatientService;
use App\Models\PatientGender;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Patient::class;

    public function definition()
    {
        $gender = PatientGender::inRandomOrder()->first();
        return [
            'name' => $this->faker->name(strtolower($gender->name)),
            'date_of_birth' => $this->faker->date(),
            'general_comments' => $this->faker->text(200),
            'patient_gender_id' => $gender->id,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Patient $patient) {
            //Save patient service records
            $services = PatientService::all();
            $service = $services->random();

            $patient->patientServices()->attach($service);

            //Add more services to some patients
            $hasMore = [true, false];
            if ($this->faker->randomElement($hasMore)) {
                $service = $services->random();
                $patient->patientServices()->attach($service);
                $service = $services->random();
                $patient->patientServices()->attach($service);
            }
        });
    }
}
