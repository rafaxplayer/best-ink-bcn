import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import {Post} from '../../models/post.model';
import {Router} from '@angular/router';
import {BestService} from '../../services/best.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  @Input() post:Post;
  @Input() editing:boolean=false;
  @Output() pushmessage:EventEmitter<string>= new EventEmitter();
  
  constructor(private router:Router,
              private _bestservice:BestService) { }

  ngOnInit() {
  }
  
  edit(id:number):void{
    this.router.navigate(['admin','edit',id]);
  }

  remove(id:number):void{

    if(confirm('¿Seguro quieres eliminar esta entrada?')){

        this._bestservice.deleteArticle(id)
          .then( resp => this.pushmessage.emit(resp._body), err => console.log(err))
      }
    
  }

}
