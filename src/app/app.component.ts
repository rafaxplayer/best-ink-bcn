import { Component,OnInit } from '@angular/core'
import { HelpersService } from './services/helpers.service'



@Component({
  selector: 'app-root',
  template: `<app-header></app-header>
            <router-outlet></router-outlet>
            <app-footer></app-footer>
            <div (click)="gotoTop()" class="goToTop"><i class="fa fa-angle-up fa-2x" aria-hidden="true"></i></div>`
})

export class AppComponent implements OnInit{
  
    constructor(private help:HelpersService){}

    ngOnInit(){}

    gotoTop(){
        this.help.scrollTo('header')
    }

    
}
