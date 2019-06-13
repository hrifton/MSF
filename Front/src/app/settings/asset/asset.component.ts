import { Component, OnInit, ChangeDetectorRef, ViewChild, SimpleChanges } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { FormBuilder, Validators } from '@angular/forms';
import { AssetService } from 'src/app/Service/asset.service';
import { EditService, ToolbarService, SelectionService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { SelectedDataIndexDirective } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  public data: Object[];
  public selectOptions: Object;
  public editSettings: Object;
  public toolbar: string[];
  @ViewChild('grid') public grid: GridComponent;
  constructor(private papa: Papa, private fb: FormBuilder, private as: AssetService) {
    this.data=[]
  }

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  public onChange(args: any): void {
    const reader = new FileReader();
    if (args.target.files && args.target.files.length) {
      const file = args.target.files[0];

      const options = {
        complete: (results) => {

          console.log(results.data);
          this.data = results.data;
          results.data.forEach(element => {
            console.log(element)
          });
          if(this.data[0]){
           // this.grid.refresh();
           console.log("ok datas")
          }
        }

      };
      // this.grid.refresh()
      this.papa.parse(file, options);
      console.log(this.data);
    }

  }
  

  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes);
   }

  ngOnInit() {

    this.selectOptions = { persistSelection: true };
    this.editSettings = { allowDeleting: true };
    this.toolbar = ['Delete'];
  }




}

