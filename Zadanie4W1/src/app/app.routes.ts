import { Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { FormularzComponent } from './formularz/formularz.component';
import { SzczegolyComponent } from './szczegoly/szczegoly.component';

export const routes: Routes = [
    { path: '', component: ListaComponent },
    { path: 'form', component: FormularzComponent },
    { path: ':id', component: SzczegolyComponent },
    { path: ':id/form', component: FormularzComponent },
];
