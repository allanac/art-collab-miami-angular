import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthorizeApiService} from '../../services/authorize-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser = {
    loginUsername: '',
    loginPassword: ''
  }


  loginError: string;

  constructor(private authorize: AuthorizeApiService,
              private router:Router) { }

  ngOnInit() {
  }

  loginSubmit() {
    this.authorize.loginPost(this.loginUser)
      .subscribe(
        (userInfo) => {this.router.navigate(['']);},
        (errInfo) => {
          console.log('Log in error', errInfo);
          if(errInfo.status === 401){
            this.loginError = 'Bad credentials';
          }
          else {
            this.loginError = 'Something went wrong. Try again later';
          }
        }
      ); //.subscribe()
  } //loginSubmit()

}
