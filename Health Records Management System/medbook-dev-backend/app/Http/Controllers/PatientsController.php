<?php

namespace App\Http\Controllers;

use App\Http\Resources\PatientResource;
use App\Http\Resources\PatientCollection;
use App\Models\Patient;
use Illuminate\Http\Request;
use App\Models\PatientService;
use App\Models\PatientGender;

class PatientsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new PatientCollection(Patient::all());
    }

    public function show(Patient $patient)
    {
        return new PatientResource($patient);
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
        $this->validatePatient($request);

        //save new Patient to DB
        $patient = Patient::create($this->updateOrCreatePatient($request));

        return new PatientResource($this->getPatientWithService($patient, $request));
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
        $this->validatePatient($request);

        //Update
        $patient->update($this->updateOrCreatePatient($request));

        return new PatientResource($this->getPatientWithService($patient, $request));
    }

    private function validatePatient(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'dateOfBirth' => 'required|date',
            'gender' => 'required|string',
            'services' => 'required|string',
            'generalComments' => 'nullable',
        ]);
    }

    private function updateOrCreatePatient(Request $request)
    {
        return [
            'name' => $request->name,
            'date_of_birth' => $request->dateOfBirth,
            'patient_gender_id' => PatientGender::firstWhere('name', $request->gender)->id,
            'general_comments' => $request->generalComments,
        ];
    }

    private function getPatientWithService(Patient $patient, Request $request)
    {
        $service = PatientService::where('name', $request->services)->first();
        $patient->patientServices()->attach($service);
        return $patient;
    }
}
