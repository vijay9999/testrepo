import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectoryListPageRoutingModule } from './directory-list-routing.module';

import { DirectoryListPage } from './directory-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectoryListPageRoutingModule
  ],
  declarations: [DirectoryListPage]
})
export class DirectoryListPageModule {}
