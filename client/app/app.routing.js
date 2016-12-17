"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by thilina on 12/13/16.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var clients_component_1 = require("./pages/clients/clients.component");
var dashboard_component_1 = require("./pages/dashboard/dashboard.component");
var tickets_componet_1 = require("./pages/tickets/tickets.componet");
var reports_component_1 = require("./pages/reports/reports.component");
var addclients_component_1 = require("./pages/clients/addclient/addclients.component");
var single_client_component_1 = require("./pages/clients/single-client.component");
var mail_component_1 = require("./pages/clients/mail/mail.component");
var login_component_1 = require("./pages/login/login.component");
var customers_component_1 = require("./pages/customers/customers.component");
var auth_gaurd_1 = require('./guards/auth.gaurd');
var auth_service_1 = require('./services/auth.service');
var routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'operator/clients/search', component: clients_component_1.ClientsComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'operator/clients/addclient', component: addclients_component_1.AddclientsComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'operator/clients', redirectTo: 'operator/clients/search' },
    { path: 'operator/clients/mail', component: mail_component_1.MailComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'operator/clients/:clientId', component: single_client_component_1.SingleClientComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'operator/dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'operator/tickets', component: tickets_componet_1.TicketsComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'operator/reports', component: reports_component_1.ReportsComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: 'operator', redirectTo: 'operator/dashboard' },
    { path: 'customer', component: customers_component_1.CustomersComponent, canActivate: [auth_gaurd_1.AuthGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule],
            providers: [auth_service_1.AuthService, auth_gaurd_1.AuthGuard]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map