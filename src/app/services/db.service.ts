import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MovieShort } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private baseUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<MovieShort[]> {
    return this.http.get<MovieShort[]>(this.baseUrl);
  }

  postMovie(movie: MovieShort): Observable<MovieShort> {
    return this.http.post<MovieShort>(this.baseUrl, movie);
  }

  getMovieById(id: string): Observable<MovieShort | null> {
    return this.http.get<MovieShort[]>(`${this.baseUrl}?imdbID=${id}`).pipe(
      map((movies: MovieShort[]) => {
        const movie = movies.find((m) => m.imdbID === id);
        return movie ? movie : null;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }
}
