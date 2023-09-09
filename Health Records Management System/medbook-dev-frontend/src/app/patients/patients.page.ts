import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import { LoadingController } from '@ionic/angular';
import { Observable, tap } from 'rxjs';
import { Patient } from './patient.model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  patients$!: Observable<Patient[]>;
  hasComments$: Boolean = false;

  constructor(
    private patientsService: PatientsService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    loading.present();

    this.patients$ = this.patientsService.getPatients().pipe(
      tap(patients => {
        loading.dismiss();
        return patients;
      })
    )
  }

}
