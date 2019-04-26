import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, AbstractControl, FormBuilder } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Maintenance } from 'src/app/Class/Maintenance';
import {ChangeEventArgs, FilterType} from '@syncfusion/ej2-angular-dropdowns';
import { MaintenanceService } from 'src/app/Service/maintenance.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {
  maintenances: Maintenance[];

  constructor(private fb: FormBuilder, private ms: MaintenanceService) {
    this.createForm();
  }

  maintenanceForm:FormGroup;


  hasUnitNumber = false;

createForm(){
  this.maintenanceForm = this.fb.group({
    maintenance: new FormControl('', [Validators.required ]),
    executor: new FormControl('', [Validators.required ]),
    periodicity: new FormControl('', [Validators.required ]),
    duration: new FormControl('', [Validators.required ]),
    recurrence:new FormControl('', [Validators.required ]),
    description:new FormControl('', [Validators.required ]),
  });
}
  ngOnInit(){

    this.ms.getMaintenance().subscribe((data: Maintenance[]) => {
      this.maintenances = data;
    });
  }
  onSelection(e){
    console.log(e.value);
    this.maintenanceForm = this.fb.group({
      maintenance: new FormControl(e.value.task, [Validators.required ]),
      executor: new FormControl(e.value.executor, [Validators.required ]),
      periodicity: new FormControl(e.value.periodicity, [Validators.required ]),
      duration: new FormControl(e.value.duration, [Validators.required ]),
      recurrence:new FormControl(e.value.recurrence, [Validators.required ]),
      description:new FormControl(e.value.description, [Validators.required ]),
    });

   }

}
