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
            'name' => $this->faker->name(strtolower($gender->gender)),
            'date_of_birth' => $this->faker->date(),
            'general_comments' => $this->faker->text(200),
            'patient_gender_id' => $gender->id,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Patient $patient) {
            //Save patient gender record
            $genderId = $patient->patient_gender_id;
            $gender = PatientGender::find($genderId);
            $patient->patientGender()->associate($gender);
            $patient->save();

            //Save patient service records
            $services = ['Inpatient', 'Outpatient'];

            $service1 = new PatientService;
            $service2 = new PatientService;
            $service1->setServiceTypeAttribute($this->faker->randomElement($services));
            $service2->setServiceTypeAttribute($this->faker->randomElement($services));

            $patient->patientServices()->saveMany([$service1, $service2]);

            //Add more services to some patients
            $hasMore = [true, false];
            if ($this->faker->randomElement($hasMore)) {
                $service3 = new PatientService;
                $service4 = new PatientService;

                $service3->setServiceTypeAttribute($this->faker->randomElement($services));
                $service4->setServiceTypeAttribute($this->faker->randomElement($services));

                $patient->patientServices()->saveMany([$service3, $service4]);
            }
        });
    }
}
