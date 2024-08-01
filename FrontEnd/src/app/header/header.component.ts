import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  // styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = "New Application  ";

  constructor(private _router: Router) {

  }

  homebutton() {
    console.log("home");
    this._router.navigate(["home"]);

  }

  gamebutton() {
    console.log("game");
    this._router.navigate(["games"]);
  }
}
