import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AirportDetailComponent } from "./airport-detail/airport-detail.component";

const routes: Routes = [
    {
      path: '',
      component: AirportDetailComponent
    }
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class AirportDetailRoutingModule {}