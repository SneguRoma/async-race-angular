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
import { CarService } from '../services/car-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UpdateCarService } from '../services/update-car.service';
import { WinnerPopupComponent } from './components/winner-popup/winner-popup.component';
import { WinnerService } from '../services/winner-service.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { FinishComponent } from './components/finish/finish.component';


@NgModule({
  declarations: [
    GarageComponent,
    GarageHeaderComponent,
    CarItemComponent,
    CarBoxComponent,
    WinnerPopupComponent,
    FinishComponent,
  ],
  imports: [
    CommonModule,
    GarageRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    PaginationComponent
  ],
  exports: [GarageComponent, GarageHeaderComponent, CarItemComponent],
  providers:[CarService, UpdateCarService, WinnerService]
})
export class GarageModule {}
