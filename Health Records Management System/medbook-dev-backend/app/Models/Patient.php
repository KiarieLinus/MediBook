<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'date_of_birth', 'gender_id','general_comments'];

    public function gender(){
        return $this->belongsTo(Gender::class);
    }

    public function services(){
        return $this->belongsToMany(Service::class, 'tbl_patient_services');
    }
}
