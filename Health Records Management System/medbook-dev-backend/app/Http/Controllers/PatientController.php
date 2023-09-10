<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;
use App\Models\Gender;
use App\Models\Service;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $patients = Patient::with('gender', 'services')->get();

        $patientData = $patients->map(function ($patient) {
            return [
                'id' => $patient->id,
                'name' => $patient->name,
                'date_of_birth' => $patient->date_of_birth,
                'gender' => $patient->gender ? $patient->gender->gender : null,
                'services' => $patient->services->pluck('service'),
                'general_comments' => $patient->general_comments
            ];
        });

        return response()->json($patientData);
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
        $data = $request->validate([
            'name' => 'required',
            'dateOfBirth' => 'required|date',
            'genderId' => 'required',
            'servicesId' => 'required',
            'generalComments' => 'nullable',
        ]);

        //save new Patient to DB
        $patient = Patient::create([
            'name' => $data['name'],
            'date_of_birth' => $data['dateOfBirth'],
            'gender_id' => $data['genderId'],
            'general_comments' => $data['generalComments'],
        ]);

        $patient->services()->attach($data['servicesId']);

        $patient->load('gender', 'services');

        //return resp
        $response = [
            'id' => $patient->id,
            'name' => $patient->name,
            'date_of_birth' => $patient->date_of_birth,
            'gender' => $patient->gender ? $patient->gender->gender : null,
            'services' => $patient->services->pluck('service'),
            'general_comments' => $patient->general_comments
        ];

        return response()->json($response);
    }


    /**
     * Update existing resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  $id is resource id in storage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Patient $patient)
    {
        //validate the data
        $request->validate([
            'name' => 'required',
            'dateOfBirth' => 'required|date',
            'genderId' => 'required',
            'services' => 'array|exists:services,service',
            'generalComments' => 'nullable',
        ]);

        //Update
        $patient->update([
            'name' => $request->name,
            'date_of_birth' => $request->dateOfBirth,
            'gender_id' => $request->genderId,
            'general_comments' => $request->generalComments,
        ]);

        $gender = Gender::find($patient['gender_id']);
        $patient->gender()->associate($gender);
        $patient->save();

        $serviceIds = Service::whereIn('service', $request['services'])->pluck('id');
        $patient->services()->sync($serviceIds);

        //load rels
        $patient->load('gender', 'services');

        //return resp
        $response = [
            'id' => $patient->id,
            'name' => $patient->name,
            'date_of_birth' => $patient->date_of_birth,
            'gender' => $patient->gender ? $patient->gender->gender : null,
            'services' => $patient->services->pluck('service'),
            'general_comments' => $patient->general_comments
        ];

        return response()->json($response);
    }
}
