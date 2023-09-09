import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { Observable, tap } from 'rxjs';
import { PatientsService } from 'src/app/services/patients.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
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
