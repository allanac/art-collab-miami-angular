import { Component, OnInit } from '@angular/core';
import { AuthorizeApiService } from '../services/authorize-api.service';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  userInfo: any;

  constructor(private authService: AuthorizeApiService,
              private routerService: Router) { }

  ngOnInit() {
    this.authService.getLoginStatus()
    
    this.authService.loginStatusNotifier
      .subscribe((loggedInInfo: any) => {
          if(loggedInInfo.isLoggedIn){
            this.userInfo = loggedInInfo.userInfo;
          }
      }); // subscribe();
  }

  logMeOut(){
    // call log out API method
    this.authService.logOut()
    //subscribe to AJAX call
    .subscribe((apiResponse) => {this.routerService.navigate(['/login'])});
    //if success, redirect to login

  }

}
