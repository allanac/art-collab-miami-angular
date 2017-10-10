import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {MediaInfo} from '../interfaces/media-info';
import {environment} from '../../environments/environment';

@Injectable()
export class MediaApiService {

  baseUrl: string = environment.apiUrl;

  constructor(private httpService: HttpClient) { }


  // ---------- POST /api/media --------- //
  postMedia(mediaFields: MediaInfo){
    return this.httpService.post(this.baseUrl + '/api/media/', mediaFields, {withCredentials:true});
  }

  // GET /api/media ----(latest media) //

  getAllMedia(){
    return this.httpService.get(this.baseUrl + '/api/media/', {withCredentials:true});
  }

// GET my MEDIA /api/media/:id
  getMyMedia(){
    return this.httpService.get(this.baseUrl + '/api/mymedia/', {withCredentials: true});
  }

  // ---------- GET /API/MEDIA/POPULAR --------- (popular) //
  getPopularMedia(){}

  // ---------- GET /API/MEDIA/SEARCH --------- (search) //
  getSearchMedia() {}


  // ---------- POST /API/MEDIA/:id/like --------- (isLiked) //
  postLikeOnMedia(){}

  // ---------- DELETE /API/MEDIA/:mediaId --------- //
  deleteMedia(mediaId: string){
    return this.httpService.delete(this.baseUrl + '/api/media/' + mediaId, {withCredentials: true});
  }

}
