import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatrimonyPage } from './matrimony.page';

const routes: Routes = [
  {
    path: '',
    component: MatrimonyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatrimonyPageRoutingModule {}
