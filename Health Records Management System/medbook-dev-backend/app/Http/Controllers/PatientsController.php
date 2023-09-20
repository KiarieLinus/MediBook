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
        $this->mostVisits = $patients;
        $patientsData = $patients->map(function ($patient) {
            return [
                'id' => $patient->id,
                'name' => $patient->name,
                'date_of_birth' => $patient->date_of_birth,
                'gender' => PatientGender::find($patient->patient_gender_id)->name,
                'services' => $patient->patientServices->pluck('name'),
                'general_comments' => $patient->general_comments,
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
            'gender' => 'required|string',
            'services' => 'required|string',
            'general_comments' => 'nullable',
        ]);

        //save new Patient to DB
        $patient = Patient::create([
            'name' => $request->name,
            'date_of_birth' => $request->date_of_birth,
            'patient_gender_id' => PatientGender::where('name', $request['gender'])->first()->id,
            'general_comments' => $request->general_comments,
        ]);

        $service = PatientService::where('name', $request->services)->first();
        $patient->patientServices()->attach($service);

        $response =  [
            'id' => $patient->id,
            'name' => $patient->name,
            'date_of_birth' => $patient->date_of_birth,
            'gender' => PatientGender::find($patient->patient_gender_id)->name,
            'services' => $patient->patientServices->pluck('name'),
            'general_comments' => $patient->general_comments,
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
            'gender' => 'required|string',
            'services' => 'required|string',
            'general_comments' => 'nullable',
        ]);

        //Update
        $patient->update([
            'name' => $request->name,
            'date_of_birth' => $request->date_of_birth,
            'patient_gender_id' => PatientGender::where('name', $request['gender'])->first()->id,
            'general_comments' => $request->general_comments,
        ]);

        $service = PatientService::where('name', $request->services)->first();
        $patient->patientServices()->attach($service);

        $response =  [
            'id' => $patient->id,
            'name' => $patient->name,
            'date_of_birth' => $patient->date_of_birth,
            'gender' => PatientGender::find($patient->patient_gender_id)->name,
            'services' => $patient->patientServices->pluck('name'),
            'general_comments' => $patient->general_comments,
        ];
        return response()->json($response);
    }
}
