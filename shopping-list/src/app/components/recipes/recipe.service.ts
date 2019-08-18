import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from './recipes.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  recipeSelected = new Subject<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Tasy Schnitzel',
      'A super-tasty Schnitzel - just awesome',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2)
        , new Ingredient('Meat', 10)])

  ];

  constructor(private slService: ShoppingListService) { }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) { 
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){ 

    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());

  }

  deleteRecipe(index: number) { 
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}