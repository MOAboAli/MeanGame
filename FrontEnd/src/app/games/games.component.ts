import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GamesService } from './_services/Games.service';
import { Game } from './_classes/game.model';




@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './games.component.html'
})
export class GamesComponent implements OnInit {

  constructor(private gamesService: GamesService) { }
  gamelist: Game[] = [];

  ngOnInit(): void {
    this.gamesService.getGames().subscribe(games => {
      this.gamelist = games;
      console.log(this.gamelist);
    });
    console.log("Here");

  }
}
