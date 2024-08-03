import { Component, Input, OnInit } from '@angular/core';
import { BackButtonComponent } from "../../_utility_components/back-button/back-button.component";
import { Game } from '../_classes/game.model';
import { GamesService } from '../_services/Games.service';
import { CommonModule } from '@angular/common';
import { LoadingSymbolComponent } from "../../_utility_components/loading-symbol/loading-symbol.component";
import { ActivatedRoute } from '@angular/router';
import { StartRatingComponent } from "../../_utility_components/start-rating/start-rating.component";

@Component({
  selector: 'app-single-game',
  standalone: true,
  imports: [BackButtonComponent, CommonModule, LoadingSymbolComponent, StartRatingComponent],
  templateUrl: './single-game.component.html'
})
export class SingleGameComponent implements OnInit {

  _id: string = "";
  Game: Game | undefined;
  loading: boolean = true;
  constructor(private gamesService: GamesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params["id"];
    if (this._id != "" && this._id != undefined) {
      try {
        this.gamesService.getOneGames(this._id).subscribe(game => {
          this.Game = game;
          this.loading = false;

        });
      }
      catch (err) {
        throw new Error("No Game was found with this ID.");
      }
    }
    else {
      throw new Error("No Game was found with this ID.");
    }
  }


  getGoogleMapsLink(): string {
    if (this.Game?.publisher?.location?.coordinates) {
      const [lng, lat] = this.Game.publisher.location.coordinates;
      return `https://maps.google.com/?q=${lat},${lng}`;
    }
    return 'https://maps.google.com';
  }

}
