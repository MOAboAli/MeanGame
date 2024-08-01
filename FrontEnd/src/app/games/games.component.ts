import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


class Game {

}

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './games.component.html',
  // styleUrl: './games.component.css'
})
export class GamesComponent {
  games = [{ title: "title1" }, { title: "title2" }, { title: "title3" }]
}
