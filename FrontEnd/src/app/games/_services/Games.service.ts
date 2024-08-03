import { Injectable } from '@angular/core';
import { Game } from '../_classes/game.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>("http://localhost:8484/api/games");
  }


  public getOneGames(_id: string): Observable<Game> {
    return this.http.get<Game>("http://localhost:8484/api/games/" + _id);
  }

  public CreateGames(Body: Game): Observable<Object> {
    return this.http.post("http://localhost:8484/api/games", Body);
  }

  public UpdateGames(_id: string, Body: Game): Observable<Object> {
    return this.http.patch("http://localhost:8484/api/games/" + _id, Body);
  }
}
