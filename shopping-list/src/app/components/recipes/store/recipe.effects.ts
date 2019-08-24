import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { Recipe } from '../recipes.model';
import * as RecipesActions from './recipe.actions';

export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES)
        , switchMap(() => {
                return this.http.get<Recipe[]>('https://ng-shopping-list-41ca5.firebaseio.com/recipes.json');
        })
        , map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                });
            })
    );




    constructor(private actions$: Actions,
        private http: HttpClient) { }
}