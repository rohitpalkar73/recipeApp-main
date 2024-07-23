import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // feature:string = "recipe";
  // selectedFeature(data:string){
  //   console.log("Feature Selected : "+data)
  //   this.feature  = data
  // }

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
