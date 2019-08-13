import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipes.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private slService: ShoppingListService
    , private recipeService: RecipeService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => { 
      this.recipe = data['recipe'];
    })

  }

  toShoppingList() { 

    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

  }

}
