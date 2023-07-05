import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicamento, MedicamentoInfo } from './medicamento';
import { Component } from '@angular/core';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent {
  medicamentos: Medicamento[];
  headers: any;  
  name: string = "";
  category: string = "";
  anvisaCode: string = "";

  private apiUrl = 'https://localhost:7131/api/Medications';

  constructor(private http: HttpClient) {
    this.medicamentos = [];
    this.headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${localStorage.getItem("token")}`
    });
  }

  ngOnInit() {
    this.getMedicamentosList();
  }

  getMedicamentosList(): void {
    this.http.get<Medicamento[]>(this.apiUrl).subscribe((result: Medicamento[]) => this.medicamentos = result)
  }

  criarMedicamento(): void {
    if(!this.name || !this.anvisaCode || !this.category) {return;}
    const medicamento: MedicamentoInfo = {
      name: this.name,
      anvisaCode: this.anvisaCode,
      category: this.category
    }
    this.http.post<Medicamento>(this.apiUrl, medicamento, {headers: this.headers})
      .subscribe(() => this.getMedicamentosList())
  }

  deletarMedicamento(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`, {headers: this.headers})
    .subscribe(() => this.getMedicamentosList());
  }

}
