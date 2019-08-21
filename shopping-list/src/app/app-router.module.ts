import {Routes, RouterModule} from "@angular/router"
import { AppComponent } from './app.component';

import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeResolver } from './components/recipes/recipe-detail/recipe-resolver.service';
import { RecipesResolverService } from './components/recipes/recipes-resolver.service'
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'}, 
    {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], /*resolve: [RecipesResolverService],*/ children: [
        {path: '', component: RecipeStartComponent}, 
        {path: 'new', component: RecipeEditComponent}, 
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]}, 
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
    ]}, 
    {path: 'shopping-list', component: ShoppingListComponent}, 
    { path: 'auth', component: AuthComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)], 
    exports: [RouterModule]
})
export class AppRoutingModule { 

}

