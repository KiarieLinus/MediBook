<?php

namespace App\Http\Controllers;

use App\Models\PatientService;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $services = PatientService::all();
        return response()->json($services);
    }
}
