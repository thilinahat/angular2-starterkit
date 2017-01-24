import {Component} from "@angular/core";
import {Navitem} from "./navitem.component";
@Component({
    selector:'sidenavbar',
    templateUrl:'sidenavigation.template.html',
    styleUrls: ['sidenavogation.css']
})

export class OperatorSidenavigationComponent {

    username: string = '';
    toggleOn: boolean = false;

    private Navitems: Navitem[] = [
        {name:"Dashboard",  path:"/operator/dashboard", icon:"dashboard",isactive:true},
        {name:"Clients",  path:"/operator/clients", icon:"person" ,isactive:false},
        {name:"Tickets",  path:"/operator/tickets", icon:"content_paste",isactive:false},
        {name:"Reports",  path:"/operator/reports", icon:"library_books", isactive:false},
        {name:"Change Credentials",  path:"/change/credentials", icon:"vpn_key", isactive:false},
        {name:"Logout",  path:"/logout", icon:"exit_to_app", isactive:false},
    ];

    ngOnInit(){
        this.username = localStorage.getItem("CRM_USERNAME");
    }
}