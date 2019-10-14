import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { User } from 'src/app/Class/user';
import { Hospital } from 'src/app/Class/Hospital';
import { MustMatch } from 'src/app/_helpers/must_match.validator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() projet;
  @Input() role;
  @Output() messageEvent = new EventEmitter<User>();
  hopital = new Hospital();
  status = ['User', 'Tech', 'Operator', 'LocalAdmin', 'SuperAdmin'];
  data: any[];
  userForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.data = this.projet;
    this.hopital = this.projet[0];
    console.log(this.hopital);
    console.log(this.projet.length);
  }

  /**
   * creation formulaire pour super admin
   */
  // TODO Vérification Confirmation Password
  createForm() {
    this.userForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      statut: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confPassword: new FormControl('', [Validators.required]),
      projet: new FormControl('')
    });
  }

  /**
   * detection changement
   */

  onChange(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.itemData !== undefined) {
      this.onSelection(changes.itemData);
    }
  }
  /**
   * complete formulaire lors du changement de selection de projet
   */
  //TODO a resoudre probleme constructor
  onSelection(data) {
    console.log(data);
    /* this.hopital = new Hospital({
       id: data._id,
       projectCode: data.projectCode,
       country: data.country,
       project: data.project,
       startingDate: data.startingDate,
       closuredate: data.closuredate,
       ipdStructure: data.ipdStructure,
       leveOfCare: data.leveOfCare
     });*/


    this.hopital = new Hospital();
    this.hopital.id = data._id,
      this.hopital.projectCode = data.projectCode,
      this.hopital.country = data.country,
      this.hopital.project = data.project,
      this.hopital.startingDate = data.startingDate,
      this.hopital.closuredate = data.closuredate,
      this.hopital.ipdStructure = data.ipdStructure,
      this.hopital.leveOfCare = data.leveOfCare;

    console.log(this.hopital);
  }

  saveUser(data) {
    data.idHopital = this.projet._id;
    this.messageEvent.emit(data);
    this.userForm.reset();
  }
}
