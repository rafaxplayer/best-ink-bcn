import {Pipe ,PipeTransform}from '@angular/core'

@Pipe({
    name:'sinimagen'
})
export class SinImagen implements PipeTransform{

    transform(value:string):string{

        return value.replace(/<img .*?>/g,"");
    }

}
