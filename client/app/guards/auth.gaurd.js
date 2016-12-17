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
 * Created by thilina on 12/17/16.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var AuthGuard = (function () {
    function AuthGuard(http, router) {
        this.http = http;
        this.router = router;
        // mapping of role based route access
        this.acl = {
            "/operator/dashboard": ["OPERATOR", "ADMIN"],
            "/operator/clients/search": ["OPERATOR", "ADMIN"],
            "/operator/clients/addclient": ["OPERATOR", "ADMIN"],
            "/operator/clients/mail": ["OPERATOR", "ADMIN"],
            "/operator/clients/:clientId": ["OPERATOR", "ADMIN"],
            "/operator/tickets": ["OPERATOR", "ADMIN"],
            "/operator/reports": ["OPERATOR", "ADMIN"],
            "/customer": ["CLIENT"]
        };
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.authorizingUrl = '/verify/user';
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        var url = state.url; // url user trying to access
        var authorizedRoles = this.acl[url]; // authorized roles for the url
        // following promise return true if the logged user has permission to access the required url, otherwise false
        return new Promise(function (resolve, reject) {
            //noinspection TypeScriptUnresolvedFunction
            _this.http
                .post(_this.authorizingUrl, { headers: _this.headers })
                .toPromise()
                .then(function (response) {
                //noinspection TypeScriptUnresolvedFunction
                var userRole = response.json().userRole;
                authorizedRoles.forEach(function (authRole) {
                    if (authRole == userRole)
                        resolve(true);
                });
            }, function (error) {
                console.log(error.json());
                _this.router.navigate(['/login']);
            })
                .catch(function (err) {
                console.log(err);
                reject(false);
            });
        });
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.gaurd.js.map