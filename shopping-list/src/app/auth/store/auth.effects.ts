import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

const handleAuthentication = (expiresIn: number, email: string, token: string, userId: string) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({
        email,
        userId,
        token,
        expirationDate, 
        redirect: true
    });
};

const handleError = (errorRes: any) => {
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

    return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupaction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                {
                    email: signupaction.payload.email,
                    password: signupaction.payload.password,
                    returnSecureToken: true
                }).pipe(
                    tap(resDate => {
                        this.authService.setLogoutTimer(+resDate.expiresIn * 1000);
                    }), map(resData => {
                        return handleAuthentication(+resData.expiresIn, resData.email, resData.idToken, resData.localId);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);

                    }))
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    tap(resDate => {
                        this.authService.setLogoutTimer(+resDate.expiresIn *1000 );
                    }), 
                    map(resData => {
                        return handleAuthentication(+resData.expiresIn, resData.email, resData.idToken, resData.localId);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);

                    }))
        }),


    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
            if( authSuccessAction.payload.redirect ) { 
                this.router.navigate(['/']);
            }
        }));

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);


    }));

    @Effect()
    autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN), map(() => {

        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return {type: 'DUMMY'};
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            // this.userSubject.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - 
                new Date().getTime();
            this.authService.setLogoutTimer(expirationDuration);
            return new AuthActions.AuthenticateSuccess({
                email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpirationDate), 
                redirect: false
            });

        }
        return {type: 'DUMMY'};

    }));

    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router, 
        private authService: AuthService) { }
}