import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { MediaInfo } from '../../interfaces/media-info';
import { MediaApiService } from '../../services/media-api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-media-form',
  templateUrl: './add-media-form.component.html',
  styleUrls: ['./add-media-form.component.css']
})

export class AddMediaFormComponent implements OnInit {

  // mediaDomain = environment.apiUrl;
  mediaDomain = '';
  errorMessage: string;
  @Output() newMediaNotifier = new EventEmitter();

  myUploader = new FileUploader({
      method: 'POST',
      url: environment.apiUrl + '/api/media',
      itemAlias: 'mediaFile'
  });

  newMedia: MediaInfo = {
    mediaTitle: '',
    mediaTeam: '',
    mediaStatus: '',
    mediaFile: '',
    mediaCategory: []
  };


  constructor(private mediaService: MediaApiService) { }

  ngOnInit() {
  }

  postMedia(){
    // console.log(this.newMedia.mediaCategory);
      this.myUploader.onBuildItemForm = (item,form) => {
          form.append('mediaTitle', this.newMedia.mediaTitle);
          form.append('mediaTeam', this.newMedia.mediaTeam);
          form.append('mediaStatus', this.newMedia.mediaStatus);
          this.newMedia.mediaCategory.forEach((oneCat) => {
            form.append('mediaCategory', oneCat);
          });
      }

      this.myUploader.onSuccessItem = (item,response) => {
          const fullMediaDetails = JSON.parse(response);
          console.log('New Media uploaded successfully', fullMediaDetails);

          this.newMediaNotifier.emit(fullMediaDetails);

          this.errorMessage ='';
          this.newMedia = {
            mediaTitle: '',
            mediaTeam: '',
            mediaStatus: '',
            mediaFile: '',
            mediaCategory: []
          };
      } //onSuccessItem()

      this.myUploader.onErrorItem = (item, response) => {
          console.log('New Media Error', response);

          this.errorMessage = ' Unknown Error. Try again later'
      };

      this.myUploader.uploadAll();
  } // postMedia {}


}
