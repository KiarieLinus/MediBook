import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { GenderService } from '../models/gender-service.model';
import { IonLoaderService } from './ion-loader.service';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  apiUrl = 'http://localhost:8000/api';

  private patients$ = new BehaviorSubject<Patient[]>([]);
  private genders$ = new BehaviorSubject<GenderService[]>([]);
  private services$ = new BehaviorSubject<GenderService[]>([]);
  private mostVisits$ = new BehaviorSubject(0);

  constructor(private http: HttpClient, private loader: IonLoaderService) {}

  public init() {
    this.loader.presentLoader();
    this.http
      .get<Patient[]>(`${this.apiUrl}/patients`)
      .subscribe((patients) => {
        let mostVisits = 0;
        this.patients$.next(patients);
        for (let patient of patients) {
          mostVisits =
            mostVisits > patient.services.length
              ? mostVisits
              : patient.services.length;
        }
        this.mostVisits$.next(mostVisits);
        this.loader.dismissLoader();
      });

    this.http
      .get<GenderService[]>(`${this.apiUrl}/genders`)
      .subscribe((genders) => {
        this.genders$.next(genders);
      });

    this.http
      .get<GenderService[]>(`${this.apiUrl}/services`)
      .subscribe((services) => {
        this.services$.next(services);
      });
  }

  getPatients(): Observable<Patient[]> {
    return this.patients$;
  }

  getMostVisits(): Observable<number> {
    return this.mostVisits$;
  }

  addPatient(patient: Patient) {
    this.loader.presentLoader();

    patient = { ...patient, dateOfBirth: patient.dateOfBirth.split('T')[0] };
    this.http
      .post<Patient>(`${this.apiUrl}/patients`, patient)
      .subscribe((patient) => {
        this.patients$.next([...this.patients$.value, patient]);
        this.loader.dismissLoader();
      });
  }

  updatePatient(patientId: number, patient: Patient) {
    this.loader.presentLoader();

    this.http
      .put<Patient>(`${this.apiUrl}/patients/${patientId}`, patient)
      .subscribe((newPatient) => {
        if (newPatient.services.length > this.mostVisits$.value) {
          this.mostVisits$.next(newPatient.services.length);
        }
        const updatedPatients = this.patients$.value.map((oldPatient) =>
          newPatient.id === oldPatient.id ? newPatient : oldPatient
        );
        this.patients$.next(updatedPatients);
        this.loader.dismissLoader();
      });
  }

  getGenders(): Observable<GenderService[]> {
    return this.genders$;
  }

  getServices(): Observable<GenderService[]> {
    return this.services$;
  }
}
