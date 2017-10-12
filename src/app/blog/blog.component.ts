import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BestService } from '../services/best.service';
import { NotfoundComponent } from '../partials/notfound/notfound.component'
import { Post } from '../models/post.model'
import { PagerService } from '../services/pagination.service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'

})
export class BlogComponent implements OnInit {

  posts: Post[] = [];

  pager: any = {};

  postsCount: number = 0;

  pagedItems: Post[] = [];

  constructor(public _bestService:BestService,private pagerService: PagerService) {}

  ngOnInit() {
    this._bestService.getdatabaseRef().subscribe( posts => {
      this.postsCount = posts.length;
      this.setPage(1)
  })
  }

  onSearchArticle(posts) {
    this.pagedItems = posts;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.postsCount, page);
    // get current page of items
    this._bestService.getArticles().subscribe(posts=>{
      this.pagedItems = posts.slice(this.pager.startIndex, this.pager.endIndex + 1)
      
  }) 

  }

}
