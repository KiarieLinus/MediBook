import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsComponent implements OnInit {
  patients$!: Observable<Patient[]>;
  mostVisits$!: Observable<number>;
  modalIsOpen$ = new BehaviorSubject(false);
  modalProps$ = new BehaviorSubject<Patient | undefined>(undefined);

  constructor(private patientsService: PatientsService) {}

  ngOnInit() {
    this.patientsService.init();
    this.mostVisits$ = this.patientsService.getMostVisits();
    this.patients$ = this.patientsService.getPatients();
  }

  handleDismiss(ev: Event) {
    this.modalIsOpen$.next(false);
    this.modalProps$.next(undefined);
  }
}
