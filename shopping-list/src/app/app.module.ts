import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-router.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';

import {StoreModule} from '@ngrx/store';
import { shoppingListReducer } from './components/shopping-list/store/shopping-list.reducer';


@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    StoreModule.forRoot({
      shoppingList: shoppingListReducer
    }), 
    HttpClientModule, 
    SharedModule, 
    CoreModule
  ],
  // providers: [LoggingService],
  bootstrap: [AppComponent]

})
export class AppModule { }
