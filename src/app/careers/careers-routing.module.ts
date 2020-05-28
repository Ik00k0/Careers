import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareersPage } from './careers.page';

const routes: Routes = [
  {
    path: '',
    component: CareersPage
  },
  {
    path: 'careers-spec/:id/:name',
    loadChildren: () => import('./careers-spec/careers-spec.module').then( m => m.CareersSpecPageModule)
  },
  {
    path: 'careers-spec',
    loadChildren: () => import('./careers-spec/careers-spec.module').then( m => m.CareersSpecPageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then( m => m.CoursesPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareersPageRoutingModule {}
