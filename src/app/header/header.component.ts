import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from '../services/helpers.service'
import { FirebaseauthService } from '../services/firebaseauth.service'
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  
  constructor(
    public help: HelpersService,
    public auth: FirebaseauthService,
    private router: Router
    
  ) { 
    
  }

  ngOnInit() {
    
  }
  
  
  selectNavigate = (id: string): void => {

    if (this.router.url == '/' || this.router.url == '/home') {

      let offset = $('.button-menu').is(':visible') ? -350 : -100;

      if ($('.button-menu').is(':visible')) {

        this.help.toggleMenu();
      }
      this.help.scrollTo(id);    

    } else {

      this.router.navigate(['/home/', id]);

    }
  }


}
