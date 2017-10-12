import { Component } from '@angular/core';
import { HelpersService } from '../services/helpers.service'
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(public help:HelpersService,
              private router:Router) { }

  selectNavigate = (id:string):void =>{
    
          if(this.router.url == '/' || this.router.url == '/home'){
    
            let offset = $('.button-menu').is(':visible') ? -350 : -100 ;
    
            if($('.button-menu').is(':visible')){
              
              this.help.toggleMenu();
            }  
    
            this.help.scrollTo(id)
    
          }else{
    
            this.router.navigate(['/home/',id]);
    
          }
      }

  
}
