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

    addPatient(patient: AddPatient): Observable<Patient> {
        return this.http.post<Patient>(`${this.apiUrl}/patients`, patient);
    }

    updatePatient(patientId: number, patient: Patient): Observable<Patient> {
        let genderId = (patient.gender == "Male") ? 1 : 2;
        const requestData = {
            name: patient.name,
            dateOfBirth: patient.date_of_birth,
            genderId: genderId,
            services: patient.services,
            generalComments: patient.general_comments,
        }
        return this.http.put<Patient>(`${this.apiUrl}/patients/${patientId}`, requestData)
    }
}