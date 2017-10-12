import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AppComponent} from './app.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {LoginComponent} from './pages/login/login.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import {EditMyProfileComponent} from './pages/edit-my-profile/edit-my-profile.component';
import {MyMessagesComponent} from './pages/my-messages/my-messages.component';
import {ExploreHomeComponent} from './pages/explore-home/explore-home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SendMessagesComponent } from './pages/send-messages/send-messages.component';




const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component:SignUpComponent},
  {path: 'myprofile', component: MyProfileComponent},
  {path: 'myprofile/:userId', component:EditMyProfileComponent},
  {path: 'profile/:userId', component: UserProfileComponent },
  {path: 'messages', component: MyMessagesComponent},
  {path: 'messages/:recipientId', component: SendMessagesComponent },
  {path: 'media', component:ExploreHomeComponent},
  {path: 'medias/:searchTerm', component:ExploreHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
