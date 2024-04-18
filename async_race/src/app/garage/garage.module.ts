import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageComponent } from './components/garage/garage.component';
import { GarageRoutingModule } from './garage-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [GarageComponent],
  imports: [
    CommonModule,
    GarageRoutingModule,
    MatToolbarModule
  ],
  exports: [GarageComponent]
})
export class GarageModule { }
