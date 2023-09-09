import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../patients/patient.model';
import { AddPatient } from '../add-patient/add-patient.model';

@Injectable({
    providedIn: 'root'
})
export class PatientsService {
    apiUrl = "http://localhost:8000/api";

    constructor(private http: HttpClient) { }

    getPatients(): Observable<Patient[]> {
        return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
    }

    addPatient(patient: AddPatient): Observable<AddPatient> {
        return this.http.post<AddPatient>(`${this.apiUrl}/patients`, patient)
    }
}