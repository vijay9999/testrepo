import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsPopOverPageRoutingModule } from './sms-popover-routing.module';

import { SmsPopOverPage } from './sms-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmsPopOverPageRoutingModule
  ],
  declarations: [SmsPopOverPage]
})
export class SmsPopOverPageModule {}
