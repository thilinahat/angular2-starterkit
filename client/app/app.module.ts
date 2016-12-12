import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes}   from '@angular/router';
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {ClientsComponent} from "./pages/clients/clients.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {TicketsComponent} from "./pages/tickets/tickets.componet";
import {ReportsComponent} from "./pages/reports/reports.component";

const appRoutes: Routes = [
    { path: 'operator/clients', component: ClientsComponent },
    { path: 'operator/dashboard', component: DashboardComponent },
    { path: 'operator/tickets', component: TicketsComponent},
    { path: 'operator/reports', component: ReportsComponent},
    { path: 'operator', component: DashboardComponent },
  /*  {
        path: 'heroes',
        component: HeroListComponent,
        data: {
            title: 'Heroes List'
        }
    },
    { path: '', component: HomeComponent },
    { path: '**', component: PageNotFoundComponent }*/
];


//when creating a component, add it here
@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],

    declarations: [AppComponent, ClientsComponent, DashboardComponent, TicketsComponent, ReportsComponent],
    bootstrap: [AppComponent],


})



export class AppModule { }