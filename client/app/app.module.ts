import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes}   from '@angular/router';
import {FormsModule} from "@angular/forms";

import {AppComponent} from "./app.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {TicketsComponent} from "./pages/tickets/tickets.componet";
import {ReportsComponent} from "./pages/reports/reports.component";
import {SidenavigationComponent} from "./shared/navigation/sidenavigation.component";
import {Navitem} from "./shared/navigation/navitem.component";

import { ClientService } from './services/client.service';
import { AppRoutingModule } from './app.routing';


//when creating a component, add it here
@NgModule({
    imports: [BrowserModule, FormsModule, AppRoutingModule],
    declarations: [AppComponent, ClientsComponent,
        DashboardComponent, TicketsComponent,
        ReportsComponent, SidenavigationComponent,],
    providers: [ClientService],
    bootstrap: [AppComponent],
})

export class AppModule { }