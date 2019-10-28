import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListeUsersComponent } from './liste-users/liste-users.component';

@NgModule({
  declarations: [UsersComponent, ListeUsersComponent],
  imports: [CommonModule, UsersRoutingModule],
  exports: [UsersComponent]
})
export class UsersModule {}
