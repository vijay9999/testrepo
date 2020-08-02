import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamousPersonalityPage } from './famous-personality.page';

const routes: Routes = [
  {
    path: '',
    component: FamousPersonalityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamousPersonalityPageRoutingModule {}
