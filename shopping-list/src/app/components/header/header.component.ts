import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { State, Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, take } from 'rxjs/operators';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    private authSub: Subscription;

    constructor (private dataStorageService: DataStorageService, 
        private authService: AuthService, 
        private store: Store<fromApp.AppState>) {}

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
        this.dataStorageService.storeRecipes();
    }

    onFetchData() { 
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() { 
        this.store.dispatch(new AuthActions.Logout()); 
    }
}