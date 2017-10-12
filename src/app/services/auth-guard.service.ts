import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
// Import our authentication service
import { FirebaseauthService } from '../services/firebaseauth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth:FirebaseauthService, private router: Router) {}

  canActivate(){
    if (this.auth.isLoggedIn) {
      return true;
    }
      this.router.navigate(['/']);
      return false;
    
    
  }
  

  

}
