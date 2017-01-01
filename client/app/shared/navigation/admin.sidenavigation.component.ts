/**
 * Created by thilina on 1/1/17.
 */
import {Component} from "@angular/core";
import {Navitem} from "./navitem.component";
@Component({
    selector:'admin-sidenavbar',
    templateUrl:'sidenavigation.template.html',
})

export class AdminSidenavigationComponent {

    private Navitems: Navitem[] = [
        {name:"Dashboard",  path:"/operator/dashboard", icon:"dashboard",isactive:true},
        {name:"Clients",  path:"/operator/clients", icon:"person" ,isactive:false},
        {name:"Tickets",  path:"/operator/tickets", icon:"content_paste",isactive:false},
        {name:"Reports",  path:"/operator/reports", icon:"library_books", isactive:false},
        {name:"Roles",  path:"/admin/manage/roles", icon:"group", isactive:false},
    ];
}