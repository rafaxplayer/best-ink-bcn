import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser'

@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor(private satinizer:DomSanitizer){}

  transform(value:string):SafeHtml {
    return this.satinizer.bypassSecurityTrustHtml(value);
  }

}
