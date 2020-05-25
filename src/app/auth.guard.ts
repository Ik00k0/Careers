import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }


  canActivate(): boolean {
    let result: boolean

    this._authService.seenInfo().then(
      (data) => {
        if (data == true) {

          this._authService.loggedIn().then(
            
            (loggedIn)=>{
              console.log('logged in');
              if(loggedIn == true){
                this._router.navigateByUrl('home/active');
                console.log("Lggged in is " + loggedIn)
                return true
              }else{

                
                this._router.navigateByUrl('login');

              }
            },

            (notloggedIn)=>{
              this._router.navigateByUrl('login');
            } 
          );
          
          result = true;


        } else {
          this._router.navigateByUrl('info');
          result = false
        }
      },
      (fail) => {
        result = false;

      }
    )

    return result;

  }

}
