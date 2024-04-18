import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinnersComponent } from './components/winners/winners.component';
import { WinnersRoutingModule } from './winners-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [WinnersComponent],
  imports: [
    CommonModule,
    WinnersRoutingModule,
    MatToolbarModule
  ],
  exports: [WinnersComponent]
})
export class WinnersModule { }
