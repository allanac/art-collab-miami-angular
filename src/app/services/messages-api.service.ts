import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {MessagesInfo} from '../interfaces/messages-info';
import {environment} from '../../environments/environment';

@Injectable()
export class MessagesApiService {

  baseUrl: string = environment.apiUrl;

  constructor(private httpService: HttpClient) { }

  // GET /api/messages
  getAllConversations(){
    return this.httpService.get(this.baseUrl + '/api/messages', {withCredentials:true});
  }
  // GET /api/messages/:recipient
  getUserMessages(recipientId: string){
      return this.httpService.get(this.baseUrl + '/api/messages/' + recipientId, {withCredentials:true});
  }
  // POST /api/messages/:recipient/
  postNewMessage(recipientId:string, messages: MessagesInfo) {
    return this.httpService.post(
      this.baseUrl + `/api/messages/${recipientId}` , messages, {withCredentials:true}
    );
  }
}
