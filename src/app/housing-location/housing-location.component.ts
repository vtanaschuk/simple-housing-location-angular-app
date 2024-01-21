import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housing-location';
import { RouterModule } from '@angular/router';

@Component({  
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template:`
    <section class="listing">
      <img class="listing-photo" [src]="housingLocation.photo" alt="photo of {{housingLocation.name}}">
      <h2 class="listing-heading">{{housingLocation.name}}</h2>
      <p class="listing-location">{{housingLocation.city}}, {{housingLocation.state}}</p>
      <a [routerLink]="['/details', housingLocation.id]">Read more</a>
    </section>
  `,
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
  constructor() {
    console.log(this.housingLocation); // Move the console.log to the constructor or another appropriate method
  }
}
