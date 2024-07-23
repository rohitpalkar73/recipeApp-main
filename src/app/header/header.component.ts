import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy{
  // @Output() selectedFeature = new EventEmitter<string>();
  // onSelect(feature:string){
  //   this.selectedFeature.emit(feature);
  // }
  isAuthenticated = false;
  private userSub:Subscription;
  
  constructor(private dataStoreService:DataStorageService,private authService:AuthService){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSave(){
    this.dataStoreService.storeRecipe();
  }

  onFetch(){
    this.dataStoreService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

}
