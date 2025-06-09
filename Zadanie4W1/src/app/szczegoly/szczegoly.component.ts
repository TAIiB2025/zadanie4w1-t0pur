import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Ksiazka } from '../../models/ksiazka';
import { ListaService } from '../lista.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-szczegoly',
  imports: [CommonModule, RouterLink],
  templateUrl: './szczegoly.component.html',
  styleUrl: './szczegoly.component.css'
})
export class SzczegolyComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  public obiekt?: Ksiazka;
  private readonly listaService = inject(ListaService);
  private readonly router = inject(Router);

  private id!: number;

  constructor() {
    this.id = +(this.activatedRoute.snapshot.paramMap.get('id') ?? 0);
    this.listaService.getByID(this.id).subscribe(k => this.obiekt = k);
  }

  onUsunClick(): void {
    this.listaService.delete(this.id).subscribe({next: () => {
      this.router.navigateByUrl('');
    }, error: (err) => console.error("wystąpił problem z usunięciem: ", err)})
  }
}
