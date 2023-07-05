import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico, MedicoInfo } from './medico';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent {
  medicos: Medico[];
  nome: string;
  crm: string;
  idToken = localStorage.getItem("token");

  private apiUrl = 'https://localhost:7131/api/Doctors1';

  constructor(private http: HttpClient) {
    this.medicos = [];
    this.nome = '';
    this.crm = '';
  }



  ngOnInit() {
    this.getMedicoList();
  }

  getMedicoList(): void {
    console.log(this.idToken?.valueOf());
    this.http.get<Medico[]>(this.apiUrl).subscribe((result: Medico[])=>
    {
      this.medicos = result;
    });
  }

  criarMedico(): void {
    if (!this.nome || !this.crm) { return; }
    const medico: MedicoInfo = { name: this.nome, crm: this.crm };
    this.http.post<Medico>(this.apiUrl, medico)
      .subscribe(medicoCriado => {
        this.medicos.push(medicoCriado);
        this.nome = '';
        this.crm = '';
      });
  }

  deletarMedico(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => {
        this.getMedicoList()
      });
  }
}
