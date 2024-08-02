import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GamesService } from './_services/Games.service';
import { Game } from './_classes/game.model';
import { delay, Observable, of, switchMap, tap } from 'rxjs';




@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './games.component.html'
})
export class GamesComponent implements OnInit {

  constructor(private gamesService: GamesService) { }
  loading$: Observable<boolean> | undefined;

  gamelist: Observable<Game[]> | undefined;

  ngOnInit(): void {

    this.loading$ = of(true);
    this.gamelist = of(null).pipe(

      delay(2000),  // Simulate a delay
      switchMap(() => this.gamesService.getGames()),
      tap(() => this.loading$ = of(false))  // Set loading to false once data is fetched
    );


    // setTimeout(() => {
    //   this.gamesService.getGames().subscribe(games => {
    //     this.gamelist = games;
    //   });
    // }, 8000);




  }
}
