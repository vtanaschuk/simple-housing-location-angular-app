import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
    <img class="listing-photo" [src]="housingLocation?.photo" alt="photo of {{housingLocation?.name}}">
      <section class="listing-decription">
        <h2 class="listing-headring">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="listing-headring">About this house</h2>
        <ul>
          <li>wifi: {{housingLocation?.wifi}}</li>
          <li>laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-features">
        <h2 class="listing-headring">Apply to live here:</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <div>
            <label for="first-name">First name</label>
            <input type="text" id="first-name" formControlName="firstName">
          </div>
          <div>
            <label for="last-name">Last name</label>
            <input type="text" id="last-name" formControlName="lastName">
            </div>
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" formControlName="email">
          </div>
          <button class="primary" type="submit">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(){
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation=>{
      console.log(housingLocation);
      this.housingLocation = housingLocation;
    })
  }
  submitApplication = () =>{
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
