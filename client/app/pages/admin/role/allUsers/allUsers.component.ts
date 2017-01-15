/**
 * Created by thilina on 1/1/17.
 */
import {Component} from "@angular/core";
import {RoleManagementService} from '../../../../services/role.service';

@Component({
    selector: 'all-users',
    templateUrl: 'allUsers.template.html',
    styleUrls: [],
})

export class AllUsersComponent {

    developers:any[] = [];
    operators:any[];
    ngOnInit(){

        this.roleManagementService.getAllOperators().then(
            operators => {
                this.operators = operators;
            }, error => {
                alert(error);
            }
        );

        this.roleManagementService.getAllDevelopers().then(
            developers => {
                this.developers = developers;
            }, error => {
                alert(error);
            }
        );

    }
    constructor(private roleManagementService: RoleManagementService ) {}

}