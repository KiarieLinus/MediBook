<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientService extends Model
{
    use HasFactory;

    public function setServiceTypeAttribute($value)
    {
        $this->attributes['service'] = in_array($value, ['Inpatient', 'Outpatient']) ? $value :
            'Outpatient';
    }
}
