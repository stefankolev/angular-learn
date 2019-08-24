import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../../store/app.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  @ViewChild('f', {static: true})slForm: NgForm;
  editMode = false;
  // editedItemIndex: number;
  subscription: Subscription;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if( stateData.editedIngredientIndex > -1 ) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        // this.editedItemIndex = stateData.editedIngredientIndex;
        this.slForm.setValue({
          name: this.editedItem.name, 
          amount: this.editedItem.amount
        })
      } else { 
        this.editMode = false;
      }
    });
    // this.subscription = this.slService.startedEditing
    //   .subscribe((index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.slService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name, 
    //       amount: this.editedItem.amount
    //     })
    //   });
  }

  onClear() { 
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() { 
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
    // this.slService.deleteIngredient(this.editedItemIndex);
  }

  onAdd(form: NgForm) { 
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if( this.editMode ) { 
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else { 
      // this.slService.addIngredient(new Ingredient(value.name, value.amount));
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.slForm.reset();
    this.editMode = false;
    
  }

}
