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

  constructor(private bestservice: BestService, private pagerService: PagerService) {}

  ngOnInit() {
    this.bestservice.getArticlesCount().then( count => {
      this.postsCount = count;
      this.setPage(1);
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
    this.bestservice.getPagerPost(this.pager.startIndex,this.pager.endIndex + 1)
      .then( posts => this.pagedItems = posts)

  }

}
