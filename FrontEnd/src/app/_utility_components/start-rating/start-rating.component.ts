import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'start-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-rating.component.html',
})
export class StartRatingComponent implements OnInit, OnChanges {
  _rating: number = 0;
  stars: number[] = [];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.stars = new Array<number>(changes['rating'].currentValue);

  }

  @Input()
  set rating(rating: number) {
    if (this._rating != 0) {
      this._rating = rating;

      this.stars = new Array<number>(rating);
    }
  };

}
