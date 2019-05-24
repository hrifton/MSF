import { Component, ViewChild, OnInit } from '@angular/core';
import { EmitType } from '@syncfusion/ej2-base';
import { UploaderComponent, RemovingEventArgs } from '@syncfusion/ej2-angular-inputs';

import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { AssetService } from 'src/app/Service/asset.service';



@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  constructor(private as:AssetService) { }



  @ViewChild('fileupload')
  public uploadObj: UploaderComponent;
  @ViewChild('checkbox')
  public checkboxObj: CheckBoxComponent;
  @ViewChild('checkbox1')
  public checkboxObj1: CheckBoxComponent;

  public path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  };
  public allowExtensions: string = '.xls, .xlsx, .csv';
  public dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;

  ngOnInit() {
  }

  public changeHandler: EmitType<Object> = () => {
    this.uploadObj.autoUpload = this.checkboxObj.checked;

    this.uploadObj.clearAll();
  }

  public changedHandler: EmitType<Object> = () => {
    this.uploadObj.sequentialUpload = this.checkboxObj1.checked;
    this.uploadObj.clearAll();
  }

  public onFileRemove(args: RemovingEventArgs): void {
    args.postRawFile = false;
  }
  public uploadFile($event) {
    if ($event.file !== undefined) {

   this.as.sendFile($event.file)


    }

  }


}
