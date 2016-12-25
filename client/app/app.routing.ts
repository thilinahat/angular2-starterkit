/**
 * Created by thilina on 12/13/16.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from "./app.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {TicketsComponent} from "./pages/tickets/tickets.componet";
import {ReportsComponent} from "./pages/reports/reports.component";
import {AddclientsComponent} from "./pages/clients/addclient/addclients.component";
import {SingleClientComponent} from "./pages/clients/clientSingle/single-client.component";
import {MailComponent} from "./pages/clients/mail/mail.component";
import { LoginComponent } from "./pages/login/login.component";
import {CustomersComponent } from "./pages/customers/customers.component";
import {CallComponent} from "./pages/clients/call/call.component";
import {ChangeCredentialsComponent} from "./shared/changeCredentials/changeCredentials.component";


import { AuthGuard } from './guards/auth.gaurd';
import { AuthService } from './services/auth.service';
import {AddCallComponent} from "./pages/clients/clientSingle/options/addCall/add-call.component";
import {AddNoteComponent} from "./pages/clients/clientSingle/options/addNote/add-note.component";
import {AddTicketeComponent} from "./pages/clients/clientSingle/options/addTicket/add-ticket.component";
import {AddProductComponent} from "./pages/clients/clientSingle/options/addProduct/add-product.component";
import {ClientBlockComponent} from "./pages/clients/clientSingle/options/block/client-block.component";
import {SendMailComponent} from "./pages/clients/clientSingle/options/sendMail/send-mail.component";
import {ClientSingleDashboardComponent} from "./pages/clients/clientSingle/dashboard/client-single-dashboard.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'change/credentials', component: ChangeCredentialsComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients/search', component: ClientsComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients/addclient', component: AddclientsComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients',redirectTo: 'operator/clients/search' },
    { path: 'operator/clients/mail',component: MailComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients/call',component: CallComponent, canActivate: [AuthGuard]},
    { path: 'operator/clients/:clientId/addcall', component: AddCallComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients/:clientId/addnote', component: AddNoteComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients/:clientId/addticket', component: AddTicketeComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients/:clientId/addproduct', component: AddProductComponent, canActivate: [AuthGuard] },

    { path: 'operator/clients/:clientId',component: SingleClientComponent , canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'client-dash-board', pathMatch: 'full' },
            { path: 'client-dash-board', component: ClientSingleDashboardComponent },
            { path: 'add-call', component: AddCallComponent },
            { path: 'add-note', component: AddNoteComponent },
            { path: 'add-product', component: AddProductComponent },
            { path: 'add-ticket', component: AddTicketeComponent },
            { path: 'send-mail', component: SendMailComponent },
            { path: 'client-block', component: ClientBlockComponent },

        ]
    },
    { path: 'operator/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'operator/tickets', component: TicketsComponent, canActivate: [AuthGuard] },
    { path: 'operator/reports', component: ReportsComponent, canActivate: [AuthGuard] },
    { path: 'operator', redirectTo:'operator/dashboard' },
    { path: 'customer', component: CustomersComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo:'login', pathMatch: 'full' }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [ AuthService, AuthGuard ]
})
export class AppRoutingModule {}
