import { Component, Input} from '@angular/core';

@Component({
  selector: 'not-found',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {

  @Input() public islist:boolean;

  constructor() { }

}
