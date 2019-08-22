import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Subscription } from 'rxjs';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  private igChangeSub: Subscription

  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit() {
    this.loggingService.printLog("Hello fom ShoppingListCOmponent ngoninit");
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  onEditItem(index: number ) { 
    this.shoppingListService.startedEditing.next(index);

  }

}
