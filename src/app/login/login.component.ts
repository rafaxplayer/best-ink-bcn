import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 
})
export class LoginComponent implements OnInit {

  password:string;

  email:string;

  message:string ="";
  
  error:any;
  constructor(public auth:FirebaseauthService,
              private router:Router) {
    
  }

  ngOnInit() {
    console.log(this.auth.isLoggedIn)
    if(this.auth.isLoggedIn){
      this.message = "Ya estas logeado , unlogin para acceder con otra cuenta";
      setTimeout(()=>this.router.navigate(['/']),2000)
    }
  }

  onSubmit(formData) {
    if(formData.valid) {
      
      this.auth.login(
        formData.value.email,
        formData.value.password
      ).then((user) => {
        
        this.message = "Ok authentificated!";
        setTimeout(()=>{
          this.router.navigate(['/'])
        },3000)
      })
      .catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  logout() {
    this.auth.signOut();
  }

}
