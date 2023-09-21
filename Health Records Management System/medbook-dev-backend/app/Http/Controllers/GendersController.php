<?php

namespace App\Http\Controllers;

use App\Models\PatientGender;
use Illuminate\Http\Request;

class GendersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $genders = PatientGender::all();
        return response()->json($genders);
    }
}
