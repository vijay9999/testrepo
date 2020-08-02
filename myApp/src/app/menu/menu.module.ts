import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { AdminUserPageRoutingModule } from '../admin-user/admin-user-routing.module';
import { UserDetailsPageRoutingModule } from '../user-details/user-details-routing.module';
import { AdminUserPageModule } from '../admin-user/admin-user.module';
import { UserDetailsPageModule } from '../user-details/user-details.module';
import { RegistrationPageModule } from '../registration/registration.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    AdminUserPageRoutingModule,
    UserDetailsPageRoutingModule,
    AdminUserPageModule,
    UserDetailsPageModule,
    RegistrationPageModule,
    TranslateModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
