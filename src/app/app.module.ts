import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AuthorizeApiService } from './services/authorize-api.service';
import { ProfileApiService } from './services/profile-api.service';
import { MediaApiService } from './services/media-api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { EditMyProfileComponent } from './pages/edit-my-profile/edit-my-profile.component';
import { MyMediaComponent } from './pages/my-media/my-media.component';
import { AddMediaFormComponent } from './pages/add-media-form/add-media-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    MyProfileComponent,
    EditMyProfileComponent,
    MyMediaComponent,
    AddMediaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule
  ],
  providers: [AuthorizeApiService, ProfileApiService, MediaApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
