import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

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
