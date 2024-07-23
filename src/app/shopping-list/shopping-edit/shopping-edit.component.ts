import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('name',{static:false}) name:ElementRef;
  // @ViewChild('amount',{static:false}) amount:ElementRef;
  @ViewChild('f',{static:false}) slForm:NgForm;

  subs:Subscription;

  editedItemIndex:number;
  editMode = false;
  editedItem:Ingredient;

  // @Output() emitIngrediet = new EventEmitter<Ingredient>();
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.subs = this.shoppingListService.editIngredientIndex.subscribe((index:number)=>{
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    })
  }

  onChangeIngredients(form:NgForm){
    console.log(form);

    // const name = this.name.nativeElement.value;
    // const amount = parseInt(this.amount.nativeElement.value)

    const name = form.value.name;
    const amount = form.value.amount;

    const ingred = new Ingredient(name,amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,ingred);
    }else{
      this.shoppingListService.addIngredient(ingred);  
    }
    this.editMode = false;
    this.slForm.reset();

    // const newIngredient  = new Ingredient(this.name.nativeElement.value,parseInt(this.amount.nativeElement.value));
    // this.emitIngrediet.emit(newIngredient);
  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(){
    this.shoppingListService.onDeleteIngredient(this.editedItem,this.editedItemIndex);
    this.slForm.reset();
  }

  onClearAll() {
    this.shoppingListService.onEmptyList();
    this.slForm.reset();
  }

}
