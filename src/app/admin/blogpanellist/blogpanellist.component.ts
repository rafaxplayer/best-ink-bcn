import { Component, OnInit } from '@angular/core';
import { BestService } from './../../services/best.service';
import { Post } from '../../models/post.model';
import { HelpersService } from '../../services/helpers.service';
import { PagerService } from '../../services/pagination.service'
import { Router } from '@angular/router';

@Component({
    selector: 'app-blogpanellist',
    templateUrl: './blogpanellist.component.html'

})
export class BlogpanelListComponent implements OnInit {

    posts: Post[] = []

    pager: any = {};

    postsCount: number = 0;

    pagedItems: Post[] = [];

    message: string = "";

    constructor(private bestservice: BestService,
        private helper: HelpersService,
        private pagerService: PagerService,
        private router: Router) { }

    ngOnInit() {

        this.bestservice.getArticlesCount().then(postsCount => {
            this.postsCount = postsCount;
            this.setPage(1);
        }, err => console.log(err))
    }
    //evento del hijo <app-article-list>
    onMessage(e) {
        this.message = e;
        this.ngOnInit();

    }

    onSearchArticle(e) {
        this.pagedItems = e;

    }

    setPage(page: number) {

        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.postsCount, page);

        this.bestservice.getPagerPost(this.pager.startIndex, this.pager.endIndex + 1)
            .then(posts => this.pagedItems = posts)

    }
}