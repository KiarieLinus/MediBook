import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';


@Injectable({
    providedIn: 'root'
})
export class PatientsService {
    apiUrl = "http://localhost:8000/api";

    constructor(private http: HttpClient) { }

    getPatients(): Observable<Patient[]> {
        return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
    }

    addPatient(patient: Patient): Observable<Patient> {
        return this.http.post<Patient>(`${this.apiUrl}/patients`, patient);
    }

    updatePatient(patientId: number, patient: Patient): Observable<Patient> {
        return this.http.put<Patient>(`${this.apiUrl}/patients/${patientId}`, patient);
    }
}