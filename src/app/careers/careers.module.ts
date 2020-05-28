import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HTTP} from '@ionic-native/http/ngx';
import { IonicModule } from '@ionic/angular';

import { CareersPageRoutingModule } from './careers-routing.module';

import { CareersPage } from './careers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareersPageRoutingModule
  ],
  providers:[HTTP],
  declarations: [CareersPage]
})
export class CareersPageModule {}
