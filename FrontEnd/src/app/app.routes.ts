import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { SingleGameComponent } from './games/single-game/single-game.component';
import { ErrorPageComponent } from './_utility_components/error-page/error-page.component';
import { CreategameComponent } from './games/creategame/creategame.component';

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
        path: "games/game/:id", component: SingleGameComponent
    },
    {
        path: "games/Create", component: CreategameComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    }
];
