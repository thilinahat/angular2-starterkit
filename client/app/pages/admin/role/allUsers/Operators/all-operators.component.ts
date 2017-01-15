/**
 * Created by thilina on 1/1/17.
 */
import {Component, Input} from "@angular/core";
import {RoleManagementService} from "../../../../../services/role.service";

@Component({
    selector: 'all-operators',
    templateUrl: 'all-operators.template.html',
    styleUrls: ['../allusers.css'],
})

export class AllOperatorsComponent {

    @Input() operators:any[] = [];

}