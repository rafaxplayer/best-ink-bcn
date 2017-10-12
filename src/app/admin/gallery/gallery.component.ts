import { Component, OnInit, ViewChild } from '@angular/core';
import { Imagen } from '../../models/Imagen.model';
import { HelpersService } from '../../services/helpers.service'
import { BestService } from '../../services/best.service'
import * as firebase from 'firebase';
declare var modal: any;
declare var $: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  preview: string = "../../../assets/img/logo.png";

  imageFiles: any = {};

  message: string = "";

  images: Imagen[] = [];

  selectedType: number = 1;

  selectedTypeStr: string = "tattoo";

  selectedImage: Imagen = new Imagen();

  uploadTask: firebase.storage.UploadTask;

  progress: number = 0;

  @ViewChild('type') selectType;
  @ViewChild('thumb') thumbIMG;
  @ViewChild('formImage') formIMG;




  constructor(
    private help: HelpersService,
    private _bestService: BestService,
  ) {

  }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this._bestService.getGalleryImages(this.selectedTypeStr).subscribe(
      images => {this.images = images });

  }

  onChangeImg(e) {
    const reader = new FileReader();
    reader.onload = (en: any) => {
      this.preview = en.target.result;
    }
    if (e.target.files.length) {
      reader.readAsDataURL(e.target.files[0]);
      this.imageFiles = e.target.files;

    }

  }

  onChangeType(event) {

    this.selectedType = event.target.value;
    this.selectedTypeStr = this.help.getGalleryType(parseInt(event.target.value));
    this.loadData();
  }

  deleteIMG(e, img: Imagen) {
    e.preventDefault();
    if (confirm('¿Seguro quieres eliminar esta imagen?')) {

      this._bestService.removeDataImage(img.path,img.key)
        .then(_ => {
          this._bestService.deleteGalleryImage(img.path, img.name)
          .then(()=>this.sendMessage("Ok , imagen eliminada")).catch(err=>console.error('error al elimninar imagen ',err));
        })
        .catch(err => console.log(err, 'You do not have access!')); 
    }

  }

  uploadImage(e) {
    e.preventDefault();

    if (!this.imageFiles.length) {
      this.sendMessage("No hay imagenes")
      return;
    }
    let uid = this.help.randomName();
    let ext = this.help.getExtension(this.imageFiles[0].name);
    let name = uid + '_' + this.selectedTypeStr + ext;
    this.progress = 0;
    const uploadTask = this._bestService.getstoregeRef().child(`${this.selectedTypeStr}/${name}`)
      .put(this.imageFiles[0]);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {

      this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    }, error => console.error(error),
      () => {

        let imagen = new Imagen();
        imagen.name = uploadTask.snapshot.metadata.name;
        imagen.url = uploadTask.snapshot.downloadURL;
        imagen.type = this.selectedType;
        imagen.path = this.selectedTypeStr;
        imagen.createdAt = new Date();
        console.log(this.selectedTypeStr)

        this._bestService.addDataImage(this.selectedTypeStr,imagen).then((image) => {
          image.update({ key: image.key });
        });
        

        this.loadData();
        this.resetForm(e);
        this.sendMessage(`Ok imagen añadida a la galeria ${this.selectedTypeStr}`);
      }) 

  }

  imageSelect(img: Imagen) {
    this.selectedImage = img;
  }

  resetForm(e) {
    e.preventDefault();
    this.preview = "../../../assets/img/logo.png";
    let form = this.formIMG.nativeElement;
    form.reset();
  }

  sendMessage(msg: string) {
    this.message = "";
    this.message = msg;
  }

}
