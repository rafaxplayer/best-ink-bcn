import { Component, OnInit,Input } from '@angular/core';
import { HelpersService } from '../services/helpers.service'
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AuthService } from '../services/auth.service'
import { ScrollToService } from 'ng2-scroll-to-el';
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor(
    public help:HelpersService,
    private router:Router,
    private scrollService:ScrollToService,
    public auth:AuthService     
    ){}

    
  selectNavigate = (id:string):void =>{

      if(this.router.url == '/' || this.router.url == '/home'){

        let offset = $('.button-menu').is(':visible') ? -350 : -100 ;

        if($('.button-menu').is(':visible')){
          
          this.help.toggleMenu();
        }  

        this.scrollService.scrollTo(id,800,offset);

      }else{

        this.router.navigate(['/home/',id]);

      }
  }
  
  
}
