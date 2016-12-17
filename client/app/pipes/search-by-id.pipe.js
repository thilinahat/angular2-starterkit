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
/*
* filter an array of objects which has id field on it
*
* exmapla use
 * { clientNameAndIds | searchById:'a' }
*
 * { clientNameAndIds | searchById:searchClientId }
 *
 * *ngFor="let client of ( clientNameAndIds | searchById:searchClientId ) "
*
 *  */
var SearchByIdPipe = (function () {
    function SearchByIdPipe() {
    }
    SearchByIdPipe.prototype.transform = function (componentList, id) {
        return componentList.filter(function (component) { return component.id.toLocaleLowerCase().indexOf(id.toLocaleLowerCase()) != -1; });
    };
    SearchByIdPipe = __decorate([
        core_1.Pipe({ name: 'searchById' }), 
        __metadata('design:paramtypes', [])
    ], SearchByIdPipe);
    return SearchByIdPipe;
}());
exports.SearchByIdPipe = SearchByIdPipe;
//# sourceMappingURL=search-by-id.pipe.js.map