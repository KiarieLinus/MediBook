<?php

namespace App\Http\Resources;

use App\Models\PatientGender;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    public static $wrap = null;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'dateOfBirth' => $this->date_of_birth,
            'gender' => PatientGender::find($this->patient_gender_id)->name,
            'services' => $this->patientServices->pluck('name'),
            'generalComments' => $this->general_comments,
        ];
    }
}
