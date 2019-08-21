import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component'
import { Alert } from 'selenium-webdriver';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
    private closeSub: Subscription;

    constructor(private authService: AuthService, private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        console.log(form);
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password)
        } else {
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe(responseData => {
            this.isLoading = false;
            console.log(responseData);
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            this.isLoading = false;
            console.log(errorMessage);
            this.showErrorAlert(errorMessage);
            this.error = errorMessage;
        });

        form.reset();
    }

    login(email: string, password: string) {
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(errorMessage: string) {

        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = errorMessage;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });

    }
}