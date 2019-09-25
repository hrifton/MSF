
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import Metier  from '../Metier';
import { MetierService } from 'src/app/Service/metier.service';

@Component({
  selector: 'app-setting-metier',
  templateUrl: './setting-metier.component.html',
  styleUrls: ['./setting-metier.component.css']
})
export class SettingMetierComponent implements OnInit {
  @Input()metiers: Metier[];
  @Output() metiersOut = new EventEmitter<Metier>();
  angForm: FormGroup;
  public metier: string;

  constructor( private fb: FormBuilder, private ms: MetierService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
            metier: ['', Validators.required]
        });
}



  ngOnInit() {
  }

  addNewMetier(metier) {

 let cptFalse = 0;
 this
        .metiers
        .forEach(element => {
            if (element.metier != metier) {
                cptFalse++;
            }
        });
 if (cptFalse == this.metiers.length) {
      alert('pas de doublon');
      this.ms.addMetier(metier).subscribe(res => {this.metiersOut.emit(res.metier); });

    } else {
        alert('doublon');
    }

  }

}
