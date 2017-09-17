import { Component } from '@angular/core';
import { HelpersService } from '../services/helpers.service'
import { Router } from '@angular/router';
import { ScrollToService } from 'ng2-scroll-to-el';
declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(public help:HelpersService,
              private router:Router,
              private scrollService:ScrollToService,) { }

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
