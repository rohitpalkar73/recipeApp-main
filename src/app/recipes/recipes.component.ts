import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // selectedRecipe:Recipe


  constructor(private dataStoreService:DataStorageService) { }

  ngOnInit(): void {
    this.dataStoreService.fetchRecipes().subscribe();
  }

}
