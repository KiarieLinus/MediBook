import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { PatientsService } from 'src/app/services/patients.service';
import { Router } from '@angular/router';
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
    private router: Router,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.initAddPatientForm();

    if (this.patient) {
      this.isEditMode = true;
      this.setFormValues();
    }
  }

  initAddPatientForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      genderId: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      servicesId: new FormControl(null, [Validators.required]),
      generalComments: new FormControl(null),
    })
  }

  setFormValues() {
    this.form.setValue({
      name: this.patient.name,
      genderId: this.patient.gender === "Male" ? "1" : "2",
      dateOfBirth: this.patient.date_of_birth,
      servicesId: this.patient.services[this.patient.services.length - 1] === "Outpatient" ? "1" : "2",
      generalComments: this.patient.general_comments,
    })

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
      let newService = (this.form.value["servicesId"] == "1") ? "Outpatient" : "Inpatient";
      let services = this.patient.services;
      services.push(newService);
      const updatedPatient: Patient = {
        id: this.patient.id,
        name: this.form.value["name"],
        date_of_birth: this.form.value["dateOfBirth"],
        gender: this.form.value["genderId"],
        services: services,
        general_comments: this.form.value["generalComments"]
      }
      response = this.patientsService.updatePatient(this.patient.id, updatedPatient);
    } else {
      response = this.patientsService
        .addPatient(this.form.value);
    }


    response.pipe(take(1))
      .subscribe((patient) => {
        this.form.reset();
        // this.router.navigate(['/patients'])
        loading.dismiss();

        if (this.isEditMode) {
          this.closeModal(patient);
        } else {
          this.modalCtrl.dismiss(patient);
        }
      });
  }
}

