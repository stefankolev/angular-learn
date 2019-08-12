import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipes.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input()selectedRecipe: Recipe;

  constructor(private slService: ShoppingListService, private recipeService: RecipeService) { }

  ngOnInit() {
  }

  toShoppingList() { 

    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);

  }

}
