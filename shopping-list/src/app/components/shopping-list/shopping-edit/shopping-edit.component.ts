import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @ViewChild('f', {static: true})slForm: NgForm;
  editMode = false;
  editedItemIndex: number;
  subscription: Subscription;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name, 
          amount: this.editedItem.amount
        })
      });
  }

  onClear() { 
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() { 
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onAdd(form: NgForm) { 
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if( this.editMode ) { 
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else { 
      this.slService.addIngredient(new Ingredient(value.name, value.amount));
    }
    this.slForm.reset();
    this.editMode = false;
    
  }

}
