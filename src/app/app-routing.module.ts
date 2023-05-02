import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/search',
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./modules/airports-module/airports.module').then((m) => m.AirportsModule),
  },
  {
    path: 'airport-detail/:id',
    loadChildren: () =>
      import('./modules/airport-detail-module/airport-detail.module').then((m) => m.AirportDetailModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
