import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareersSpecPage } from './careers-spec.page';

const routes: Routes = [
  {
    path: '',
    component: CareersSpecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareersSpecPageRoutingModule {}
