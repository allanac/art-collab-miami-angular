import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessagesInfo } from '../../interfaces/messages-info';

import {MessagesApiService} from '../../services/messages-api.service';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-send-messages',
  templateUrl: './send-messages.component.html',
  styleUrls: ['./send-messages.component.css']
})
export class SendMessagesComponent implements OnInit {

  messagesList: any = [];
  newMessage: MessagesInfo = {
    messageBody: ''
  }
  errorMessage: string;
  recipientId:string;

  constructor( private activatedService: ActivatedRoute,
               private messageService:MessagesApiService) { }

  ngOnInit() {
    this.activatedService.params.subscribe((myParams) => {
      this.recipientId = myParams.recipientId;
      this.messageService.getUserMessages(myParams.recipientId)
      .subscribe(
        (theMessagesFromApi) => {this.messagesList = theMessagesFromApi;}
      );
    });
  }

  postNewMessage (){
    this.activatedService.params.subscribe((myParams) => {
      this.messageService.postNewMessage(myParams.recipientId, this.newMessage)
        .subscribe(
            (theMessagesFromApi) =>
                {this.messagesList.push(theMessagesFromApi)

                  this.errorMessage = '';
                  this.newMessage = {
                    messageBody: ''
                };
              },
              (errorInfo) => {
              console.log(errorInfo);

              if(errorInfo.status === 400){
                  this.errorMessage = 'Validation Error.';
              }
              else{this.errorMessage = "Unknown error. Try again Later"}
          }
      );//subscribe
    });
  } //postNewMessage
}
