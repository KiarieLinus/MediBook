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
            $table->foreignIdFor(Patient::class)
                ->constrained()
                ->onDelete('cascade');
            $table->foreignIdFor(PatientService::class)
                ->constrained()
                ->onDelete('cascade');
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
