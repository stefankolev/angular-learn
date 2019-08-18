import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeIngredientComponent } from './components/recipes/recipe-detail/recipe-ingredient/recipe-ingredient.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './components/shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-router.module';
import { RecipeResolver } from './components/recipes/recipe-detail/recipe-resolver.service';
import { RecipeService } from './components/recipes/recipe.service';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, RecipesComponent, RecipeDetailComponent, RecipeItemComponent, ShoppingListComponent, ShoppingEditComponent, RecipeListComponent, RecipeIngredientComponent, DropdownDirective, RecipeStartComponent, RecipeEditComponent

  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    ReactiveFormsModule
  ],
  providers: [ShoppingListService, RecipeService, RecipeResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
