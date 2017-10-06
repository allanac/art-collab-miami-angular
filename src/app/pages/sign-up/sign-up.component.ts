import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthorizeApiService} from '../../services/authorize-api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUser = {
    signupUsername: '',
    signupPassword:''
  }

  errorMessage: string;

  constructor(private authorize:AuthorizeApiService,
              private router:Router) { }

  ngOnInit() {
  }

  signupSubmit(){
      this.authorize.signupPost(this.newUser)
        .subscribe(
          (userInfo) => {this.router.navigate(['']);},
          (errInfo) =>{
              if(errInfo.status === 400){
                  this.errorMessage = 'Validation error'
              }
              else{
                  this.errorMessage="Something went wrong. Try again"
              }
          }
        ); //subscribe()
  } //signupSubmit()

}
