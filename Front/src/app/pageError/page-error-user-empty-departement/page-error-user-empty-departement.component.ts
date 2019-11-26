import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-page-error-user-empty-departement',
  templateUrl: './page-error-user-empty-departement.component.html',
  styleUrls: ['./page-error-user-empty-departement.component.css']
})
export class PageErrorUserEmptyDepartementComponent implements OnInit {
  admin: string;

  constructor(private us:UserService) { 
    
  }

  ngOnInit() {
    this.us.getAdminHospital(this.us.getIdHopital()).subscribe((data: any) => {
      console.log(data)
      this.admin = data[0];
    });
  }

}
