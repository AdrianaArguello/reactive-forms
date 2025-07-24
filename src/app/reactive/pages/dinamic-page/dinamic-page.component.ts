import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dinamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dinamic-page.component.html',
  styleUrl: './dinamic-page.component.css'
})
export class DinamicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ],
      Validators.minLength(2)
    ),
  });

  newFavorite = new FormControl('', Validators.required);

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onSubmit(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset();
  }

  onAddToFavorites(){
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavorite.reset();
  }

  onRemoveToFavorites(index: number){
    this.favoriteGames.removeAt(index);
  }

}
