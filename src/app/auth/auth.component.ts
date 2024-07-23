import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService,AuthResponseData } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/palceholder/palceholder.directive";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{
    @ViewChild(PlaceholderDirective,{static: false}) alertBoxPlace: PlaceholderDirective;
    closeSubs:Subscription;

    isLoginMode = true;
    isLoading = false;
    error:string = null;

    constructor(private authService:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(formData:NgForm){
        if(!formData.valid){
            return;
        }

        const email = formData.value.email;
        const password = formData.value.password;

        this.isLoading = true;

        let authObs:Observable<AuthResponseData>;

        if(this.isLoginMode){
            authObs = this.authService.login(email,password);
        }else{
            authObs = this.authService.signUp(email,password);
        }

        authObs.subscribe((resposeData)=>{
            console.log(resposeData)
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        },errorMessage=>{
            console.log(errorMessage);
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        });

        formData.reset();
    }

    onHandleError(){
        this.error = null;
    }

    showErrorAlert(message:string){
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        
        const hostViewContainerRef = this.alertBoxPlace.viewContainerRef;
        hostViewContainerRef.clear();
        
        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeSubs = componentRef.instance.close.subscribe(()=>{
            this.closeSubs.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy(): void {
        if(this.closeSubs){
            this.closeSubs.unsubscribe();
        }
    }

}