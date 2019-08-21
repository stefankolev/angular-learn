import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../components/recipes/recipe.service';
import { Recipe } from '../components/recipes/recipes.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {

        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-shopping-list-41ca5.firebaseio.com/recipes.json',
            recipes).subscribe(response => { console.log(response) });

    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-shopping-list-41ca5.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }

}