import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    // ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    editIngredientIndex = new Subject<number>();
    private ingredients:Ingredient[] = [];

    // private ingredients:Ingredient[] = [
    //     new Ingredient('Tomatoes',6),
    //     new Ingredient('Apples',10),
    //   ];
    
    getIngredient(index:number){
        return this.ingredients[index];
    }

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient:Ingredient){
        this.findIngredient(ingredient);
        // this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index:number,newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients:Ingredient[]){
        ingredients.forEach((eachIngred:Ingredient)=>{
            this.findIngredient(eachIngred);
        })
        // this.ingredients.push(...ingredients);
        // this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    findIngredient(ingredient:Ingredient){
        const obj = this.ingredients.find((ingred)=>ingred.name === ingredient.name);
        if(obj){
            obj.amount += ingredient.amount;
        }else{
            this.ingredients.push(ingredient);
        }
    }

    onDeleteIngredient(ingredient:Ingredient,i:number){
        let itemFound = false;

        if(ingredient.name === this.ingredients[i].name){
            itemFound = true;
            if(this.ingredients[i].amount<ingredient.amount){
                alert('The Amount is mismatch')
            }
            else if(this.ingredients[i].amount>ingredient.amount){
                const newIngredient = new Ingredient(ingredient.name,this.ingredients[i].amount-ingredient.amount)
                this.updateIngredient(i,newIngredient);
            }
            else{
                this.ingredients.splice(i,1);
                this.ingredientsChanged.next(this.ingredients.slice());
            }
        }

        if(!itemFound){
            alert('Ingredient not found');
        }
    }

    onEmptyList() {
        this.ingredients = [];
        this.ingredientsChanged.next([]);
    }

}
