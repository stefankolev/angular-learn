import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from './recipes.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

export class RecipeService {

  recipeSelected = new Subject<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(+1, 'Tasy Schnitzel',
      'A super-tasty Schnitzel - just awesome',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)]),
    new Recipe(+2, 'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2)
        , new Ingredient('Meat', 10)])

  ];

  constructor(private slService: ShoppingListService) { }

  getRecipeById(id: number) {
    return this.recipes.find(r => r.id === +id);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}