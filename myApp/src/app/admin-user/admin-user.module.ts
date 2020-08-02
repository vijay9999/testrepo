import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUserPageRoutingModule } from './admin-user-routing.module';

import { AdminUserPage } from './admin-user.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUserPageRoutingModule,
    TranslateModule
  ],
  declarations: [AdminUserPage]
})
export class AdminUserPageModule {}
