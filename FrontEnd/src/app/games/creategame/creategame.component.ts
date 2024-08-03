import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Game } from '../_classes/game.model';
import { CommonModule } from '@angular/common';
import { GamesService } from '../_services/Games.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creategame',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './creategame.component.html'
})
export class CreategameComponent {
  gameForm: FormGroup;


  constructor(private fb: FormBuilder, private gamesService: GamesService, private router: Router) {
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

  ngOnInit(): void { }

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

      this.gamesService.CreateGames(game).subscribe(resp => {

        console.log(resp);
        if (!resp.hasOwnProperty('error')) {
          this.router.navigate(['/games']);
        }
      });

    }
  }
}
