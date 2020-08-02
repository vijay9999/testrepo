import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { OtpLoginComponent } from './otp-login.component';
import { OtpLoginRoutingModule } from './otp-login-routing.module';
import { LoginService } from '../services/login.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpLoginRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [OtpLoginComponent],
  providers: [LoginService]
})
export class OtpLoginModule { }
