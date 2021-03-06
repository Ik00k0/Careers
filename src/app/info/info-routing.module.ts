import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoPage } from './info.page';

const routes: Routes = [
  {
    path: '',
    component: InfoPage
  },

  {
    path: 'add-info',
    loadChildren: () => import('../add-info/add-info.module').then( m => m.AddInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPageRoutingModule {}
