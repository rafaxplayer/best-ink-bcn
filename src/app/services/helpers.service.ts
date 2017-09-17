import { Injectable } from '@angular/core';
import { ScrollToService } from 'ng2-scroll-to-el';

declare var $: any;

@Injectable()
export class HelpersService {

    public replaceImg = (text) => text.replace('<img([\w\W]+?)/>', '');

    public toggleMenu = () => $('header nav').slideToggle();

    public static MAPSURL = "" + "https://www.google.es/maps/place/BEST+INK+Estudio+de+Tatuajes+y+Piercing+-+Tattoo%26Piercing+Barcelona./@41.3707889,2.056245,18.75z/data=!4m12!1m6!3m5!1s0x12a49bdb29f8dcbb:0xccaeed11b123347!2sBEST+INK+Estudio+de+Tatuajes+y+Piercing+-+Tattoo%26Piercing+Barcelona.!8m2!3d41.37033!4d2.05703!3m4!1s0x12a49bdb29f8dcbb:0xccaeed11b123347!8m2!3d41.37033!4d2.05703";
}


