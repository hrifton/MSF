import Intervention from 'src/app/intervention/Intervention';
import { InterventionService } from './../Service/intervention.service';
import { Component, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InterventionsComponent implements OnInit {
  public interventions: Intervention[];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private is: InterventionService
  ) {
    this.is.getInterventions().subscribe((data: Intervention[]) => {
      this.interventions = data; });
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Formulaire', cols: 1, rows: 1 },
        { title: 'Analyse', cols: 1, rows: 1 },
        { title: 'Liste', cols: 2, rows: 2, content: 'liste' },
        { title: 'Card 4', cols: 2, rows: 2 }
        ];
      }

      return [
        { title: 'Formulaire', cols: 1, rows: 1 },
        { title: 'Analyse', cols: 1, rows: 1 },
        { title: 'Liste', cols: 2, rows: 2, content: 'liste' },
        { title: 'Card 4', cols: 2, rows: 2 }
      ];
    })
  );

  update($event){
    console.log(this.interventions.length)
    console.log($event)
    this.interventions.unshift($event)
    console.log(this.interventions.length)
  }



  ngOnInit(): void {

  }

}
