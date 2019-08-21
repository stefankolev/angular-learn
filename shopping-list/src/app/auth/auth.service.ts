import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string, 
    registered? : boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    userSubject = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    private apiKey = 'AIzaSyB7TluGRPu7p69x-asCkvVMFrahsp-anHc';

    constructor(private http: HttpClient, 
        private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(resp => this.handleAuthentication(resp)));

    }

    login( email: string, password: string) { 
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey, 
        {
            email: email, 
            password: password, 
            returnSecureToken: true
        }).pipe(catchError(this.handleError), 
        tap(resp => this.handleAuthentication(resp)));
    }

    logout( ) { 
        this.userSubject.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if( this.tokenExpirationTimer ) { 
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) { 

        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);

    }

    private handleAuthentication(  authResponseData: AuthResponseData) { 
        const expirationDate = new Date(new Date().getTime() + +authResponseData.expiresIn *1000);
        const user = new User(authResponseData.email, authResponseData.localId, authResponseData.idToken, expirationDate);
        this.userSubject.next(user);
        this.autoLogout(+authResponseData.expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogin() { 
        const userData: { 
            email: string, 
            id: string, 
            _token: string, 
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if( !userData ) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if( loadedUser.token ) { 
            this.userSubject.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }

    private handleError(errorRes: HttpErrorResponse) { 
        let errorMessage = 'An unknown error occured';
        if (errorRes.error && errorRes.error.error) {
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists';
                    break;
                case 'EMAIL_NOT_FOUND': 
                    errorMessage = 'Email not found!';
                    break;
                case 'INVALID_PASSWORD': 
                    errorMessage = 'Wrong password';
                    break;
            }
        }
        return throwError(errorMessage);
    }

}