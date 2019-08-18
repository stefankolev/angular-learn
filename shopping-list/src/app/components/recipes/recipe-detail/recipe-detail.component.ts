import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
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
  id: number;

  constructor(private slService: ShoppingListService
    , private recipeService: RecipeService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => { 
      this.recipe = data['recipe'];
      this.id= +data['id'];
    })

  }

  toShoppingList() { 

    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

  }

  onDeleteRecipe() { 
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
