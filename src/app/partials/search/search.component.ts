import { Component, Output, EventEmitter } from '@angular/core';
import { BestService } from '../../services/best.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output() public search: EventEmitter<any> = new EventEmitter();

  constructor(private _bestService: BestService) { }

  searchArticle(pattern) {

    this._bestService.findArticles(pattern)
      .then(posts => this.search.emit(posts), err => console.log(err));

  }



}
