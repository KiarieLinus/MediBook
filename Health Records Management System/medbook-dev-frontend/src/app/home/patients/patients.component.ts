import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { Observable, map, tap } from 'rxjs';
import { PatientsService } from 'src/app/services/patients.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { AddPatientComponent } from '../add-patient/add-patient.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  patients$!: Observable<Patient[]>;
  mostVisits = 0;

  constructor(
    private patientsService: PatientsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
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
    this.findMostVisits();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddPatientComponent,
    });

    await modal.present();

    const { data: isNewPatient } = await modal.onDidDismiss();
    if (isNewPatient) {
      this.patients$ = this.patientsService.getPatients().pipe(
        tap(patients => {
          return patients;
        })
      )
    }
  }

  async openEditModal(patient: Patient) {
    const modal = await this.modalCtrl.create({
      component: AddPatientComponent,
      componentProps: { patient: patient }
    });

    await modal.present();

    const { data: updatedPatient } = await modal.onDidDismiss();

    if (updatedPatient) {

      this.patients$ = this.patients$.pipe(
        map(patients => {
          patients.forEach(patient => {
            if (patient.id === updatedPatient.id) {
              patient = updatedPatient;
            }
            return patient;
          });
          return patients;
        })
      )
      this.mostVisits = this.mostVisits > updatedPatient.services.length ?
        this.mostVisits : updatedPatient.services.length;
    }
  }

  private findMostVisits() {
    this.patients$.pipe().subscribe(
      patients => {
        for (let patient of patients) {
          this.mostVisits = this.mostVisits > patient.services.length ?
            this.mostVisits : patient.services.length;
        }
      }
    )
  }

}
