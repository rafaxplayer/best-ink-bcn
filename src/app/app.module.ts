import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelpersService } from './services/helpers.service'
import { FeatureRoutingModule } from './routes'
import { PagerService } from './services/pagination.service';
import { BestService } from './services/best.service';
import { FirebaseauthService } from './services/firebaseauth.service'
import { AuthGuardService } from './services/auth-guard.service'
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { InicioComponent } from './inicio/inicio.component'
import { BlogComponent } from './blog/blog.component'
import { NotfoundComponent } from './partials/notfound/notfound.component'
import { NewArticleComponent } from './admin/newarticle/newarticle.component'
import { ArticlelistComponent } from './admin/articlelist/articlelist.component'
import { ArticleDetailComponent } from './partials/article-detail/article-detail.component'
import { CapitalizePipe } from './pipes/capitalize.pipe'
import { SinImagenPipe } from './pipes/sinimagenes.pipe'
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ArticleListComponent } from './partials/article-list/article-list.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { SearchComponent } from './partials/search/search.component';
import { EmailValidatorDirective } from './directives/email-validator.directive'
import { GalleryComponent } from './admin/gallery/gallery.component';

import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment} from '../environments/environment';
const firebase={
  apiKey: "AIzaSyBgJq2DAqSYyLu8nzRjfX5ITwKV2DIntmM",
  authDomain: "bestink-aa3bf.firebaseapp.com",
  databaseURL: "https://bestink-aa3bf.firebaseio.com",
  projectId: "bestink-aa3bf",
  storageBucket: "bestink-aa3bf.appspot.com",
  messagingSenderId: "790637263438"
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    BlogComponent,
    NotfoundComponent,
    NewArticleComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    CapitalizePipe,
    SinImagenPipe,
    ArticlelistComponent,
    DomseguroPipe,
    SearchComponent,
    EmailValidatorDirective,
    GalleryComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDEI5U8tNnJj5g58PjVBXOeHk4jZSlP5dY'
    }),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    FeatureRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
      
  ],
  providers: [HelpersService, BestService, PagerService, FirebaseauthService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
