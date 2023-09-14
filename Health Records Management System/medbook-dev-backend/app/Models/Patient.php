<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'date_of_birth', 'general_comments', 'patient_gender_id',
    ];

    public function patientGender()
    {
        return $this->belongsTo(PatientGender::class);
    }

    public function patientServices()
    {
        return $this->hasMany(PatientService::class);
    }
}
