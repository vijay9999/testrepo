import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharityPageRoutingModule } from './charity-routing.module';

import { CharityPage } from './charity.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    CharityPageRoutingModule,
  ],
  declarations: [CharityPage]
})
export class CharityPageModule {}
