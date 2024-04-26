import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { Page404Component } from './youtube/pages/page404/page404.component';

const routes: Routes = [
  {
    path: 'garage',
    loadChildren: () => import('./garage/garage.module').then((m) => m.GarageModule),
  },
  {
    path: 'winners',
    loadChildren: () => import('./winners/winners.module').then((m) => m.WinnersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
