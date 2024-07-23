import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn:'root'
})
export class DataStorageService {
    constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService){}

    storeRecipe(){
        const recipe = this.recipeService.getRecipes();
        this.http.put('https://httpunderstanding-7a2fb-default-rtdb.firebaseio.com/recipes.json',
        recipe).subscribe(response=>{
            console.log(response);
        });
    }

    fetchRecipes(){
        return this.http.get('https://httpunderstanding-7a2fb-default-rtdb.firebaseio.com/recipes.json')
                .pipe(map((recipes:Recipe[])=>{
                    return recipes.map((recipe=>{
                        return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]}
                    }));
                }),tap(recipes=>{
                    this.recipeService.setRecipes(recipes);
                }))
    }

}