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


import { AuthGuard } from './guards/auth.gaurd';
import { AuthService } from './services/auth.service';
import {AddCallComponent} from "./pages/clients/clientSingle/options/addCall/add-call.component";
import {AddNoteComponent} from "./pages/clients/clientSingle/options/addNote/add-note.component";
import {AddTicketeComponent} from "./pages/clients/clientSingle/options/addTicket/add-ticket.component";
import {AddProductComponent} from "./pages/clients/clientSingle/options/addProduct/add-product.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'operator/clients/search', component: ClientsComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients/addclient', component: AddclientsComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients',redirectTo: 'operator/clients/search' },
    { path: 'operator/clients/mail',component: MailComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients/:clientId/addcall', component: AddCallComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients/:clientId/addnote', component: AddNoteComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients/:clientId/addticket', component: AddTicketeComponent, canActivate: [AuthGuard] },
    { path: 'operator/clients/:clientId/addproduct', component: AddProductComponent, canActivate: [AuthGuard] },

    { path: 'operator/clients/:clientId',component: SingleClientComponent , canActivate: [AuthGuard] },
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
