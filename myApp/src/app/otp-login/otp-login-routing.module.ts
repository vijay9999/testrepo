import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtpLoginComponent } from './otp-login.component';

const routes: Routes = [
  {
    path: '',
    component: OtpLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpLoginRoutingModule {}
