import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
declare var $: any;


@Injectable()
export class HelpersService {

    public scrollTo=(element)=>{

         $('html,body').animate({
            scrollTop: $(element).offset().top - 100
        }, 1000);
    }

    public replaceImg = (text) => text.replace('<img([\w\W]+?)/>', '');

    public toggleMenu = () => $('header nav').slideToggle();

    public static MAPSURL = "" + "https://www.google.es/maps/place/BEST+INK+Estudio+de+Tatuajes+y+Piercing+-+Tattoo%26Piercing+Barcelona./@41.3707889,2.056245,18.75z/data=!4m12!1m6!3m5!1s0x12a49bdb29f8dcbb:0xccaeed11b123347!2sBEST+INK+Estudio+de+Tatuajes+y+Piercing+-+Tattoo%26Piercing+Barcelona.!8m2!3d41.37033!4d2.05703!3m4!1s0x12a49bdb29f8dcbb:0xccaeed11b123347!8m2!3d41.37033!4d2.05703";

    public getGalleryType = (id): string => {

        switch (id) {
            case 1:
                return "tattoo";

            case 2:
                return "piercing";

            case 3:
                return "micro";

            default:
                return "tattoo";

        }
    }
    public randomName = (): string => {
        return UUID.UUID();
    }

    public getExtension(name:string):string{

        return name.substr(name.lastIndexOf('.'));

    }
}


