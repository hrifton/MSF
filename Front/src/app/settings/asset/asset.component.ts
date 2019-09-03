import { Component, OnInit, ChangeDetectorRef, ViewChild, SimpleChanges } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { FormBuilder, Validators } from '@angular/forms';
import { AssetService } from 'src/app/Service/asset.service';
import { EditService, ToolbarService, SelectionService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { SelectedDataIndexDirective } from '@syncfusion/ej2-angular-charts';
import { Assets } from 'src/app/Class/Assets';


@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {


  public data: Object[];
  public assets: any = [];
  public selectOptions: Object;
  public editSettings: Object;
  public toolbar: string[];
  @ViewChild('grid') public grid: GridComponent;
  constructor(private papa: Papa, private fb: FormBuilder, private as: AssetService) {
    this.data = []
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


          this.data = results.data;
          results.data.forEach(element => {
            let asset = new Assets();
            asset.codeBarre = (element[1]) ? element[1] : "UNKNOWN";
            asset.serial_number = (element[6]) ? element[6] : "UNKNOWN";
            asset.domaine = (element[4]) ? element[4] : "UNKNOWN";
            asset.buphagus = (element[5]) ? element[5] : "UNKNOWN";
            asset.brand = (element[7]) ? element[7] : "UNKNOWN";
            asset.model = (element[3]) ? element[3] : "UNKNOWN";
            this.assets.push(asset)
          });
          this.assets.shift()
          console.log("ici")
          if (this.assets) {
            // this.grid.refresh();
            console.log(this.assets)
          }
        }

      };
      // this.grid.refresh()
      this.papa.parse(file, options);
      
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

