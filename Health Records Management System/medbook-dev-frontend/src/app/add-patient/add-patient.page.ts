import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from '../services/patients.service';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {
  form!: FormGroup;

  constructor(
    private patientsService: PatientsService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      genderId: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      servicesId: new FormControl(null, [Validators.required]),
      generalComments: new FormControl(null),
    })
  }

  async submitPatient() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    loading.present();
    this.patientsService
      .addPatient(this.form.value)
      .pipe(take(1))
      .subscribe((product) => {
        this.form.reset();
        loading.dismiss();
      });
  }
}
