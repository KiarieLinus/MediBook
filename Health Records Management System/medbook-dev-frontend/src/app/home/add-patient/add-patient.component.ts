import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { take, Observable, tap } from 'rxjs';
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
  genders$!: Observable<GenderOrService[]>;
  services$!: Observable<GenderOrService[]>;

  customPopoverOptions = {
    size: 'auto',
    side: 'bottom',
    alignment: 'end',
  };

  constructor(
    private patientsService: PatientsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.initAddPatientForm();

    this.genders$ = this.patientsService.getGenders()
      .pipe(tap(genders => {
        return genders;
      }));

    this.services$ = this.patientsService.getServices()
      .pipe(tap(services => {
        return services;
      }));

    if (this.patient) {
      this.isEditMode = true;
      this.setFormValues();
    }
  }

  initAddPatientForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      services: new FormControl(null, [Validators.required]),
      generalComments: new FormControl(null),
    });
  }

  setFormValues() {
    this.form.setValue({
      name: this.patient.name,
      gender: this.patient.gender,
      dateOfBirth: this.patient.dateOfBirth,
      services: this.patient.services[0],
      generalComments: this.patient.generalComments,
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
          this.modalCtrl.dismiss(patient);
        }
      });
  }

}

