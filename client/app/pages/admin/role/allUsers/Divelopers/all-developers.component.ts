/**
 * Created by thilina on 1/1/17.
 */
import {Component, Input} from "@angular/core";
import {RoleManagementService} from "../../../../../services/role.service";

@Component({
    selector: 'all-developers',
    templateUrl: 'all-developers.template.html',
    styleUrls: ['../allusers.css'],
})

export class AllDevelopersComponent {

    @Input() developers:any[] = [];

}