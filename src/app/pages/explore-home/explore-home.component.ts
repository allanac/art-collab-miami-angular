import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MediaApiService } from '../../services/media-api.service';
import {AuthorizeApiService} from '../../services/authorize-api.service';
import { environment } from '../../../environments/environment';

import { WaveSurfer } from 'wavesurfer.js';
import { MinimapPlugin } from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import {TimelinePlugin} from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';

@Component({
  selector: 'app-explore-home',
  templateUrl: './explore-home.component.html',
  styleUrls: ['./explore-home.component.css']
})
export class ExploreHomeComponent implements OnInit {

  // mediaDomain = environment.apiUrl;

  mediaDomain = '';
  medias: any = [];
  userInfo:any = {};
  errorMessage: string;
  mySearchTerm: string;

  constructor(private mediaService: MediaApiService,
              private authService: AuthorizeApiService,
              private activatedService: ActivatedRoute,
              ) { }



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

  // waves = WaveSurfer;
  // wavesurfer: WaveSurfer = [];
  // WaveSurfer: WaveSurfer;
  options:any = [];
  wavesurfer: WaveSurfer;

  clickPlay(){
    this.wavesurfer.on(('ready'),() => {
      this.wavesurfer.play()
      this.wavesurfer.init({
        container:'#waveform',
        waveColor: 'grey',
      });
      this.wavesurfer.load('https://soundcloud.com/octobersveryown/remyboyz-my-way-rmx-ft-drake');
      this.wavesurfer.on('finish', function(){
        this.isPlaying = false;
      }.bind(this));
    });
  }
  // var
  // wavesurfer = Object.create(WaveSurfer);
  // wavesurfer.init(
  //
  //   { container:'#waveform',
  //     waveColor:'grey',
  //       plugins: [
  //             TimelinePlugin.create({
  //             container: '#wave-timeline'
  //         }),
  //         MinimapPlugin.create()]
  //     }
  //   );


    // let WaveSurfer = require('wavesurfer.js');
    // define (['WaveSurfer'], function(WaveSurfer){});
//     var wavesurfer = WaveSurfer.create({
//     container: '#waveform',
//     waveColor: 'violet',
//     plugins: [
//         TimelinePlugin.create({
//             container: '#wave-timeline'
//         }),
//         MinimapPlugin.create()
//     ]
// });

  //   this.theWavesurfer = this.WaveSurfer.create({
  //   container: '#waveform',
  //   waveColor: 'violet',
  //   progressColor:'purple'
  //  });

  //  let wavesurfer = Object.create(WaveSurfer);
  //  wavesurfer.init({
  //   container: '#waveform',
  //   waveColor: 'violet',
  //   progressColor: 'purple'
  // });

  // var wavesurfer = new WaveSurfer(this.options);
  // wavesurfer.init({
  //   container: '#waveform',
  //   waveColor: 'violet',
  //   progressColor: 'purple'
  // });

  //  console.log('WAve----------', this.wavesurfer)

  //  this.wavesurfer.on(('ready'),() => {this.wavesurfer.play()});
  //  this.wavesurfer.load('mediaDomain + medias.mediaFile');
  // }


  // getSearchMedia(){
  //     // this.activatedService.params.subscribe((myParams) => {
  //         // this.mySearchTerm.searchTerm = myParams.searchTerm;
  //         // console.log('My Params', myParams);
  //         this.mediaService.getSearchMedia(this.mySearchTerm)
  //         .subscribe(
  //           (theMediaListFromApi) =>
  //
  //           (errorInfo) => {
  //             if(errorInfo.status === 400){
  //               this.errorMessage = 'Validation Error';
  //             }
  //             else{this.errorMessage = "Unknown error. Try again later"}
  //           }
  //
  //       );//subscribe
  //     // }
  //   // );// subscribe()
  // } // getSearchMedia()



}
