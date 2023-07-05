import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Paciente, PacienteInfo } from './paciente';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {
  headers: any;
  pacientes: Paciente[] = [];
  name: string = '';
  cpf: string = '';
  dateOfBirth: Date = new Date();
  timeOfBirth: any;

  private apiUrl = 'https://localhost:7131/api/Patients';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${localStorage.getItem("token")}`
    });
  }

  ngOnInit() {
    this.getPacienteList();
  }

  getPacienteList(): void {
    this.http.get<Paciente[]>(this.apiUrl).subscribe((result: Paciente[]) => this.pacientes = result)
  }

  criarPaciente(): void {
    if (!this.name || !this.cpf || !this.dateOfBirth) {return;}
    const paciente: PacienteInfo = {
      name: this.name,
      cpf: this.cpf,
      dateOfBirth: `${this.dateOfBirth}T${this.timeOfBirth}:00.000Z`
    }
    this.http.post<Paciente>(this.apiUrl, paciente, {headers: this.headers})
    .subscribe(() => {
      this.getPacienteList();
      this.name = '';
      this.cpf = '';
    })
  }

  deletarPaciente(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`, {headers: this.headers})
    .subscribe(() => this.getPacienteList());
  }
}
