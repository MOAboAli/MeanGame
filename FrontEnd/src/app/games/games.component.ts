import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GamesService } from './_services/Games.service';
import { Game } from './_classes/game.model';
import { delay, Observable, of, switchMap, tap } from 'rxjs';
import { StartRatingComponent } from "../_utility_components/start-rating/start-rating.component";




@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink, StartRatingComponent],
  templateUrl: './games.component.html'
})
export class GamesComponent implements OnInit {

  constructor(private gamesService: GamesService) { }
  loading$: Observable<boolean> | undefined;

  gamelist: Observable<Game[]> | undefined;

  ngOnInit(): void {

    this.loading$ = of(true);
    this.gamelist = of(null).pipe(
      delay(500),
      switchMap(() => this.gamesService.getGames()),
      tap(() => this.loading$ = of(false))
    );
  }
}
