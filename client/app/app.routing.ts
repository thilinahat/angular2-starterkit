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
import {SidenavigationComponent} from "./shared/navigation/sidenavigation.component";
import {Navitem} from "./shared/navigation/navitem.component";
import {AddclientsComponent} from "./pages/clients/addclient/addclients.component";
import {SingleClientComponent} from "./pages/clients/single-client.component";
import {MailComponent} from "./pages/clients/mail/mail.component";


const routes: Routes = [
    { path: 'operator/clients/search', component: ClientsComponent },
    { path: 'operator/clients/addclient', component: AddclientsComponent },
    { path: 'operator/clients',redirectTo: 'operator/clients/search' },
    { path: 'operator/clients/mail',component: MailComponent },
    { path: 'operator/clients/:clientId',component: SingleClientComponent },

    { path: 'operator/dashboard', component: DashboardComponent },
    { path: 'operator/tickets', component: TicketsComponent},
    { path: 'operator/reports', component: ReportsComponent},
    { path: 'operator', redirectTo:'operator/dashboard' },
    { path: '**', redirectTo:'operator/dashboard' },

];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
