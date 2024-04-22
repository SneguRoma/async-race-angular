import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car-service.service';
import { ICar } from '../../models/garage.model';

@Component({
  selector: 'app-garage',  
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss'
})
export class GarageComponent implements OnInit{
  cars: ICar[] = []; 
  constructor(private carService: CarService){
    
  }

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: (cars: ICar[]) => { 
        this.cars = cars;
       },
      error: (error: Error) => {  console.error('Error fetching cars:', error) },     
    });
    
   
  }
boxes= ['audi', 'bmw', 'opel', 'kia','ford','tank','supermario',]
}
