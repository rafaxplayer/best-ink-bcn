import { Component, OnInit ,AfterViewInit} from '@angular/core'
import { NgForm } from '@angular/forms'
import { HelpersService } from '../services/helpers.service'
import { ActivatedRoute } from '@angular/router'
import { BestService } from '../services/best.service'
import { Imagen } from '../models/Imagen.model'
import { Observable } from 'rxjs/Observable';
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
  message:string="";

  imagesTattoo:Imagen[]=[];
  imagesPiercing: Imagen[] = [];
  imagesMicro: Imagen[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private help: HelpersService,
    private _bestService:BestService) { }

  clickMapMarker = () => window.open(HelpersService.MAPSURL);

  ngOnInit() {
    this._bestService.getGalleryImages('tattoo').subscribe(images=>{this.imagesTattoo=images})
    this._bestService.getGalleryImages('piercing').subscribe(images=>this.imagesPiercing=images)
    this._bestService.getGalleryImages('micro').subscribe(images=>this.imagesMicro=images)
  }

  ngAfterViewInit(){
    this.activeRoute.params.subscribe(params => {
        let offset = $('.button-menu').is(':visible') ? -350 : -100;
        if ($('.button-menu').is(':visible')) {

          this.help.toggleMenu();
        }
        this.help.scrollTo(params.id)
        
    }) 
  }
  

  onSubmit = (f: NgForm) => {
    if (f.valid) {
      console.log(f.value)
      //this._bestService.mail(f.value).then( data => this.message = data);
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
