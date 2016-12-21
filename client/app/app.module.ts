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
import {OptionsClientService} from "./pages/clients/clientSingle/options/options-client.service";
import {AddNoteComponent} from "./pages/clients/clientSingle/options/addNote/add-note.component";
import {AddProductComponent} from "./pages/clients/clientSingle/options/addProduct/add-product.component";
import {AddTicketeComponent} from "./pages/clients/clientSingle/options/addTicket/add-ticket.component";
import {AddTillComponent} from "./pages/clients/clientSingle/options/addProduct/AddTill/add-till.component";
import {CallComponent} from "./pages/clients/call/call.component";

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';


//when creating a component, add it here
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule, MainPipeModule,Ng2Bs3ModalModule],
    declarations: [AppComponent, ClientsComponent,
        DashboardComponent, TicketsComponent,
        ReportsComponent, SidenavigationComponent,
        NavbarheaderComponent, AddclientsComponent,
        ClientsHeaderComponent,SingleClientComponent,
        MailComponent, LoginComponent, CustomersComponent,
        SingleclientheaderComponent, ClientdataComponent,
        ClienthistoryComponent,ClientproductComponent,
        AddCallComponent, AddNoteComponent,
        AddProductComponent, AddTicketeComponent,
        AddTillComponent, CallComponent
         ],
    providers: [ClientService, AuthService, AuthGuard, OptionsClientService],
    bootstrap: [AppComponent],
})

export class AppModule { }