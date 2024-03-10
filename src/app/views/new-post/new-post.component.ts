import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
import { MovieShort } from 'src/app/models/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  searchResults: MovieShort[] = [];
  searchTerm: string = '';
  movieExistsDBMessage: string = '';
  movieNotFoundMessage: string = '';
  errorRequestsMessage: string = '';
  errorMessage: string = '';
  loading = false;
  movieExistsDB: boolean = false;
  movieNotFound: boolean = false;
  errorRequests: boolean = false;

  constructor(
    private apiService: ApiService,
    private dbService: DbService,
    private router: Router
  ) {}

  searchMovies() {
    this.loading = true;
    if (this.searchTerm.trim() !== '') {
      this.apiService.searchMovies(this.searchTerm).subscribe(
        (results) => {
          if (results != undefined) {
            this.searchResults = results;
            this.loading = false;
          } else {
            this.loading = false;
            this.movieNotFound = true;
            this.movieNotFoundMessage = 'Filme não encontrado';
          }
          this.searchTerm = '';
        },
        (error) => {
          this.loading = false;
          this.errorRequests = true;
          this.errorRequestsMessage = error.message;
          this.searchTerm = '';
        }
      );
    }
  }

  addMovieToDb(movie: MovieShort) {
    this.loading = true;
    this.closEerrorRequestsMessage();
    this.dbService.getMovieById(movie.imdbID).subscribe((exists) => {
      if (exists) {
        this.loading = false;
        this.movieExistsDB = true;
        this.movieExistsDBMessage = 'Filme existente na base de dados!';
        return;
      } else {
        this.dbService.postMovie(movie).subscribe(
          () => {
            this.router.navigate(['/']);
            console.log('Movie added successfully');
          },
          (error) => {
            this.loading = false;
            this.errorRequests = true;
            this.errorRequestsMessage = error.message;
          }
        );
      }
    });
  }

  closeMovieExistsDBMessage() {
    this.movieExistsDB = false;
    this.movieExistsDBMessage = '';
  }

  closeMmovieNotFoundMessage() {
    this.movieNotFound = false;
    this.movieNotFoundMessage = '';
  }

  closEerrorRequestsMessage() {
    this.errorRequests = false;
    this.errorRequestsMessage = '';
  }
}
