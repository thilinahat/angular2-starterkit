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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require("@angular/forms");
var http_1 = require('@angular/http');
var app_component_1 = require("./app.component");
var clients_component_1 = require("./pages/clients/clients.component");
var dashboard_component_1 = require("./pages/dashboard/dashboard.component");
var tickets_componet_1 = require("./pages/tickets/tickets.componet");
var reports_component_1 = require("./pages/reports/reports.component");
var sidenavigation_component_1 = require("./shared/navigation/sidenavigation.component");
var client_service_1 = require('./services/client.service');
var app_routing_1 = require('./app.routing');
var navbarheader_component_1 = require("./shared/navigation/navbarheader/navbarheader.component");
var addclients_component_1 = require("./pages/clients/addclient/addclients.component");
//when creating a component, add it here
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, app_routing_1.AppRoutingModule],
            declarations: [app_component_1.AppComponent, clients_component_1.ClientsComponent,
                dashboard_component_1.DashboardComponent, tickets_componet_1.TicketsComponent,
                reports_component_1.ReportsComponent, sidenavigation_component_1.SidenavigationComponent, navbarheader_component_1.NavbarheaderComponent, addclients_component_1.AddclientsComponent],
            providers: [client_service_1.ClientService],
            bootstrap: [app_component_1.AppComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map