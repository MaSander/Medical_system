import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medico, MedicoInfo } from './medico';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})

export class MedicosComponent {
  headers: any;
  medicos: Medico[] = [];
  name: string = '';
  crm: string = '';


  private apiUrl = 'https://localhost:7131/api/Doctors1';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${localStorage.getItem("token")}`
    });
  }

  ngOnInit() {
    this.getMedicoList();
  }

  getMedicoList(): void {
    this.http.get<Medico[]>(this.apiUrl).subscribe((result: Medico[])=> this.medicos = result);
  }

  criarMedico(): void {
    if (!this.name || !this.crm) { return; }
    const medico: MedicoInfo = { name: this.name, crm: this.crm };
    this.http.post<Medico>(this.apiUrl, medico, {headers: this.headers})
      .subscribe(() => {
        this.getMedicoList();
        this.name = '';
        this.crm = '';
      });
  }

  deletarMedico(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`, {headers: this.headers})
      .subscribe(() => this.getMedicoList());
  }
}
