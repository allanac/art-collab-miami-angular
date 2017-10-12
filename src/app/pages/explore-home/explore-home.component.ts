import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MediaApiService } from '../../services/media-api.service';
import {AuthorizeApiService} from '../../services/authorize-api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-explore-home',
  templateUrl: './explore-home.component.html',
  styleUrls: ['./explore-home.component.css']
})
export class ExploreHomeComponent implements OnInit {

  mediaDomain = environment.apiUrl;
  medias: any = [];
  userInfo:any = {};
  errorMessage: string;
  mySearchTerm: string;

  constructor(private mediaService: MediaApiService,
              private authService: AuthorizeApiService,
              private activatedService: ActivatedRoute) { }

  ngOnInit() {
      this.mediaService.getAllMedia()
        .subscribe((mediaFromApi:any[]) => {
            this.medias = mediaFromApi;
        }
      );//getAllMedia.subscribe()

      this.mediaService.getPopularMedia()
        .subscribe((popularMediaFromApi:any[]) => {
            this.medias = popularMediaFromApi;
        });

      this.authService.getLoginStatus()
        .subscribe(
          (loggedInInfo:any) => {
              if(loggedInInfo.isLoggedIn){
                this.userInfo = loggedInInfo.userInfo;
              }
          });//getLoginStatus.subscribe();

  } //ngOnInit


  getSearchMedia(){
      // this.activatedService.params.subscribe((myParams) => {
          // this.mySearchTerm.searchTerm = myParams.searchTerm;
          // console.log('My Params', myParams);
          this.mediaService.getSearchMedia(this.mySearchTerm)
          .subscribe(
            (theMediaListFromApi) =>

            (errorInfo) => {
              if(errorInfo.status === 400){
                this.errorMessage = 'Validation Error';
              }
              else{this.errorMessage = "Unknown error. Try again later"}
            }

        );//subscribe
      // }
    // );// subscribe()
  } // getSearchMedia()

}
