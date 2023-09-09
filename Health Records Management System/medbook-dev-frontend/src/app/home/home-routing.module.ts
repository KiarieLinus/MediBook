import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PatientsComponent } from './patients/patients.component';
import { AddPatientComponent } from './add-patient/add-patient.component';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: 'patients', component: PatientsComponent },
      { path: '', redirectTo: 'patients', pathMatch: 'full' },
      { path: 'add-patient', component: AddPatientComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
