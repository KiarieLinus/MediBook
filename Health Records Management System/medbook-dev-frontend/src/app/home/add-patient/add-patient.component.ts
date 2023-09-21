import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable, take, tap } from 'rxjs';
import { PatientsService } from 'src/app/services/patients.service';
import { Patient } from 'src/app/models/patient.model';
import { GenderService as GenderOrService } from 'src/app/models/gender-service.model';

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
  genders!: GenderOrService[];
  services!: GenderOrService[];

  constructor(
    private patientsService: PatientsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    this.initAddPatientForm();

    this.patientsService.getGenders()
      .pipe(take(1)).subscribe(genders => {
        this.genders = genders;
      });

    this.patientsService.getServices()
      .pipe(take(1)).subscribe(services => {
        this.services = services;
      });

    if (this.patient) {
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
      gender: this.patient.gender,
      date_of_birth: this.patient.date_of_birth,
      services: this.patient.services[0],
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

