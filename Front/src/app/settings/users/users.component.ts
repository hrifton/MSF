import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { User } from 'src/app/Class/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() projet;
  status = ['User', 'Tech', 'Admin'];

  data: any[];
  userForm: FormGroup;
  constructor(private fb: FormBuilder) {this.createForm();}

  ngOnInit() {
    this.data = this.projet;
    
  }
  /**
   * creation formulaire
   */
  createForm() {
    this.userForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      projet: new FormControl('', [Validators.required]),
      statut: new FormControl('', [Validators.required]),
      structure: new FormControl(''),
      level: new FormControl(''),
      country: new FormControl('')
    });
  }
  /**
   * detection changement
   */
  onChange(changes: SimpleChanges): void {
    if (changes.itemData !== undefined) {
      this.onSelection(changes.itemData);
    }
  }
  /**
   * complete formulaire lors du changement de selection de projet
   */
  onSelection(data) {
    this.userForm = this.fb.group({
      projet: new FormControl(data.project, [Validators.required]),
      structure: new FormControl(data.ipdStructure),
      level: new FormControl(data.leveOfCare),
      country: new FormControl(data.country)
    });
  }

  saveUser(data) {
    console.log(data);
  }
}
