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
        return $this->hasOne(PatientGender::class);
    }

    public function patientServices()
    {
        return $this->belongsToMany(PatientService::class, 'patient_patient_services')
            ->withTimestamps()
            ->orderByPivot('created_at', 'desc');
    }
}
