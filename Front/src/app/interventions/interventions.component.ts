import { InterventionService } from './../Service/intervention.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.css']
})
export class InterventionsComponent implements OnInit{
  ngOnInit(): void {

  }
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [

          { title: 'Formulaire', cols: 2, rows: 1 },
          { title: 'Liste', cols: 1, rows: 1 , content: 'liste'},
          { title: 'Analyse', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [

        { title: 'Formulaire', cols: 2, rows: 1 },
        { title: 'Liste', cols: 2, rows: 1.5 , content: 'liste'},
        { title: 'Analyse', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,private is: InterventionService) {}

}
