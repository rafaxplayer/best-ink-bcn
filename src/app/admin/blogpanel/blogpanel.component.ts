import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { BestService } from '../../services/best.service';
import { NgForm } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

declare var $: any;

@Component({
  selector: 'app-blogpanel',
  templateUrl: './blogpanel.component.html',
  styleUrls: ['./blogpanel.component.css']
})

export class BlogpanelComponent implements OnInit {

  message: string = "";

  preview: String = "/assets/img/placeholder.png";

  modeEdit: boolean = false;

  id: number = 0;

  imageFiles: any = {}

  forma: NgForm;

  optionsEditor = {

    placeholderText: 'Edita tu articulo!',
    fontFamilySelection: true,
    fontSizeSelection: true,
    height: 200,
    toolbarButtons: ['undo', 'redo', '|', 'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertTable', '|', 'insertHR', 'selectAll', 'clearFormatting', '|', 'spellChecker', 'help', 'html'],
    toolbarButtonsSM: ['undo', 'redo', '|', 'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertTable', '|', 'insertHR', 'selectAll', 'clearFormatting', '|', 'spellChecker', 'help', 'html'],
    toolbarButtonsXS: ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertTable', '|', 'insertHR', 'selectAll', 'clearFormatting', '|', 'spellChecker', 'help', 'html']
  }

  @ViewChild('formNew') form: NgForm;
  @ViewChild('titleArticle') title: ElementRef;
  @ViewChild('imagenArticle') img: ElementRef;
  @ViewChild('articleArt') article: ElementRef;

  constructor(private _bestservice: BestService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private el: ElementRef,
    private _render: Renderer2) { }

  ngOnInit() {
    this._activeRoute.params.subscribe(params => {
      if (params.id) {
        this.setEdit(params.id)
      }
    })
  }


  setEdit(id: number) {
    this._bestservice.getPost(id).then(post => {
      this._render.setProperty(this.title.nativeElement, 'value', post.title);
      this.preview = post.img;
      $(this.article.nativeElement).froalaEditor('html.set', post.content);
      this.modeEdit = true;
      this.id = id;
    })

  }

  resteForm(f: NgForm) {
    f.control.reset();
    $(this.article.nativeElement).froalaEditor('html.set', "");
  }

  changeImage(e) {
    const reader = new FileReader();
    reader.onload = (en: any) => {

      this.preview = en.target.result;
    }
    if (e.target.files.length) {
      reader.readAsDataURL(e.target.files[0]);
      this.imageFiles = e.target.files;
    }
  }

  onSubmit(f: NgForm,e) {
    e.preventDefault();
    if (f.valid) {
      console.log('valid')
      if (this.modeEdit) {
        let currentId = this.id;
        this._bestservice.updateArticle(this.getFormData(f))
          .then(data => {
            this.message = data._body,
              setTimeout(() => {
                this._router.navigate(['/article',currentId]);
                
              }, 3000)
          })

      } else {

        this._bestservice.newArticle(this.getFormData(f))
          .then(data => { this.message = data._body })
      }

      this.preview = "../../../assets/img/placeholder.png";
      this.modeEdit = false;
      this.id = 0;
      this.resteForm(f);
    }

  }

  getFormData(f) {
    let frm = new FormData();
    if (this.imageFiles.length) {
      let file = this.imageFiles[0];
      frm.append('imagen', file, file.name)
    }
    if (this.id > 0) {
      frm.append('id', this.id + "")
    }
    frm.append('title', f.controls.titulo.value)
    frm.append('articulo', f.controls.articulo.value)

    return frm;
  }



}
