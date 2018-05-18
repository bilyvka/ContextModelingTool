import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModelListComponent } from './model-list/model-list.component';
import {RouterModule, Routes} from "@angular/router";
import { RegistrationComponent } from './registration/registration.component';
import {UserService} from "./services/user.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ModelsService} from "./services/models.service";
import { ContextModelingComponent } from './context-modeling/context-modeling.component';
import { CreateModelComponent } from './create-model/create-model.component';
import { ModelViewComponent } from './model-view/model-view.component';



const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'models',      component: ModelListComponent },
  { path: 'context-modeling',      component: ContextModelingComponent },
  { path: 'create-model',      component: CreateModelComponent },
  { path: 'model-view',      component: ModelViewComponent },
  { path: '',
    pathMatch: 'full',
    component: AppComponent
  }
 // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModelListComponent,
    RegistrationComponent,
    ContextModelingComponent,
    CreateModelComponent,
    ModelViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient,UserService,ModelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
