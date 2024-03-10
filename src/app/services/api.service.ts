import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MovieShort, MovieFull } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://www.omdbapi.com';
  private apiKey = '2b2fccd0';

  constructor(private http: HttpClient) {}

  searchMovies(searchTerm: string): Observable<MovieShort[]> {
    return this.http
      .get(`${this.apiUrl}?s=${searchTerm}&apikey=${this.apiKey}`)
      .pipe(map((response: any) => response.Search));
  }

  getMovieDetails(imdbID: string): Observable<MovieFull> {
    const url = `${this.apiUrl}?i=${imdbID}&apikey=${this.apiKey}`;
    return this.http.get<MovieFull>(url);
  }
}
