import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinner } from './loading-spinner/loading-spinner';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { LoggingService } from '../logging.service';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinner,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinner,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],
    entryComponents: [
        AlertComponent
    ], 
    providers: [LoggingService]
})
export class SharedModule { }