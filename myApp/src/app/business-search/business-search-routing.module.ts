import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessSearchPage } from './business-search.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessSearchPageRoutingModule {}
