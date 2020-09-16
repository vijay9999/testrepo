import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AchieverListPageRoutingModule } from './achiever-list-routing.module';

import { AchieverListPage } from './achiever-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AchieverListPageRoutingModule,
    TranslateModule
  ],
  declarations: [AchieverListPage]
})
export class AchieverListPageModule {}
