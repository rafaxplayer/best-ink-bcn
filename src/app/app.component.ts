import { Component,OnInit } from '@angular/core'
import { HelpersService } from './services/helpers.service'
import { ScrollToService } from 'ng2-scroll-to-el';
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  template: `<app-header></app-header>
            <router-outlet></router-outlet>
            <app-footer></app-footer>
            <div (click)="gotoTop()" class="goToTop"><i class="fa fa-angle-up fa-2x" aria-hidden="true"></i></div>`
})

export class AppComponent implements OnInit{
  
    constructor(private help:HelpersService,
                private scrollService: ScrollToService,
                public auth:AuthService){}

    ngOnInit(){
        this.auth.handleAuthentication();
    }

    gotoTop(){
        this.scrollService.scrollTo('header');
    }

    
}
