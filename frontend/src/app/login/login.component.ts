import { Component, OnInit } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { AuthorizationService } from '../authorization.service';
import { User } from '../user';
import { Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    email: '',
    address: '',
    password: ''
  };

  constructor(private httpClient: HttpClient, public authService: AuthorizationService) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.loginUser(this.user).subscribe({
      next: (data) => { console.log(); },
      error: (err) => {
        console.log(err.status);
        console.log(JSON.stringify(err));
      },
      complete: () => { console.log('user logged in'); }
    });
  }

}
