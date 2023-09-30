import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { Patient } from '../models/patient.model';
import { GenderService } from '../models/gender-service.model';
import { IonLoaderService } from './ion-loader.service';
import { IonToastService } from './ion-toast.service';

interface ErrorWrapper {
  status: number;
  context: string;
}

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  apiUrl = 'http://localhost:8000/api';

  private patients$ = new BehaviorSubject<Patient[]>([]);
  private genders$ = new BehaviorSubject<GenderService[]>([]);
  private services$ = new BehaviorSubject<GenderService[]>([]);
  private mostVisits$ = new BehaviorSubject(0);

  constructor(
    private http: HttpClient,
    private loader: IonLoaderService,
    private toast: IonToastService
  ) {}

  public init() {
    this.loader.presentLoader();

    this.http
      .get<Patient[]>(`${this.apiUrl}/patients`)
      .pipe(
        catchError((err) =>
          of<ErrorWrapper>({
            status: err.status as number,
            context: 'patients',
          })
        )
      )
      .subscribe((patients) => {
        if (patients instanceof Array) {
          let mostVisits = 0;
          this.patients$.next(patients);
          for (let patient of patients) {
            mostVisits =
              mostVisits > patient.services.length
                ? mostVisits
                : patient.services.length;
          }
          this.mostVisits$.next(mostVisits);
        } else {
          this.handleError(patients.status, patients.context);
        }
        this.loader.dismissLoader();
      });

    this.http
      .get<GenderService[]>(`${this.apiUrl}/genders`)
      .pipe(
        catchError((err) =>
          of<ErrorWrapper>({ status: err.status as number, context: 'genders' })
        )
      )
      .subscribe((genders) => {
        if (genders instanceof Array) {
          this.genders$.next(genders);
        } else {
          this.handleError(genders.status, genders.context);
        }
      });

    this.http
      .get<GenderService[]>(`${this.apiUrl}/services`)
      .pipe(
        catchError((err) =>
          of<ErrorWrapper>({
            status: err.status as number,
            context: 'services',
          })
        )
      )
      .subscribe((services) => {
        if (services instanceof Array) {
          this.services$.next(services);
        } else {
          this.handleError(services.status, services.context);
        }
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
      .pipe(
        catchError((err) => {
          return of<ErrorWrapper>({
            status: err.status as number,
            context: 'create',
          });
        })
      )
      .subscribe((patient) => {
        if ('id' in patient) {
          this.patients$.next([...this.patients$.value, patient]);
        } else {
          this.handleError(patient.status, patient.context);
        }
        this.loader.dismissLoader();
      });
  }

  updatePatient(patientId: number, patient: Patient) {
    this.loader.presentLoader();

    this.http
      .put<Patient>(`${this.apiUrl}/patients/${patientId}`, patient)
      .pipe(
        catchError((err) => {
          return of<ErrorWrapper>({
            status: err.status as number,
            context: 'update',
          });
        })
      )
      .subscribe((newPatient) => {
        if ('id' in newPatient) {
          if (newPatient.services.length > this.mostVisits$.value) {
            this.mostVisits$.next(newPatient.services.length);
          }
          const updatedPatients = this.patients$.value.map((oldPatient) =>
            newPatient.id === oldPatient.id ? newPatient : oldPatient
          );
          this.patients$.next(updatedPatients);
        } else {
          this.handleError(newPatient.status, newPatient.context);
        }
        this.loader.dismissLoader();
      });
  }

  getGenders(): Observable<GenderService[]> {
    return this.genders$;
  }

  getServices(): Observable<GenderService[]> {
    return this.services$;
  }

  private handleError(status: number, source: string) {
    let message =
      status === 0
        ? `The server is down try again later.`
        : status === 404
        ? `The ${source} data could not be fetched.`
        : status === 422
        ? `Invalid data entry on ${source}`
        : `Unknown error occured.`;

    this.toast.showToast(message);
  }
}
