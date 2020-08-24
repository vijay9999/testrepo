import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsPopOverPage } from './sms-popover.page';

const routes: Routes = [
  {
    path: '',
    component: SmsPopOverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsPopOverPageRoutingModule {}
