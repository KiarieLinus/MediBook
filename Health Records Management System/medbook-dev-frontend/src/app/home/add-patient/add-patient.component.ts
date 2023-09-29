import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { PatientsService } from 'src/app/services/patients.service';
import { Patient } from 'src/app/models/patient.model';
import { GenderService as GenderOrService } from 'src/app/models/gender-service.model';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPatientComponent implements OnInit {
  @Input() patient: Patient | undefined | null;
  isEditMode = false;
  isOnSubmit = false;
  form!: FormGroup;
  date = new Date();
  genders$!: Observable<GenderOrService[]>;
  services$!: Observable<GenderOrService[]>;

  //Adds dropdown menu effect
  customPopoverOptions = {
    size: 'auto',
    side: 'bottom',
    alignment: 'end',
  };

  constructor(
    private patientsService: PatientsService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.initAddPatientForm();

    this.genders$ = this.patientsService.getGenders();

    this.services$ = this.patientsService.getServices();

    if (this.patient) {
      this.isEditMode = true;
      this.setFormValues();
    }
  }

  initAddPatientForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      services: new FormControl(null, [Validators.required]),
      generalComments: new FormControl(null),
    });
  }

  setFormValues() {
    this.form.setValue({
      name: this.patient!.name,
      gender: this.patient!.gender,
      dateOfBirth: this.patient!.dateOfBirth,
      services: this.patient!.services[0],
      generalComments: this.patient!.generalComments,
    });

    this.form.updateValueAndValidity();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async submitPatient() {
    this.form.markAllAsTouched();
    this.isOnSubmit = true;
    if (this.form.valid) {
      if (this.isEditMode) {
        this.patientsService.updatePatient(this.patient!.id, this.form.value);
      } else {
        this.patientsService.addPatient(this.form.value);
      }
      this.closeModal();
    }
  }
}
