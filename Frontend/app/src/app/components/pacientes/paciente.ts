export interface Paciente {
  id: number;
  name: string;
  cpf: string;
  dateOfBirth: Date;
}

export interface PacienteInfo {
  name: string;
  cpf: string;
  dateOfBirth: string;
}