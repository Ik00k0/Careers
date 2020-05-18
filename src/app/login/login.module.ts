import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { HTTP } from '@ionic-native/http/ngx';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LoginPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [HTTP],
  declarations: [LoginPage]
})
export class LoginPageModule {}
