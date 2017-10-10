import {Component, OnInit } from '@angular/core';

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

  myMedia: any[] = [];



  constructor(private mediaService: MediaApiService) { }

  ngOnInit() {
        this.mediaService.getMyMedia()
          .subscribe((listOfMyMedia:any[]) => {
              this.myMedia = listOfMyMedia;
            },
            (errInfo) =>{
              if (errInfo.status === 401){
                this.errorMessage = 'You need to be logged in';
              }
              else{
                this.errorMessage = 'Something went wrong. Try again later';
              }
            }

          );

  } // ngOnInit{}



  // deleteClick(){
  //     this.mediaService.deleteMedia(this.myMedia._id)
  //       .subscribe(
  //         () => this.routerService.navigate['/profile']
  //       );
  // } //deleteClick{}


  showForm(){
    this.isFormOn = !this.isFormOn;
  }

  handleNewMedia(theMedia){
    this.myMedia.unshift(theMedia);
    this.isFormOn = false;
  }


}
