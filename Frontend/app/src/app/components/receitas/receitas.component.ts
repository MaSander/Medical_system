import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { jsPDF } from 'jspdf';

import { Paciente } from '../pacientes/paciente';
import { Medico } from '../medicos/medico';
import { Medicamento } from '../medicamentos/medicamento';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})
export class ReceitasComponent {
  headers: any;
  pacientes: Paciente[] = [];
  medicos: Medico[] = [];
  medicamentos: Medicamento[] = []; 
  remedios: string[] = [];
  remedio_qtd = 1;
  remedio = "";
  medicoId = 0;
  pacienteId = 0;

  private apiUrl = 'https://localhost:7131/api';

  constructor(private http: HttpClient){
    this.headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${localStorage.getItem("token")}`
    });
  }
  
  ngOnInit() {
    this.getAll()  
  }

  getAll() {
    this.http.get<Paciente[]>(`${this.apiUrl}/Patients`).subscribe((result: Paciente[]) => this.pacientes = result);
    
    this.http.get<Medico[]>(`${this.apiUrl}/Doctors1`).subscribe((result: Medico[])=> this.medicos = result);

    this.http.get<Medicamento[]>(`${this.apiUrl}/Medications`).subscribe((result: Medicamento[]) => this.medicamentos = result);
  }

  gerarReceita() {
    let pdf = new jsPDF();

    const dr = this.medicos.find(x => x.id == this.medicoId);
    const paciente = this.pacientes.find(x => x.id == this.pacienteId);

    pdf.text(`Dr. ${dr?.name}`, 10, 10);
    pdf.text("------------------------------", 10, 20);
    pdf.text(`paciente: ${paciente?.name} Data Nascimento: ${paciente?.dateOfBirth}`, 10, 30);
    pdf.text(`cpf: ${paciente?.cpf}`, 10, 40);
    pdf.text("------------------------------", 10, 50);
    pdf.text(this.remedios, 30, 80);
    pdf.save(`${paciente?.name}--${new Date}`);

    // alert(this.medico + "  |  " + this.paciente + "  |  " + this.remedios)
  }

  addRemedio() {
    this.remedios.push(`${this.remedio_qtd}X ${this.remedio}`);
  }
}
