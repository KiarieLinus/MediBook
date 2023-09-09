import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddPatient } from '../models/add-patient.model';
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

    addPatient(patient: AddPatient): Observable<AddPatient> {
        return this.http.post<AddPatient>(`${this.apiUrl}/patients`, patient)
    }
}