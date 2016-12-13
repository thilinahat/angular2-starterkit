import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { HttpModule }    from '@angular/http';

import {AppComponent} from "./app.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {TicketsComponent} from "./pages/tickets/tickets.componet";
import {ReportsComponent} from "./pages/reports/reports.component";
import {SidenavigationComponent} from "./shared/navigation/sidenavigation.component";


import { ClientService } from './services/client.service';
import { AppRoutingModule } from './app.routing';
import {NavbarheaderComponent} from "./shared/navigation/navbarheader/navbarheader.component";
import {AddclientsComponent} from "./pages/clients/addclient/addclients.component";




import {SearchByNamePipe} from "./pipes/search-by-name.pipe";
import {SearchByIdPipe} from "./pipes/search-by-id.pipe";
import {MainPipeModule} from "./pipes/main.pipe";
import {ClientsHeaderComponent} from "./pages/clients/header/clients.header";
import {SingleClientComponent} from "./pages/clients/single-client.component";



//when creating a component, add it here
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule, MainPipeModule],
    declarations: [AppComponent, ClientsComponent,
        DashboardComponent, TicketsComponent,
        ReportsComponent, SidenavigationComponent,
        NavbarheaderComponent, AddclientsComponent,
        ClientsHeaderComponent,SingleClientComponent,
         ],
    providers: [ClientService],
    bootstrap: [AppComponent],
})

export class AppModule { }