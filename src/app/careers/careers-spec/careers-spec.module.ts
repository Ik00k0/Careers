import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CareersSpecPageRoutingModule } from './careers-spec-routing.module';

import { CareersSpecPage } from './careers-spec.page';
import {HTTP} from '@ionic-native/http/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareersSpecPageRoutingModule
  ],
  providers: [HTTP],
  declarations: [CareersSpecPage]
})
export class CareersSpecPageModule {}
