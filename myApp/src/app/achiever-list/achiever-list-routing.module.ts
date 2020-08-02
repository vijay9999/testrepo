import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AchieverListPage } from './achiever-list.page';

const routes: Routes = [
  {
    path: '',
    component: AchieverListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AchieverListPageRoutingModule {}
