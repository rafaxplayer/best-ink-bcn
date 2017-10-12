import { Component, OnInit } from '@angular/core';
import { BestService } from './../../services/best.service';
import { Post } from '../../models/post.model';
import { HelpersService } from '../../services/helpers.service';
import { PagerService } from '../../services/pagination.service'
import { Router } from '@angular/router';


@Component({
    selector: 'articlelist',
    templateUrl: './articlelist.component.html'

})
export class ArticlelistComponent implements OnInit {

    posts: Post[] = [];

    pager: any = {};

    postsCount: number = 0;

    pagedItems: Post[] = [];

    message: string = "";

    constructor(
        public _serviceBest: BestService,
        private helper: HelpersService,
        private pagerService: PagerService,
        private router: Router) { }

    ngOnInit() {

        this._serviceBest.getdatabaseRef().subscribe(posts => {
            this.postsCount = posts.length;
            this.setPage(1)
        })

    }
    //evento del hijo <app-article-list>
    onMessage(msg) {
        this.message = "";
        this.message = msg;
        this.ngOnInit();
    }

    onSearchArticle(e) {
        this.pagedItems = e;
    }

    setPage(page: number) {

        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.postsCount, page);

        this._serviceBest.getArticles().subscribe(posts => {
            this.pagedItems = posts.slice(this.pager.startIndex, this.pager.endIndex + 1)

        })
    }
}