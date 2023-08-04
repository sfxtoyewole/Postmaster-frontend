import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { environment } from 'src/environments/environment';
import { SignInReq, SignUpReq } from '../model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated(): boolean {
    return localStorage.getItem('Authorization') != null;
  }
  constructor(private restService: RestService) {}

  signIn(signRequest: SignInReq) {
    const url =
      environment.baseUrl + environment.contextPath + '/access/signin';

    return this.restService.handlePostRequest(url, signRequest);
  }
  signUp(signUpReq: SignUpReq) {
    const url =
      environment.baseUrl + environment.contextPath + '/access/signup';

    return this.restService.handlePostRequest(url, signUpReq);
  }
}
