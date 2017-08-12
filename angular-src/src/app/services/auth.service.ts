import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    authToken: any;
    user: any;

  constructor(private http: Http) { }

  registerUser(user){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    //   return this.http.post('https://meanauthapp-smrcct.c9users.io:8080/users/register', user, {headers: headers})
      return this.http.post('users/register', user, {headers: headers})
      .map(res => res.json());
  }
    
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('https://meanauthapp-smrcct.c9users.io:8080/users/authenticate', user, {headers: headers})
    return this.http.post('users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }
  
   getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    // return this.http.get('https://meanauthapp-smrcct.c9users.io:8080/users/profile', {headers: headers})
    return this.http.get('users/profile', {headers: headers})
    .map(res => res.json());
  }
  
   storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user)); //localstorage only for string cannot store JSON obj
    this.authToken = token;
    this.user = user;
  }
  
  loadToken(){
   const token = localStorage.getItem('id_token');
   this.authToken = token;
  }
  
  loggedIn(){
    return tokenNotExpired('id_token');
  }
  
  logout() {
    localStorage.clear();
    this.authToken = null;
    this.user = null;
  }

}
