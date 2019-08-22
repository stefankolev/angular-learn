import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from 'src/app/logging.service';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  
  ngOnDestroy(): void {
  }

  private igChangeSub: Subscription

  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(private loggingService: LoggingService, 
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number ) { 
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
