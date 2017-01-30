import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { HttpModule }    from '@angular/http';

import {AppComponent} from "./app.component";
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.gaurd';
import { AppRoutingModule } from './app.routing';

import { LoginComponent } from './pages/login/login.component';

import {MainPipeModule} from "./pipes/main.pipe";


//when creating a component, add it here
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule, MainPipeModule],
    declarations: [AppComponent,LoginComponent],
    providers: [AuthService, AuthGuard],
    bootstrap: [AppComponent],
})

export class AppModule { }