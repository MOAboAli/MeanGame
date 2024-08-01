import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { SingleGameComponent } from './games/single-game/single-game.component';

export const routes: Routes = [
    {
        path: "", redirectTo: "home", pathMatch: "full"
    },
    {
        path: "home", component: HomeComponent
    },

    {
        path: "games", component: GamesComponent
    },
    {
        path: "games/game", component: SingleGameComponent
    }
];
