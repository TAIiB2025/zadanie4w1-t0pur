import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ksiazka } from '../models/ksiazka';
import { KsiazkaBody } from '../models/ksiazka-body';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private readonly url = 'http://localhost:5013/api/ksiazki';

  constructor(private http: HttpClient) {}

  get(fraza?: string): Observable<Ksiazka[]> {
    let params = new HttpParams();
    if (fraza) {
      params = params.set('fraza', fraza);
    }
    return this.http.get<Ksiazka[]>(this.url, { params });
  }

  getByID(id: number): Observable<Ksiazka> {
    return this.http.get<Ksiazka>(`${this.url}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  put(id: number, body: KsiazkaBody): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, body);
  }

  post(body: KsiazkaBody): Observable<void> {
    return this.http.post<void>(this.url, body);
  }
}
