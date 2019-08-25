import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router, Params } from '@angular/router';
import { Recipe } from '../recipes.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.route.params.pipe(
        map(params => {
      return +params['id'];
    }), switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
    }), map(recipesState => {
      return recipesState.recipes.find((recipe, index) => {
        return index === this.id;
      });
    })).subscribe(recipe => this.recipe = recipe);
  }

  toShoppingList() {


    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));

    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    // this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
