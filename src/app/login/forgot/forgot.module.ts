import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgotPageRoutingModule } from './forgot-routing.module';
import { ForgotPage } from './forgot.page';

import {ReactiveFormsModule} from '@angular/forms'
import { AppLauncher } from '@ionic-native/app-launcher/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPageRoutingModule,
    ReactiveFormsModule,
    
  ],

  providers: [
    AppLauncher
  ],
  
  declarations: [ForgotPage]
})
export class ForgotPageModule {}
