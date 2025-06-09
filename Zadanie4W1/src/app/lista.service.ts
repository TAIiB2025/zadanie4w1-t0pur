import { Injectable } from '@angular/core';
import { Ksiazka } from '../models/ksiazka';
import { Observable, of } from 'rxjs';
import { KsiazkaBody } from '../models/ksiazka-body';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private static idGen = 1;

  private lista: Ksiazka[] = [
    { id: ListaService.idGen++, tytul: "Zbrodnia i kara", autor: "Fiodor Dostojewski", gatunek: "Powieść psychologiczna", rok: 1866 },
    { id: ListaService.idGen++, tytul: "Pan Tadeusz", autor: "Adam Mickiewicz", gatunek: "Epopeja narodowa", rok: 1834 },
    { id: ListaService.idGen++, tytul: "Rok 1984", autor: "George Orwell", gatunek: "Dystopia", rok: 1949 },
    { id: ListaService.idGen++, tytul: "Wiedźmin: Ostatnie życzenie", autor: "Andrzej Sapkowski", gatunek: "Fantasy", rok: 1993 },
    { id: ListaService.idGen++, tytul: "Duma i uprzedzenie", autor: "Jane Austen", gatunek: "Romans", rok: 1813 }
  ];

  get(): Observable<Ksiazka[]> {
    return of(this.lista);
  }

  getByID(id: number): Observable<Ksiazka> {
    const ksiazka = this.lista.find(k => k.id === id);
    if(ksiazka == null) {
      throw new Error('Nie znaleziono wskazanej książki');
    }
    return of(ksiazka);
  }

  delete(id: number): Observable<void> {
    this.lista = this.lista.filter(k => k.id !== id);
    return of(undefined);
  }

  put(id: number, body: KsiazkaBody): Observable<void> {
    const ksiazka = this.lista.find(k => k.id === id);
    if(ksiazka == null) {
      throw new Error('Nie znaleziono wskazanej książki');
    }

    ksiazka.autor = body.autor;
    ksiazka.gatunek = body.gatunek;
    ksiazka.rok = body.rok;
    ksiazka.tytul = body.tytul;

    return of(undefined);
  }

  post(body: KsiazkaBody): Observable<void> {
    const ksiazka: Ksiazka = {
      id: ListaService.idGen++,
      autor: body.autor,
      gatunek: body.gatunek,
      rok: body.rok,
      tytul: body.tytul
    };

    this.lista.push(ksiazka);

    return of(undefined);
  }
}
