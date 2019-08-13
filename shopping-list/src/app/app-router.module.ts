import {Routes, RouterModule} from "@angular/router"
import { AppComponent } from './app.component';

import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeResolver } from './components/recipes/recipe-detail/recipe-resolver.service';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'}, 
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: RecipeStartComponent}, 
        {path: 'new', component: RecipeEditComponent}, 
        {path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver}}, 
        {path: ':id/edit', component: RecipeEditComponent}
    ]}, 
    {path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)], 
    exports: [RouterModule]
})
export class AppRoutingModule { 

}

