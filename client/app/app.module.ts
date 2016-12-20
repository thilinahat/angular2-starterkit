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
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.gaurd';
import { AppRoutingModule } from './app.routing';

import {NavbarheaderComponent} from "./shared/navigation/navbarheader/navbarheader.component";
import {AddclientsComponent} from "./pages/clients/addclient/addclients.component";
import { LoginComponent } from './pages/login/login.component';



import {MainPipeModule} from "./pipes/main.pipe";
import {ClientsHeaderComponent} from "./pages/clients/header/clients.header";
import {SingleClientComponent} from "./pages/clients/clientSingle/single-client.component";
import {MailComponent} from "./pages/clients/mail/mail.component";
import {CustomersComponent } from "./pages/customers/customers.component";
import {SingleclientheaderComponent} from "./pages/clients/clientSingle/singleclientheader/singleclientheader.component";
import {ClientdataComponent} from "./pages/clients/clientSingle/clientdata/clientdata.component";
import {ClienthistoryComponent} from "./pages/clients/clientSingle/clienthistory/clienthistory.component";
import {ClientproductComponent} from "./pages/clients/clientSingle/clientproduct/clientproduct.component";
import {AddCallComponent} from "./pages/clients/clientSingle/options/addCall/add-call.component";
import {CallService} from "./pages/clients/clientSingle/options/addCall/call.service";


//when creating a component, add it here
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule, MainPipeModule],
    declarations: [AppComponent, ClientsComponent,
        DashboardComponent, TicketsComponent,
        ReportsComponent, SidenavigationComponent,
        NavbarheaderComponent, AddclientsComponent,
        ClientsHeaderComponent,SingleClientComponent,
        MailComponent, LoginComponent, CustomersComponent,
        SingleclientheaderComponent, ClientdataComponent,
        ClienthistoryComponent,ClientproductComponent,
        AddCallComponent
         ],
    providers: [ClientService, AuthService, AuthGuard, CallService],
    bootstrap: [AppComponent],
})

export class AppModule { }