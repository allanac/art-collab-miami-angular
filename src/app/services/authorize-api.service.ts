import { Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import {environment} from '../../environments/environment';

class SignUpInfo {
  signupUsername: string;
  signupPassword: string
}

class LoginInfo {
  loginUsername: string;
  loginPassword: string;
}

@Injectable()
export class AuthorizeApiService {

  baseUrl: string = environment.apiUrl;

  loginStatusSubject = new BehaviorSubject<any>({ isLoggedIn:false });
  loginStatusNotifier = this.loginStatusSubject.asObservable();

  constructor(private httpService: HttpClient) { }

  // -------- POST/API/SIGNUP ---------//
  signupPost(userInfo:SignUpInfo){
    return (this.httpService.post(
        this.baseUrl + '/api/signup', userInfo, {withCredentials:true}
    )
      .do((userInfo) => {
        this.loginStatusSubject.next({
          isLoggedIn:true,
          userInfo:userInfo
        });
      }) //.do()
    ); //return ()
  } //signupPost()

  // -------- GET/API/CHECKLOGIN ---------//
  getLoginStatus(){
    return (this.httpService.get(
      this.baseUrl + '/api/checklogin', {withCredentials:true}
    )
      .do((loggedInInfo) => {
          this.loginStatusSubject.next(loggedInInfo);
      }) //.do()
    ); // return()
  } //getLoginStatus()

  // -------- POST/API/LOGIN ---------//
  loginPost(loginCredentials:LoginInfo){
    return (this.httpService.post(
      this.baseUrl + '/api/login', loginCredentials, {withCredentials:true}
    )
      .do((userInfo) => {
        this.loginStatusSubject.next({isLoggedIn:true, userInfo: userInfo});
      }) //.do()
    ) // return()
  } //loginPost()

  // -------- DELETE/API/LOGOUT ---------//
  logOut(){
    return (this.httpService.delete(
      this.baseUrl + '/api/logout', {withCredentials:true})

      .do(() => {
        this.loginStatusSubject.next({ isLoggedIn: false});
      }) //do()
    ) // return()
  } // logout()

}
