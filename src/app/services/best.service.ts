import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'
import { Post } from '../models/post.model'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class BestService {

    private urlPagerPosts: string = 'http://localhost/best-ink-bcn/src/api/getPagerArticles.php';
    private urlPostsCount: string = 'http://localhost/best-ink-bcn/src/api/getArticlesCount.php';
    private urlPosts: string = 'http://localhost/best-ink-bcn/src/api/getArticles.php';
    private urlPost: string = 'http://localhost/best-ink-bcn/src/api/getArticle.php?id=';
    private urlNew: string = "http://localhost/best-ink-bcn/src/api/newArticle.php";
    private urlMail: string = "http://localhost/best-ink-bcn/src/api/mail.php";
    private urlEdit: string = "http://localhost/best-ink-bcn/src/api/updateArticle.php";
    private urlDelete: string = 'http://localhost/best-ink-bcn/src/api/remove.php?id=';
    private urlFindPosts: string = 'http://localhost/best-ink-bcn/src/api/findArticles.php?pattern=';


    constructor(private http: Http) { }

    getAllPost(): Promise<Post[]> {

        return this.http.get(this.urlPosts)
            .toPromise()
            .then(response => response.json() as Post[])
            .catch(this.handleError)
    }

    getArticlesCount(): Promise<number> {

        return this.http.get(this.urlPostsCount)
            .toPromise()
            .then(response => response.json() as number)
            .catch(this.handleError)
    }

    getPagerPost(start: number, end: number): Promise<Post[]> {

        return this.http.get(this.urlPagerPosts, { params: { start: start, end: end } })
            .toPromise()
            .then(response => response.json() as Post[])
            .catch(this.handleError)
    }

    getPost(id: number): Promise<Post> {
        return this.http.get(this.urlPost + id)
            .toPromise()
            .then(response => response.json() as Post)
            .catch(this.handleError)
    }

    newArticle(formData: any): Promise<any> {

        return this.http.post('http://localhost/best-ink-bcn/src/api2/article', formData)
            .toPromise()
            .catch(this.handleError)
    }

    updateArticle(formData: any): Promise<any> {
        return this.http.post(this.urlEdit, formData)
            .toPromise()
            .catch(this.handleError)
    }

    findArticles(pattern): Promise<Post[]> {

        return this.http.get(this.urlFindPosts + pattern)
            .toPromise()
            .then(response => response.json() as Post[])
            .catch(this.handleError)
    }

    deleteArticle(id: number): Promise<any> {

        return this.http.get(this.urlDelete + id)
            .toPromise()
            .catch(this.handleError)
    }
     mail(formData: any):Promise<any>{
        return this.http.post(this.urlMail, formData)
        .toPromise()
        .catch(this.handleError)
     }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}