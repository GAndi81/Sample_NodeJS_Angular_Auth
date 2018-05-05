import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from '../authorization.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User = {
    username: '',
    email: '',
    address: '',
    password: ''
  };

  constructor(private httpClient: HttpClient,
    public authService: AuthorizationService) { }

  ngOnInit() {
  }

  registration(): void {
    this.authService.registerNewUser(this.user).subscribe({
      next: (user) => { console.log(JSON.stringify(user)); },
      error: (err) => {
        console.log(err.status);
        console.log(JSON.stringify(err));
      },
      complete: () => { console.log('registration completed'); }
    });
  }

}
