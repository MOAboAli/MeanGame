import { Component } from '@angular/core';
import { GamesService } from '../_services/Games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BackButtonComponent } from '../../_utility_components/back-button/back-button.component';
import { CommonModule } from '@angular/common';
import { LoadingSymbolComponent } from '../../_utility_components/loading-symbol/loading-symbol.component';
import { Game } from '../_classes/game.model';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-updategame',
  standalone: true,
  imports: [ReactiveFormsModule, BackButtonComponent, CommonModule, LoadingSymbolComponent],
  templateUrl: './updategame.component.html'
})
export class UpdategameComponent {
  _id: string = "";
  Game: Game | undefined;
  gameForm: FormGroup;

  constructor(private fb: FormBuilder, private gamesService: GamesService, private route: ActivatedRoute, private router: Router) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      rate: [null, [Validators.min(0), Validators.max(5)]],
      price: [null, [Validators.min(0)]],
      minPlayers: [null, [Validators.min(1)]],
      maxPlayers: [null, [Validators.min(1)]],
      minAge: [null, [Validators.min(0)]],
      designers: this.fb.array([])
    });


  }

  ngOnInit(): void {
    this._id = this.route.snapshot.params["id"];
    if (this._id != "" && this._id != undefined) {
      try {
        this.gamesService.getOneGames(this._id).subscribe(game => {
          this.Game = game;
          this.gameForm.patchValue(this.Game);
        });

        // for (const data of this.Game?.designers!) {
        //   console.log(this.Game)
        //   this.addDesigner(data);
        // }
      }
      catch (err) {
        console.log(err)
        throw new Error("Error:No Game was found with this ID.");
      }
    }
    else {
      throw new Error("No Game was found with this ID.");
    }
  }

  get designers(): FormArray {
    return this.gameForm.get('designers') as FormArray;
  }
  addDesigner() {
    this.designers.push(this.fb.control(''));
  }

  removeDesigner(index: number) {
    this.designers.removeAt(index);
  }

  onSubmit() {
    const formValues = this.gameForm.value;

    if (this.gameForm.valid) {
      const game = new Game(
        formValues.title,
        formValues.year,
        formValues._id,
        formValues.rate,
        formValues.price,
        formValues.minPlayers,
        formValues.maxPlayers,
        {},
        [],
        formValues.minAge,
        formValues.designers
      );
      console.log(game);
      this.gamesService.UpdateGames(this._id, game).subscribe(resp => {
        console.log(resp);
        if (!resp.hasOwnProperty('error')) {
          this.router.navigate(['/games']);
        }
      });

    }
  }
}

