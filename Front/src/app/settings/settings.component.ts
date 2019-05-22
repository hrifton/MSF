import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public headerText: Object = [{ text: "New Maintenance"},
  { text: "Assets"}, { text: "New Hospital"}];

}
