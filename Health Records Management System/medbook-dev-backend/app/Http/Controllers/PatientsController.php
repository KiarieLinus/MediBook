<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use App\Models\PatientService;
use App\Models\PatientGender;


class PatientsController extends Controller
{
    private $mostVisits;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $patients = Patient::all();
        $this->mostVisits = 0;
        $patientsData = $patients->map(function ($patient) {
            $currentCount = $patient->patientServices->count();
            $this->mostVisits = $this->mostVisits > $currentCount ? $this->mostVisits : $currentCount;
            return [
                'id' => $patient->id,
                'name' => $patient->name,
                'date_of_birth' => $patient->date_of_birth,
                'gender' => $patient->patientGender->gender,
                'services' => $patient->patientServices->pluck('service'),
                'general_comments' => $patient->general_comments,
                'most_visits' => $this->mostVisits
            ];
        });

        return response()->json($patientsData);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validate the data
        $request->validate([
            'name' => 'required',
            'date_of_birth' => 'required|date',
            'gender' => 'required|integer',
            'services' => 'required|string',
            'general_comments' => 'nullable',
        ]);

        //save new Patient to DB
        $patient = Patient::create([
            'name' => $request['name'],
            'date_of_birth' => $request['date_of_birth'],
            'patient_gender_id' => $request['gender'],
            'general_comments' => $request['general_comments'],
        ]);

        $service = new PatientService;
        $service->setServiceTypeAttribute($request['services']);
        $patient->patientServices()->save($service);

        $gender = PatientGender::find($request['gender']);
        $patient->patientGender()->associate($gender);
        $patient->save();

        $response = [
            'id' => $patient->id,
            'name' => $patient->name,
            'date_of_birth' => $patient->date_of_birth,
            'gender' => $patient->patientGender->gender,
            'services' => $patient->patientServices->pluck('service'),
            'general_comments' => $patient->general_comments,
            'most_visits' => $this->mostVisits
        ];
        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Patient $patient)
    {
        //validate the data
        $request->validate([
            'name' => 'required',
            'date_of_birth' => 'required|date',
            'gender' => 'required|integer',
            'services' => 'required|string',
            'general_comments' => 'nullable',
        ]);

        //Update
        $patient->update([
            'name' => $request['name'],
            'date_of_birth' => $request['date_of_birth'],
            'patient_gender_id' => $request['gender'],
            'general_comments' => $request['general_comments'],
        ]);

        $service = new PatientService;
        $service->setServiceTypeAttribute($request['services']);
        $patient->patientServices()->save($service);

        $gender = PatientGender::find($request['gender']);
        $patient->patientGender()->associate($gender);
        $patient->save();

        $currentCount = $patient->patientServices->count();
        $this->mostVisits = $this->mostVisits > $currentCount ? $this->mostVisits : $currentCount;

        $response = [
            'id' => $patient->id,
            'name' => $patient->name,
            'date_of_birth' => $patient->date_of_birth,
            'gender' => $patient->patientGender->gender,
            'services' => $patient->patientServices->pluck('service'),
            'general_comments' => $patient->general_comments,
            'most_visits' => $this->mostVisits
        ];
        return response()->json($response);
    }
}
