import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private loginService: LoginService) { }

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        // handle successful login
      },
      (error) => {
        // handle login error
      }
    );
  }
}
