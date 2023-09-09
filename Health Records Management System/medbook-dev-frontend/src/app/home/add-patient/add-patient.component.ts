import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs';
import { PatientsService } from 'src/app/services/patients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  form!: FormGroup;
  date = new Date();

  constructor(
    private patientsService: PatientsService,
    private loadingCtrl: LoadingController,
    private router: Router,
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
        this.router.navigate(['/patients'])
        loading.dismiss();
      });
  }
}

