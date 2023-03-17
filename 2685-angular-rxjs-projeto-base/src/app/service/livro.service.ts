import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  getBooks(valueDigit: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', valueDigit);
    return this.http.get<LivrosResultado>(this.API, { params })/* .pipe(
      tap((retorno) => console.log(retorno)),
      map((value) => {
         return value.items ?? []
      }),
      tap(resultado => console.log('Resultado ', resultado))
    ) */
  }
}
