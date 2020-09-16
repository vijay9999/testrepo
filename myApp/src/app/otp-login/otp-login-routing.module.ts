import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtpLoginComponent } from './otp-login.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: OtpLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),TranslateModule],
  exports: [RouterModule],
})
export class OtpLoginRoutingModule {}
