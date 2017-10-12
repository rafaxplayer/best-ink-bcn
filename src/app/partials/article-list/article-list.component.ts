import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';
import { BestService } from '../../services/best.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {

  @Input() post: Post;
  @Input() editing: boolean = false;
  @Output() pushmessage: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router,
    private _bestService: BestService) { }

  ngOnInit() {
  }

  edit(key: string): void {
    this.router.navigate(['admin', 'edit', key]).catch(err => console.error('Navigate error ', err));
  }

  remove(key: string): void {

    if (confirm('¿Seguro quieres eliminar esta entrada?')) {

      this._bestService.removeArticle(key).then(_ => {

        this.pushmessage.emit('Ok mensage eliminado');
      }, error => console.log(error))

    }

  }

}
