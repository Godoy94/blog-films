import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { MovieShort } from 'src/app/models/movie';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  movies: MovieShort[] = [];
  loading: boolean = false;
  errorRequests: boolean = false;
  errorRequestsMessage: string = '';

  constructor(
    private dbService: DbService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.loading = true;
    this.dbService.getMovies().subscribe(
      (movies) => {
        console.log(movies);
        this.movies = movies;
        this.loading = false; 
      },
      (error: HttpErrorResponse) => {
        console.error('Error getting movies:', error);
        this.loading = false; 
        this.errorRequests = true; 
        this.errorRequestsMessage = error.message;
      }
    );
  }

  deletePost(id: string) {
    this.loading = true;
    this.http.delete(`http://localhost:3000/posts/${id}`).subscribe(
      () => {
        setTimeout(() => {
          this.getMovies();
        }, 1500);
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting post:', error.status, error.statusText);
        this.loading = false; 
        this.errorRequests = true; 
        this.errorRequestsMessage = error.message;
      }
    );
  }

  navigateToDetails(imdbID: string) {
    this.router.navigate(['/details-post', imdbID]);
  }

  closEerrorRequestsMessage() {
    this.errorRequests = false;
    this.errorRequestsMessage = '';
  }
}
