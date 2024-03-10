import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MovieFull } from 'src/app/models/movie';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.css']
})
export class DetailsPostComponent implements OnInit {
  imdbID: string = '';
  errorRequestsMessage: string = '';
  loading: boolean = false;
  errorRequests: boolean = false;
  movieDetails: MovieFull | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;
      this.imdbID = params['imdbID'];
      this.getMovieDetails();
    });
  }

  getMovieDetails(): void {
    
    this.apiService.getMovieDetails(this.imdbID)
      .pipe(
        catchError(error => {
          this.loading = false;
          this.errorRequests = true;
          this.errorRequestsMessage = error.message;
          return throwError(error); // Repassa o erro para ser tratado posteriormente
        })
      )
      .subscribe(movie => {
        this.loading = false;
        this.movieDetails = movie;
      });
  }

  closEerrorRequestsMessage() {
    this.errorRequests = false;
    this.errorRequestsMessage = '';
    this.router.navigate(['/']);
  }

  voltarParaHome() {
    this.router.navigate(['/']);
  }
}
