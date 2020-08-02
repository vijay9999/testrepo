import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersListPageRoutingModule } from './users-list-routing.module';

import { UsersListPage } from './users-list.page';
import { EditUserDetailPage } from '../edit-user/edit-user-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersListPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [UsersListPage, EditUserDetailPage]
})
export class UsersListPageModule {}
