import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  
  private idSubs :Subscription;
  // ingredients:Ingredient[] = [
  //   new Ingredient('Tomatoes',6),
  //   new Ingredient('Apples',10),
  // ];

  constructor(private shoppingListService:ShoppingListService) {
    this.idSubs = this.shoppingListService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients = ingredients;
    })
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnDestroy(): void {
    this.idSubs.unsubscribe();
  }

  editIngred(i:number){
    this.shoppingListService.editIngredientIndex.next(i);
  }

  // onAddIngredient(ingredient:Ingredient){
  //   // console.log(ingredient);
  //   this.ingredients.push(ingredient);
  // }

}
