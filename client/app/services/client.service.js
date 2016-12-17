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
 * Created by thilina on 12/12/16.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var ClientService = (function () {
    function ClientService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.clientAPIurl = 'api/client';
    }
    /*getHeroes(): Promise<Hero[]> {
     return Promise.resolve(HEROES);
     }*/
    ClientService.prototype.addClient = function (client) {
        var url = this.clientAPIurl + "'/add'";
        /*return this.http
            .post(url, JSON.stringify({client: client}), {headers: this.headers})
            .toPromise()
            .then(response => response.json().data as any)
            .catch(this.handleError);*/
    };
    ClientService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ClientService.prototype.getClientsNameIds = function () {
        return [
            { name: "client 1", id: "C0001" },
            { name: "james", id: "C0002" },
            { name: "anna", id: "C0003" },
            { name: "xtream solutions", id: "C1001" },
            { name: "exchange plus", id: "C0201" },
            { name: "european double", id: "C031" },
            { name: "american exprex", id: "C4001" },
        ];
    };
    ClientService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ClientService);
    return ClientService;
}());
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map