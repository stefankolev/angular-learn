import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ShoppingListService {


    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) { 
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredient( index: number ) { 
        return this.ingredients[index];
    }

    addIngredients( ingredients: Ingredient[]) { 
        // for( let ingredient of ingredients ) { 
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient( index: number,  ingredient: Ingredient) { 
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient( index: number ) { 
        this.ingredients.splice(index);
        this.ingredientsChanged.next(this.ingredients.slice());

    }





}