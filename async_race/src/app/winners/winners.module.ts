import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinnersComponent } from './components/winners/winners.component';
import { WinnersRoutingModule } from './winners-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WinnerService } from '../services/winner-service.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [WinnersComponent],
  imports: [
    CommonModule,
    WinnersRoutingModule,
    MatToolbarModule,
    HttpClientModule
  ],
  exports: [WinnersComponent],
  providers:[WinnerService]
})
export class WinnersModule { }
