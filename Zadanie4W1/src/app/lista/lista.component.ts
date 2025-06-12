import { Component, inject } from '@angular/core';
import { ListaService } from '../lista.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Ksiazka } from '../../models/ksiazka';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  private readonly listaService = inject(ListaService);
  public dane$: Observable<Ksiazka[]> = this.listaService.get();
  public fraza: string = '';

  constructor() {}

  onSzukaj(): void {
    this.dane$ = this.listaService.get(this.fraza);
  }

  onWyczysc(): void {
    this.fraza = '';
    this.dane$ = this.listaService.get();
  }
}
