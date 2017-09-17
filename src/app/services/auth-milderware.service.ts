import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router'
import {AuthService } from '../services/auth.service'

@Injectable()
export class AuthMilderwareService implements CanActivate{

  constructor(private authservice:AuthService) { }

  canActivate(next:ActivatedRouteSnapshot, satate:RouterStateSnapshot){

    if(this.authservice.isAuthenticated()){
      return true;
    }else{
      this.authservice.login();
      return false;
    }
      
  }

}
