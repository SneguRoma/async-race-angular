import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinnersComponent } from './components/winners/winners.component';
import { WinnersRoutingModule } from './winners-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WinnerService } from '../services/winner-service.service';
import { HttpClientModule } from '@angular/common/http';
import { WinnersHeaderComponent } from './components/winners-header/winners-header.component';
import { WinnersTableHeaderComponent } from './components/winners-table-header/winners-table-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GarageModule } from '../garage/garage.module';
import { WinnersTableRowComponent } from './components/winners-table-row/winners-table-row.component';
import { CarService } from '../services/car-service.service';
import { WinnersSorterService } from '../services/winners-sorter.service';

@NgModule({
  declarations: [
    WinnersComponent,
    WinnersHeaderComponent,
    WinnersTableHeaderComponent,
    WinnersTableRowComponent
  ],
  imports: [
    CommonModule,
    WinnersRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    GarageModule,
  ],
  exports: [WinnersComponent],
  providers: [WinnerService, CarService,WinnersSorterService],
})
export class WinnersModule {}
