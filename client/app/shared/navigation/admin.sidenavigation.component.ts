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
        {name:"Dashboard",  path:"dashboard", icon:"dashboard",isactive:true},
        {name:"Clients",  path:"clients", icon:"person" ,isactive:false},
        {name:"Tickets",  path:"tickets", icon:"content_paste",isactive:false},
        {name:"Reports",  path:"reports", icon:"library_books", isactive:false},
        {name:"Roles",  path:"roles", icon:"group", isactive:false},
        {name:"Products",  path:"products", icon:"shopping_cart", isactive:false},
        {name:"Email Templates",  path:"mail-templates", icon:"email", isactive:false},
    ];
}