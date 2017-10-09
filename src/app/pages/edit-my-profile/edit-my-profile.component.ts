import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { UserProfile } from '../../interfaces/user-profile';
import { ProfileApiService } from '../../services/profile-api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.css']
})

export class EditMyProfileComponent implements OnInit {

  // CLASS COMPONENT VARIABLES BEGIN ------------------//
  imageDomain = environment.apiUrl;


  errorMessage: string;

  myUploader = new FileUploader({
    url: environment.apiUrl + '/api/profile',
    itemAlias: 'userImage'
  });

  myProfile: any = {
    userPic:'',
    userFullName: '',
    userArtForm:'',
    userGenre: '',
    userCollabStyle: '',
    userBio: "",
    userArtTools: ['']
  };

  @Output() saveMyProfileNotifier = new EventEmitter();
 // -------------- CLASS component VARIABLES END ------//

  constructor(
    private profileService: ProfileApiService) { }

  ngOnInit() { }

    editMyProfile() {
      if(this.myUploader.getNotUploadedItems().length > 0) {
        this.saveMyProfileWithImage();
      }
      else {
        this.saveMyProfileNoImage();
      }
    } // updateMyProfile ()


    saveMyProfileWithImage (){
      this.myUploader.onBuildItemForm = (item, form) => {
          form.append('userFullName', this.myProfile.userFullName);
          form.append('userGenre', this.myProfile.userGenre);
          form.append('userArtForm', this.myProfile.userArtForm);
          form.append('userArtTools', this.myProfile.userArtTools);
          form.append('userCollabStyle', this.myProfile.userCollabStyle);
          form.append('userBio', this.myProfile.userBio);
      }; //onBuildItemForm

      this.myUploader.onSuccessItem = (item, response) => {
        const userProfileDetails = JSON.parse(response);
        console.log('Successfuly Updated Profile', userProfileDetails);

        this.saveMyProfileNotifier.emit(userProfileDetails);

        this.errorMessage ='';
        this.myProfile = {
          userPic:'',
          userFullName: '',
          userGenre: '',
          userArtForm:'',
          userCollabStyle: '',
          userArtTools: [''],
          userBio: ''
        };
      }; //onSuccessItem
      this.myUploader.onErrorItem = (item, response) => {
        console.log('Save Profile Error', response);

        this.errorMessage = "Unknown Error. Try again later"
      }; //onErrorItem

      //Start AJAX Request
        this.myUploader.uploadAll();
    } // myProfileWithImage() --- END

    saveMyProfileNoImage(){
        this.profileService.editMyProfile(this.myProfile)
          .subscribe(
             (userProfileDetails) => {
                console.log('Save Profile Success', userProfileDetails);
                // notifity the parent about the update to profile through the output??
                this.saveMyProfileNotifier.emit(userProfileDetails);

                this.errorMessage = '';
                this.myProfile = {
                  userPic: '',
                  userFullName: '',
                  userGenre: '',
                  userArtForm:'',
                  userCollabStyle: '',
                  userBio: '',
                  userArtTools: ['']
                };
             }, // userProfileDetails()

             //Error
             (errorInfo) => {
                console.log(errorInfo);

                if(errorInfo.status === 400){
                  this.errorMessage='Validation Error.';
                }
                else {this.errorMessage = 'Unknown error. Try again later'
                }

             } //errorInfo
          ); // subscribe()
    } //myProfileNoImage
} //component()
