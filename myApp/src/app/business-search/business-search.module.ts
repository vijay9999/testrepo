import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessSearchPageRoutingModule } from './business-search-routing.module';

import { BusinessSearchPage } from './business-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessSearchPageRoutingModule
  ],
  declarations: [BusinessSearchPage]
})
export class BusinessSearchPageModule {}
