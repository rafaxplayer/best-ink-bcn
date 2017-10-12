import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HelpersService } from '../../services/helpers.service';
import { NgForm } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
import { Post } from '../../models/post.model'
import * as firebase from 'firebase';
declare var $: any;

@Component({
  selector: 'newarticle',
  templateUrl: './newarticle.component.html',
  styleUrls: ['./newarticle.component.css']
})

export class NewArticleComponent implements OnInit {

  message: string = "";

  preview: String = "/assets/img/placeholder.png";

  post: Post = new Post();

  imageFiles: any = {}

  storageRef: any;

  progress = 0;

  optionsEditor = {

    placeholderText: 'Edita tu articulo!',
    fontFamilySelection: true,
    fontSizeSelection: true,
    height: 200,
    toolbarButtons: ['undo', 'redo', '|', 'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertTable', '|', 'insertHR', 'selectAll', 'clearFormatting', '|', 'spellChecker', 'help', 'html'],
    toolbarButtonsSM: ['undo', 'redo', '|', 'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertTable', '|', 'insertHR', 'selectAll', 'clearFormatting', '|', 'spellChecker', 'help', 'html'],
    toolbarButtonsXS: ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertTable', '|', 'insertHR', 'selectAll', 'clearFormatting', '|', 'spellChecker', 'help', 'html']
  }


  constructor(
    private help: HelpersService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _render: Renderer2,
    private el: ElementRef,
    
    private db: AngularFireDatabase) {

    this.storageRef = firebase.storage().ref('/posts');

  }

  ngOnInit() {
    this._activeRoute.params.subscribe(params => {
      if (params.id) {
        this.setEdit(params.id)
      }
    })
  }

  setEdit(id: string) {

    this.db.object('/posts/' + id).subscribe(post => {
      this.post = post;
      this.preview = post.img_url;

    })

  }

  resteForm(f: NgForm) {
    this.preview = "../../../assets/img/placeholder.png";
    this.post = new Post();
    $('#articulo').froalaEditor('html.set', "")
    f.control.reset();
  }

  changeImage(e) {
    const reader = new FileReader();
    reader.onload = (en: any) => {

      this.preview = en.target.result;
    }
    if (e.target.files.length) {
      reader.readAsDataURL(e.target.files[0]);
      console.log(this.help.getExtension(e.target.files[0].name))
      this.imageFiles = e.target.files;
    }
  }
  /* TODO : Arregalr el update del post */

  onSubmit(e, f: NgForm) {
    e.preventDefault();

    if (f.valid) {

      if (this.post.key) {

        console.log('edit')
        console.log(this.post.key)

        this.post.title = f.value.titulo.toString();
        this.post.content = f.value.articulo.toString();
        this.post.date = new Date();

        this.db.list('/posts').update(this.post.key, this.post)
          .then(() => {
            //if image set....
            if (this.imageFiles.length) {

              this.progress = 0;
              let uid = this.help.randomName();
              let ext = this.help.getExtension(this.imageFiles[0].name);
              let name = uid + '_post' + ext;

              const uploadTask = this.storageRef.child(name)
                .put(this.imageFiles[0]);

              uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {

                this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              }, error => console.error(error),
                () => {
                  
                  //if post contains image back= delete
                  if (this.post.img_name) {

                    this.storageRef.child(this.post.img_name).delete();
                  }
                  this.db.list('/posts').update(this.post.key, { img_url:uploadTask.snapshot.downloadURL,img_name: uploadTask.snapshot.metadata.name })
                    .then(() => {
                      console.log(`Imagen actualizada :${uploadTask.snapshot.downloadURL}`);
                    })
                    .catch(err => console.log(err, 'error'));

                  
                })
            }

            this.sendMessage("Ok datos actualizados")

            setTimeout(() => {
              this._router.navigate(['article', this.post.key])
            }, 2000)

          })
          .catch(err => console.log(err, 'You do not have access!'));

      } else {

        let post = new Post()
        post.title = f.value.titulo.toString();
        post.content = f.value.articulo.toString();
        post.img_url = "";
        post.img_name = "";
        post.date = new Date();

        const ret = this.db.list('/posts').push(post)
          .then((post) => {
            post.update({ key: post.key });

            this.sendMessage("Ok datos añadidos")

            if (this.imageFiles.length) {

              this.progress = 0;
              let uid = this.help.randomName();
              let ext = this.help.getExtension(this.imageFiles[0].name);
              let name = uid + '_post' + ext;

              const uploadTask = this.storageRef.child(name)
                .put(this.imageFiles[0]);

              uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {

                this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              }, error => console.error(error),
                () => {
                  
                  post.update({ img_url: uploadTask.snapshot.downloadURL,img_name:uploadTask.snapshot.metadata.name});
                  console.log(`Imagen subida :${uploadTask.snapshot.downloadURL}`);
                })
            }
            this.resteForm(f);
          })
          .catch(err => console.log(err, 'You do not have access!'));

      }

    }

  }

  sendMessage(msg: string) {
    this.message = "";
    this.message = msg;
  }


}
