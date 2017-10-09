import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {UserProfile} from '../interfaces/user-profile';
import {environment} from '../../environments/environment';

@Injectable()
export class ProfileApiService {

  baseUrl: string = environment.apiUrl;

  constructor(private httpService: HttpClient) { }

  // GET /api/profile
  getMyProfile() {
    return this.httpService.get(
      this.baseUrl + '/api/profile', {withCredentials:true}
    );
  }

  // PUT /api/profile/:userId ----- //
  editMyProfile(profileFields: UserProfile){
    return this.httpService.put(this.baseUrl + '/api/profile/' ,  profileFields, {withCredentials:true});
  }

  // DELETE /api/profile/ID
  deleteMyProfile(userId:string){
    return this.httpService.delete(this.baseUrl + '/api/profile/' + userId, {withCredentials:true});
  }

}
