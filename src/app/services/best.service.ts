import { Injectable } from '@angular/core'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { Post } from '../models/post.model'
import { Imagen } from '../models/Imagen.model'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BestService {

    public storageRef: any;
    public databaseRef: Observable<any>;

    constructor(
        public db: AngularFireDatabase,
        public fireapp: FirebaseApp) {
        this.storageRef = firebase.storage().ref('/gallery');
        this.databaseRef = this.db.list('/posts');
    }

    getdatabaseRef = (): Observable<any> => {
        return this.databaseRef;
    }
    getstoregeRef = () => {
        return this.storageRef;
    }
    getArticles = (): Observable<any> => {

        return this.db.list('/posts', {
            query: {
                orderByChild: 'date'
            }
        });

    }

    getArticle = (key: string): Observable<Post> => {

        return this.db.object('/posts/' + key)

    }

    removeArticle = (key: string): firebase.Promise<any> => {

        return this.db.list('/posts/' + key).remove()

    }

    getGalleryImages = (type:string): Observable<Imagen[]>=>{
        return this.db.list(`/gallery/${type}`);
    }
    addDataImage =(path:string,image:Imagen)=>{
        return this.db.list(`/gallery/${path}`).push(image)
    }
    removeDataImage=(path:string,key:string):firebase.Promise<any>=>{
        return this.db.list(`/gallery/${path}`).remove(key);
    }

    deleteGalleryImage =(path:string,name:string):firebase.Promise<any>=>{
        return this.storageRef.child(`${path}/${name}`).delete()
    }


}