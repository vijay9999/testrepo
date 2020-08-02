import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamousPersonalityPageRoutingModule } from './famous-personality-routing.module';

import { FamousPersonalityPage } from './famous-personality.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamousPersonalityPageRoutingModule
  ],
  declarations: [FamousPersonalityPage]
})
export class FamousPersonalityPageModule {}
