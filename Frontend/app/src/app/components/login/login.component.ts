import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface JwToken {
    token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  headers: any;

  private apiUrl = 'https://localhost:7131/api/auth/login';

  constructor(
    private http: HttpClient,
    private router:Router) {
    this.headers = new HttpHeaders({'Content-Type':'application/json'});
  }

  login(): void {
    this.http.post<JwToken>(this.apiUrl,
    {
      username: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }, {headers: this.headers})
    .subscribe(result =>
    {
      alert("Logado")
      localStorage.setItem('token', result.token)
      this.router.navigate(['Receitas'])
    })
  }
}