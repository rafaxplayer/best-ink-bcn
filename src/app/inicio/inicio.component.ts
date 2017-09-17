import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { HelpersService } from '../services/helpers.service'
import { ActivatedRoute } from '@angular/router'
import { ScrollToService } from 'ng2-scroll-to-el'
declare var Email: any;
declare var $: any;


@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  lat: number = 41.37033;
  lng: number = 2.05703;
  zoom: number = 16;

  constructor(
    private activeRoute: ActivatedRoute,
    private scrollService: ScrollToService,
    private help: HelpersService) { }

  clickMapMarker = () => window.open(HelpersService.MAPSURL);

  ngOnInit() {
    if (this.activeRoute.params) {

      this.activeRoute.params.subscribe(params => {

        let offset = $('.button-menu').is(':visible') ? -350 : -100;

        if ($('.button-menu').is(':visible')) {

          this.help.toggleMenu();
        }
        this.scrollService.scrollTo(params.id, 800, offset)
      }) 
    }

  }


  onSubmit = (f: NgForm) => {
    if (f.valid) {
      Email.send(f.value.email,
        "k1juancarloscoll@gmail.com",
        "From: " + f.value.name + " Email : " + f.value.email,
        f.value.message,
        "smtp.gmail.com",
        "k1juancarloscoll@gmail.com",
        "uuo03mskGHOd");

      alert("Mensaje enviado");
      f.control.reset();
    }
  }

}