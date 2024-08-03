import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'back-button',
  standalone: true,
  imports: [],
  templateUrl: './back-button.component.html'
})
export class BackButtonComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
