import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../Service/asset.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {
  [x: string]: {};

  asset: any;
 intervention:any=[]
 solution:any=[]
  constructor(private route: ActivatedRoute, private as: AssetService) {}

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('asset')) {
      console.log(this.route.snapshot.queryParamMap.get('asset'))
      this.as.findInterSolByAsset(this.route.snapshot.queryParamMap.get('asset')).subscribe(x=>{
        
        this.asset=x;
      });
      console.log(this.asset)
     }
  }

}
