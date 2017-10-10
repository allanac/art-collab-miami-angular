import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AppComponent} from './app.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {LoginComponent} from './pages/login/login.component';
import {MyProfileComponent} from './pages/my-profile/my-profile.component';
import {EditMyProfileComponent} from './pages/edit-my-profile/edit-my-profile.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component:SignUpComponent},
  {path: 'profile', component: MyProfileComponent},
  {path: 'profile/:userId', component:EditMyProfileComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
