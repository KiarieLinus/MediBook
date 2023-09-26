<?php

use App\Models\Patient;
use App\Models\PatientService;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_patient_services', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patient_id');
            $table->foreign('patient_id')->references('id')
                ->on('patients')
                ->onDelete('restrict');
            $table->unsignedBigInteger('patient_service_id');
            $table->foreign('patient_service_id')->references('id')
                ->on('patient_services')
                ->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patient_patient_services');
    }
};
