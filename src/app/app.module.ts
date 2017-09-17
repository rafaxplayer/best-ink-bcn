import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelpersService } from './services/helpers.service'
import { FeatureRoutingModule } from './routes'
import { PagerService } from './services/pagination.service';
import { BestService } from './services/best.service';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { InicioComponent } from './inicio/inicio.component'
import { BlogComponent } from './blog/blog.component'
import { NotfoundComponent } from './partials/notfound/notfound.component'
import { BlogpanelComponent } from './admin/blogpanel/blogpanel.component'
import { BlogpanelListComponent } from './admin/blogpanellist/blogpanellist.component'
import { ArticleDetailComponent } from './partials/article-detail/article-detail.component'
import { CapitalizePipe } from './pipes/capitalize.pipe'
import { SinImagen } from './pipes/sinimagenes.pipe'
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ArticleListComponent } from './partials/article-list/article-list.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { AuthService } from './services/auth.service';
import { AuthMilderwareService } from './services/auth-milderware.service';
import { SearchComponent } from './partials/search/search.component';
import { EmailValidatorDirective } from './directives/email-validator.directive'
import { ScrollToModule } from 'ng2-scroll-to-el';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    BlogComponent,
    NotfoundComponent,
    BlogpanelComponent,
    BlogpanelListComponent,
    ArticleDetailComponent,
    CapitalizePipe,
    SinImagen,
    ArticleListComponent,
    DomseguroPipe,
    SearchComponent,
    EmailValidatorDirective
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDEI5U8tNnJj5g58PjVBXOeHk4jZSlP5dY'
    }),
    ScrollToModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    FeatureRoutingModule
      
  ],
  providers: [HelpersService, BestService, PagerService, AuthService, AuthMilderwareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
