<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('patients', 'App\\Http\\Controllers\\PatientsController@index');
Route::post('patients', 'App\\Http\\Controllers\\PatientsController@store');
Route::put('patients/{patient}', 'App\\Http\\Controllers\\PatientsController@update');

Route::get('genders', 'App\\Http\\Controllers\\GendersController@index');
Route::get('services', 'App\\Http\\Controllers\\ServicesController@index');
