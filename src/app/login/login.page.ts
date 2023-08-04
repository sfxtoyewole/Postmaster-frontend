import { Component, OnInit } from '@angular/core';
import { single } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiResp } from '../model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isSignInMode = true;
  isLoading = false;

  signUpData = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    localStorage.clear(); //
  }

  authenticate() {
    if (this.isSignInMode) {
      this.login();
    } else {
      this.signUp();
    }
  }
  signUp() {
    this.isLoading = true;
    this.authService
      .signUp({
        username: this.signUpData.name,
        email: this.signUpData.email,
        password: this.signUpData.password,
      })
      .subscribe(
        (resp) => {
          this.isLoading = false;
          this.handleSuccessfulAuthentication(resp);
        },
        (error) => {
          //TODO notify the user
          console.log(error);
          this.isLoading = false;
        }
      );
  }

  login() {
    this.isLoading = true;
    this.authService
      .signIn({
        username: this.signUpData.email,
        password: this.signUpData.password,
      })
      .subscribe(
        (resp) => {
          this.isLoading = false;
          this.handleSuccessfulAuthentication(resp);
        },
        (error) => {
          //TODO notify the user
          console.log(error);
          this.isLoading = false;
        }
      );
  }

  private handleSuccessfulAuthentication(resp: Object) {
    const response = resp as ApiResp<{ username: string; token: string }>;
    //Todo add an alert
    localStorage.setItem('Authorization', response.data.token);
    this.navCtrl.navigateForward('/home');
  }

  logout() {
    localStorage.clear();
  }

  changeMode() {
    console.log(this.isSignInMode);
    this.isSignInMode = !this.isSignInMode;
  }
}
