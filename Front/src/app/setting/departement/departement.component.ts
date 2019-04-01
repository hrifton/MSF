import {DepartementService} from './departement.service';
import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import Departement from './Departement';
import { ListeDepartementComponent } from './liste-departement/liste-departement.component';
@Component(
    {selector: 'app-departement', templateUrl: './departement.component.html', styleUrls: ['./departement.component.scss']}
)


export class DepartementComponent implements OnInit {
    public departements: Departement[];

    constructor(private ds: DepartementService , private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this
            .ds
            .getDepartements()
            .subscribe((data: Departement[]) => {
                this.departements = data;
            });
    }
    public addToArrayDep(departement: Departement): void {
      this.departements.unshift(departement);
      this.cd.detectChanges();
      this.cd.markForCheck();
  }
}
