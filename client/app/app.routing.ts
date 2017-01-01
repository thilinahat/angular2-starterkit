/**
 * Created by thilina on 12/13/16.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from "./app.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {OperatorComponent} from "./pages/operator/operator.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {TicketsComponent} from "./pages/tickets/tickets.componet";
import {ReportsComponent} from "./pages/reports/reports.component";
import {AddclientsComponent} from "./pages/clients/addclient/addclients.component";
import {SingleClientComponent} from "./pages/clients/clientSingle/single-client.component";
import {MailComponent} from "./pages/clients/mail/mail.component";
import { LoginComponent } from "./pages/login/login.component";
import {CustomersComponent } from "./pages/customers/customers.component";
import {CallComponent} from "./pages/clients/call/call.component";
import {SearchClientComponent} from "./pages/clients/searchclient/searchclient.component";
import {ChangeCredentialsComponent} from "./shared/changeCredentials/changeCredentials.component";


import { AuthGuard } from './guards/auth.gaurd';
import { AuthService } from './services/auth.service';
import {AddCallComponent} from "./pages/clients/clientSingle/options/addCall/add-call.component";
import {AddNoteComponent} from "./pages/clients/clientSingle/options/addNote/add-note.component";
import {AddTicketeComponent} from "./pages/clients/clientSingle/options/addTicket/add-ticket.component";
import {AddProductComponent} from "./pages/clients/clientSingle/options/addProduct/add-product.component";
import {ClientEditComponent} from "./pages/clients/clientSingle/clientedit/clientedit.component";
import {ClientBlockComponent} from "./pages/clients/clientSingle/options/block/client-block.component";
import {SendMailComponent} from "./pages/clients/clientSingle/options/sendMail/send-mail.component";
import {ClientSingleDashboardComponent} from "./pages/clients/clientSingle/dashboard/client-single-dashboard.component";
import {SingleClientTicketsComponent} from "./pages/clients/clientSingle/options/tickets/single-client-tickets.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'change/credentials', component: ChangeCredentialsComponent, canActivate: [AuthGuard] },

    { path: 'operator', component: OperatorComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent},
            { path: 'tickets', component: TicketsComponent },
            { path: 'reports', component: ReportsComponent },
            { path: 'clients',component: ClientsComponent , canActivate: [AuthGuard],
                children: [
                    { path: '', redirectTo: 'search', pathMatch: 'full' },
                    { path: 'search', component: SearchClientComponent },
                    { path: 'add', component: AddclientsComponent },
                    { path: 'mail', component: MailComponent },
                    { path: 'call', component: CallComponent },
                ]
            },
            {
                path: 'clients/:clientId', component: SingleClientComponent, canActivate: [AuthGuard],
                children: [
                    {path: '', redirectTo: 'client-dash-board', pathMatch: 'full'},
                    {path: 'client-dash-board', component: ClientSingleDashboardComponent},
                    {path: 'add-call', component: AddCallComponent},
                    {path: 'add-note', component: AddNoteComponent},
                    {path: 'add-product', component: AddProductComponent},
                    {path: 'add-ticket', component: AddTicketeComponent},
                    {path: 'send-mail', component: SendMailComponent},
                    {path: 'client-block', component: ClientBlockComponent},
                    {path: 'edit', component: ClientEditComponent},
                    {path: 'tickets', component: SingleClientTicketsComponent},
                ]
            },

        ]
    },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
        ]
    },
    { path: 'customer', component: CustomersComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo:'login', pathMatch: 'full' }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [ AuthService, AuthGuard ]
})
export class AppRoutingModule {}
