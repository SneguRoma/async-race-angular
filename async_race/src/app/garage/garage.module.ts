import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageComponent } from './components/garage/garage.component';
import { GarageRoutingModule } from './garage-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { GarageHeaderComponent } from './components/garage-header/garage-header.component';
import { MatInputModule } from '@angular/material/input';
import { CarItemComponent } from './components/car-item/car-item.component';
import { CarBoxComponent } from './components/car-box/car-box.component';


@NgModule({
  declarations: [
    GarageComponent,
    GarageHeaderComponent,
    CarItemComponent,
    CarBoxComponent,
  ],
  imports: [
    CommonModule,
    GarageRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    
  ],
  exports: [GarageComponent, GarageHeaderComponent],
})
export class GarageModule {}