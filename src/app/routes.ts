import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { InicioComponent } from './inicio/inicio.component'
import { BlogComponent } from './blog/blog.component'
import { NotfoundComponent } from './partials/notfound/notfound.component'
import { BlogpanelComponent } from './admin/blogpanel/blogpanel.component'
import { BlogpanelListComponent } from './admin/blogpanellist/blogpanellist.component'
import { ArticleDetailComponent } from './partials/article-detail/article-detail.component'
import { AuthMilderwareService } from './services/auth-milderware.service'

const routes: Routes = [
    { path: '', component: InicioComponent},
    { path: 'home', component: InicioComponent},
    { path: 'home/:id', component: InicioComponent}, 
    { path: 'blog', component: BlogComponent },
    { path: 'article/:id', component: ArticleDetailComponent},
    { path: 'admin/new', component: BlogpanelComponent, canActivate:[AuthMilderwareService] },
    { path: 'admin/edit/:id', component: BlogpanelComponent, canActivate:[AuthMilderwareService] },
    { path: 'admin/list', component: BlogpanelListComponent, canActivate:[AuthMilderwareService] },
    { path: '**', component: NotfoundComponent, data : {islist : false}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule {}
