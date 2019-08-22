import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router, Params } from '@angular/router';
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

  constructor(private recipeService: RecipeService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }

  toShoppingList() { 

    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

  }

  onDeleteRecipe() { 
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
