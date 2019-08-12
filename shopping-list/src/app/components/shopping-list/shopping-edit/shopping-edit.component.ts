import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: true})nameElt: HTMLInputElement;
  @ViewChild('amountInput', {static: true})amountElt: HTMLInputElement;


  tmpName: string;
  tmpAmount: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onAdd() { 
    this.slService.addIngredient(new Ingredient(this.tmpName, this.tmpAmount));
  }

}
