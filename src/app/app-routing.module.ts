import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component'; 
import { NewPostComponent } from './views/new-post/new-post.component';
import { DetailsPostComponent } from './views/details-post/details-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-post', component: NewPostComponent },
  { path: 'details-post/:imdbID', component: DetailsPostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
