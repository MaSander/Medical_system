import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { ReceitasComponent } from './components/receitas/receitas.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'Medicos', component: MedicosComponent},
  {path: 'Pacientes', component: PacientesComponent},
  {path: 'Receitas', component: ReceitasComponent},
  {path:'Medicamentos', component: MedicamentosComponent},
  {path:'Login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
