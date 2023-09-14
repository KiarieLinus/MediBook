import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { PatientsService } from 'src/app/services/patients.service';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  @Input() patient!: Patient;
  isEditMode = false;
  form!: FormGroup;
  date = new Date();

  constructor(
    private patientsService: PatientsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.initAddPatientForm();

    if (this.patient) {
      console.log(this.patient.services);
      this.isEditMode = true;
      this.setFormValues();
    }
  }

  initAddPatientForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      date_of_birth: new FormControl(null, [Validators.required]),
      services: new FormControl(null, [Validators.required]),
      general_comments: new FormControl(null),
    });
  }

  setFormValues() {
    this.form.setValue({
      name: this.patient.name,
      gender: this.patient.gender === "Male" ? "1" : "2",
      date_of_birth: this.patient.date_of_birth,
      services: this.patient.services[this.patient.services.length - 1],
      general_comments: this.patient.general_comments,
    });

    this.form.updateValueAndValidity();
  }

  closeModal(data: null | Patient) {
    this.modalCtrl.dismiss(data);
  }

  async submitPatient() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    loading.present();

    let response;

    if (this.isEditMode) {
      response = this.patientsService.updatePatient(this.patient.id, this.form.value);
    } else {
      response = this.patientsService
        .addPatient(this.form.value);
    }
    response.pipe(take(1))
      .subscribe((patient) => {
        this.form.reset();
        loading.dismiss();

        if (this.isEditMode) {
          this.closeModal(patient);
        } else {
          this.modalCtrl.dismiss(true);
        }
      });
  }

}

