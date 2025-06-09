import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaService } from '../lista.service';
import { FormsModule, NgForm } from '@angular/forms';
import { KsiazkaBody } from '../../models/ksiazka-body';

@Component({
  selector: 'app-formularz',
  imports: [FormsModule],
  templateUrl: './formularz.component.html',
  styleUrl: './formularz.component.css'
})
export class FormularzComponent {
  public ksiazkaBody: KsiazkaBody = {
    autor: '',
    gatunek: '',
    rok: 2025,
    tytul: ''
  };

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly listaService = inject(ListaService);
  private readonly router = inject(Router);
  private id?: number = undefined;

  constructor() {
    const urlID = this.activatedRoute.snapshot.paramMap.get('id');
    if(urlID != null) {
      this.id = +urlID;
      this.listaService.getByID(this.id).subscribe(res => {
        this.ksiazkaBody.autor = res.autor;
        this.ksiazkaBody.gatunek = res.gatunek;
        this.ksiazkaBody.rok = res.rok;
        this.ksiazkaBody.tytul = res.tytul;
      });
    }
  }

  onSubmit(form: NgForm): void {
    if(this.id != null) {
      this.listaService.put(this.id, this.ksiazkaBody).subscribe({
        next: () => this.router.navigateByUrl(''),
        error: (err) => console.error("wystąpił problem z edycją: ", err)
      })
    } else {
      this.listaService.post(this.ksiazkaBody).subscribe({
        next: () => this.router.navigateByUrl(''),
        error: (err) => console.error("wystąpił problem z dodawaniem: ", err)
      })
    }
  }

  onAnuluj(): void {
    this.router.navigateByUrl('');
  }
}
