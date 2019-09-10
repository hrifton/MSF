import { Component, OnInit, ViewChild } from '@angular/core';
import { Hospital } from 'src/app/Class/Hospital';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {
  constructor() {}

  data: Hospital;

  ngOnInit() {}

  update($event) {
  this.data = $event;
  }
}
