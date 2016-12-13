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
var routes = [
    { path: 'operator/clients', component: clients_component_1.ClientsComponent },
    { path: 'operator/clients/addclient', component: addclients_component_1.AddclientsComponent },
    { path: 'operator/dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'operator/tickets', component: tickets_componet_1.TicketsComponent },
    { path: 'operator/reports', component: reports_component_1.ReportsComponent },
    { path: 'operator', redirectTo: 'operator/dashboard' },
    { path: '**', redirectTo: 'operator/dashboard' },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map