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

}
