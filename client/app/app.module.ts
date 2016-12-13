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



//when creating a component, add it here
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule],
    declarations: [AppComponent, ClientsComponent,
        DashboardComponent, TicketsComponent,
        ReportsComponent, SidenavigationComponent,NavbarheaderComponent, AddclientsComponent,
        SearchByNamePipe,SearchByIdPipe,  ],
    providers: [ClientService],
    bootstrap: [AppComponent],
})

export class AppModule { }