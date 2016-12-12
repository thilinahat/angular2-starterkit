import {Component} from "@angular/core";

@Component({
    selector: 'my-app',
    template: '<h1>Welcome to Customer Relationship management</h1>\n' +
    '<nav>\n    ' +
    '<a routerLink="/operator/clients" routerLinkActive="active">Clients</a>\n    ' +
    '<a routerLink="/operator/dashboard" routerLinkActive="active">Dashboard</a>\n\n' +
    '<a routerLink="/operator/tickets" routerLinkActive="active">Tickets</a>\n' +
    '<a routerLink="/operator/reports" routerLinkActive="active">Reports</a>\n' +
    '</nav>\n' +
    '<router-outlet></router-outlet>'

})

export class AppComponent { }