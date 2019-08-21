import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    constructor (private dataStorageService: DataStorageService, 
        private authService: AuthService) {}

    collapsed=true;
    userSub: Subscription;
    isAuthenticated = false;

    ngOnInit(): void {
        this.userSub = this.authService.userSubject.subscribe( user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });
    } 

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }



    onSaveData()  { 
        this.dataStorageService.storeRecipes();
    }

    onFetchData() { 
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() { 
        this.authService.logout();
    }
}