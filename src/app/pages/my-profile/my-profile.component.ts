import { Component, OnInit } from '@angular/core';

import { ProfileApiService } from '../../services/profile-api.service';
import { MediaApiService } from '../../services/media-api.service';
import { AuthorizeApiService } from '../../services/authorize-api.service';

import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  // imageDomain = environment.apiUrl;
  imageDomain = '';
  myProfile: any = { };
  errorMessage: string;

  userInfo:any;

  constructor(private profileService: ProfileApiService,
              private authService: AuthorizeApiService) { }

  ngOnInit() {
    this.profileService.getMyProfile()
      .subscribe((response) => {
        console.log("Response ---> ", response);
        this.myProfile = response;
      },
      (errInfo) => {
          if(errInfo.status == 401){
            this.errorMessage = "You need to be logged in.";
          }
          else{
            this.errorMessage = "Something went wrong. Try again later";
          }
      }); // .subscribe();

      this.authService.getLoginStatus()
        .subscribe((loggedInInfo: any) => {
            if(loggedInInfo.isLoggedIn){
              this.userInfo = loggedInInfo.userInfo;
            }
        }); // subscribe();

  } // ngOnInit{}

  logMeOut(){

  }

}
