import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatrimonyPageRoutingModule } from './matrimony-routing.module';

import { MatrimonyPage } from './matrimony.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatrimonyPageRoutingModule
  ],
  declarations: [MatrimonyPage]
})
export class MatrimonyPageModule {}
