/**
 * Created by thilina on 1/16/17.
 */
import {Component} from "@angular/core";
import {Navitem} from "./navitem.component";
@Component({
    selector:'developer-sidenavbar',
    templateUrl:'sidenavigation.template.html',
    styleUrls: ['sidenavogation.css']
})

export class DeveloperSidenavigationComponent {

    username: string = '';

    private Navitems: Navitem[] = [
        {name:"Tickets",  path:"tickets", icon:"content_paste",isactive:false},
        {name:"Change Credentials",  path:"/change/credentials", icon:"vpn_key", isactive:false},
        {name:"Logout",  path:"/logout", icon:"exit_to_app", isactive:false},
    ];

    ngOnInit(){
        this.username = localStorage.getItem("CRM_USERNAME");
    }
}