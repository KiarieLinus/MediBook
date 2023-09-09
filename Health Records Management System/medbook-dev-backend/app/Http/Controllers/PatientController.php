<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $patients = Patient::with('gender', 'services')->get();
    
        $patientData = $patients->map(function($patient) {
            return [
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

        //return res
        return response()->json($patient);
    }
}
