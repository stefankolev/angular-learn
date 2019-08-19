
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";

import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';

export class RecipeResolver implements Resolve<Recipe> {
    
    resolve(route: ActivatedRouteSnapshot
        , state: RouterStateSnapshot): Recipe | 
        Observable<Recipe> | Promise<Recipe> {
            debugger;
            return this.recipeService.getRecipeById(route.params['id']);
    } 
    constructor(private recipeService: RecipeService) {}

    
}