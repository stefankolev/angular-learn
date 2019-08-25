import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../components/recipes/store/recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    private authSub: Subscription;

    constructor (private store: Store<fromApp.AppState>) {}

    collapsed=true;
    isAuthenticated = false;

    ngOnInit(): void {
        this.authSub = this.store.select('auth')
        .pipe(map(authState => authState.user))
        .subscribe( user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });
    } 

    ngOnDestroy(): void {
        this.authSub.unsubscribe();
    }



    onSaveData()  { 
        this.store.dispatch(new RecipeActions.StoreRecipes());
        // this.dataStorageService.storeRecipes();
    }

    onFetchData() { 
        this.store.dispatch(new RecipeActions.FetchRecipes());
        // this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() { 
        this.store.dispatch(new AuthActions.Logout()); 
    }
}