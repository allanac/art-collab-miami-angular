import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { ProfileApiService } from '../../services/profile-api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  imageDomain = environment.apiUrl;
  userProfile: any = {};
  errorMessage: string;

  constructor( private profileService: ProfileApiService,
               private activatedService: ActivatedRoute) { }

  ngOnInit() {
    this.activatedService.params.subscribe((myParams) => {
      this.profileService.getUserProfile(myParams.userId)
      .subscribe(
        (theUserFromApi) => {this.userProfile = theUserFromApi;}
      );
    });
  }



}
