import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3000/users/register';
const URLlogin = 'http://localhost:3000/users/login';
const URLlogout = 'http://localhost:3000/users/logout';

@Injectable()
export class AuthorizationService {

  loggedIn = false;

  constructor(private httpClient: HttpClient) { }

  registerNewUser(user: User): Observable<User> {
    console.log('registerNewUser:' + user);
    return this.httpClient.post<User>(URL, user);
  }

  loginUser(user: User): void {
    console.log('loginUser:' + JSON.stringify(user));
    this.httpClient.post<User>(URLlogin, user).subscribe({
      next: (data) => { console.log(); },
      error: (err) => {
        console.log(err.status);
        console.log(JSON.stringify(err));
      },
      complete: () => {
        console.log('user logged in');
        this.loggedIn = true;
      }
    });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

}
