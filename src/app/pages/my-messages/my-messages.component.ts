import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessagesInfo } from '../../interfaces/messages-info';

import {MessagesApiService} from '../../services/messages-api.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})
export class MyMessagesComponent implements OnInit {

  myConversations: any[] = [];
  errorMessage: string;
  myMessages: any = {};
  newMessage: MessagesInfo = {
    messageBody: ''
  }

  constructor(private messageService: MessagesApiService,
              private activatedService: ActivatedRoute) { }

  ngOnInit() {
      this.messageService.getAllConversations()
        .subscribe((listOfConversations:any[]) => {
            this.myConversations = listOfConversations;
        },
        (errInfo) => {
          if(errInfo.status === 401) {
              this.errorMessage =" You need to be logged in"
          }
          else{
            this.errorMessage="Something went wrong try again later"
          }
        }
      ); // subscribe()
  } //ngOnInit

  postNewMessage(){
    this.activatedService.params.subscribe((userParams) => {
      this.messageService.postNewMessage(userParams.recipientId, this.newMessage)
        .subscribe((theMessagesFromApi) =>
            {this.myMessages = theMessagesFromApi;  }
        );

          this.errorMessage='';
          this.newMessage = {
            messageBody: ''
          };
      },
      (errorInfo) => {
        console.log(errorInfo);

        if(errorInfo.status === 400){
            this.errorMessage = 'Validation Error';
        }
        else{
          this.errorMessage = "Unknown Error"
        }
      }
    ); // subscribe()
  }

}
