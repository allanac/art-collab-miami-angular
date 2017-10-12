import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { AuthorizeApiService } from '../../services/authorize-api.service';
import { MediaApiService } from '../../services/media-api.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-my-media',
  templateUrl: './my-media.component.html',
  styleUrls: ['./my-media.component.css']
})

export class MyMediaComponent implements OnInit {

  mediaDomain = environment.apiUrl;
  errorMessage: string;
  isFormOn = false;

  userInfo:any;
  myMedia: any = [];



  constructor(private mediaService: MediaApiService,
              private activatedService: ActivatedRoute,
              private authService: AuthorizeApiService,
              private routerService: Router) { }

  ngOnInit() {
        this.mediaService.getMyMedia()
          .subscribe((listOfMyMedia:any[]) => {
              this.myMedia = listOfMyMedia;
              console.log(listOfMyMedia);
            },
            (errInfo) =>{
              if (errInfo.status === 401){
                this.errorMessage = 'You need to be logged in';
              }
              else{
                this.errorMessage = 'Something went wrong. Try again later';
              }
            }

          );//subscribe()

          this.authService.getLoginStatus()
            .subscribe((loggedInInfo: any) => {
                if(loggedInInfo.isLoggedIn){
                  this.userInfo = loggedInInfo.userInfo;
                }
            }); // subscribe();

  } // ngOnInit{}



  deleteClick(mediaId){
      this.mediaService.deleteMedia(mediaId)
        .subscribe(
          () => {

            this.myMedia.forEach((oneCow) => {
                if(oneCow._id === mediaId){
                  let index = this.myMedia.findIndex(
                    i => i._id === mediaId
                  )
                  console.log(this.myMedia)
                  this.myMedia.splice(index, 1);
                  console.log(this.myMedia)
                }
            });

            this.routerService.navigate(['myprofile']);
          }
        ); // subscribe on delete ()

  } //deleteClick{}


  showForm(){
    this.isFormOn = !this.isFormOn;
  }

  handleNewMedia(theMedia){
    this.myMedia.unshift(theMedia);
    this.isFormOn = false;
  }


}
