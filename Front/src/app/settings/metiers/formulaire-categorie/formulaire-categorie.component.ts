import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { Metier } from "src/app/Class/Metier";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Categorie } from "src/app/Class/Categorie";

@Component({
  selector: "app-formulaire-categorie",
  templateUrl: "./formulaire-categorie.component.html",
  styleUrls: ["./formulaire-categorie.component.scss"]
})
export class FormulaireCategorieComponent implements OnInit {
  public categorieForm: FormGroup;

  @Input() metierSelect: Metier;
  @Output() messageEvent = new EventEmitter<Categorie>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  createFormMetier(data) {
    this.categorieForm = this.fb.group({
      categorie: new FormControl("", [Validators.required]),
      idMetier: new FormControl(data._id, [Validators.required]),
      color: new FormControl("", [Validators.required])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createFormMetier(changes.metierSelect.currentValue);
  }

  saveCat(data) {
    console.log(data)
    this.messageEvent.emit(data.value);
  }
}
