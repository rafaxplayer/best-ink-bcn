import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BestService } from '../../services/best.service'
import { Post } from '../../models/post.model'
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  post:Post = new Post();;
  
  constructor(
    private _route:ActivatedRoute,
    private _bestService:BestService
  ){}
  
  ngOnInit() {
    this._route.params.subscribe(params => {
      this._bestService.getPost(params.id).then( post => this.post = post )
    });
    
  }

}
