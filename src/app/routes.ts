import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { InicioComponent } from './inicio/inicio.component'
import { BlogComponent } from './blog/blog.component'
import { NotfoundComponent } from './partials/notfound/notfound.component'
import { NewArticleComponent } from './admin/newarticle/newarticle.component'
import { ArticlelistComponent } from './admin/articlelist/articlelist.component'
import { ArticleDetailComponent } from './partials/article-detail/article-detail.component'
import { GalleryComponent } from './admin/gallery/gallery.component'
import { LoginComponent } from './login/login.component'
import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
    { path: '', component: InicioComponent},
    { path: 'home', component: InicioComponent},
    { path: 'home/:id', component: InicioComponent}, 
    { path: 'login', component: LoginComponent }, 
    { path: 'blog', component: BlogComponent },
    { path: 'article/:id', component: ArticleDetailComponent},
    { path: 'admin/new', component: NewArticleComponent ,canActivate:[AuthGuardService]},
    { path: 'admin/edit/:id', component: NewArticleComponent ,canActivate:[AuthGuardService]},
    { path: 'admin/list', component: ArticlelistComponent ,canActivate:[AuthGuardService]},
    { path: 'admin/gallery', component: GalleryComponent ,canActivate:[AuthGuardService]},
    { path: '**', component: NotfoundComponent, data : {islist : false}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule {}
