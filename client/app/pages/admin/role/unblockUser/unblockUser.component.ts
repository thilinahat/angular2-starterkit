/**
 * Created by thilina on 1/16/17.
 */
import {Component} from "@angular/core";
import {RoleManagementService} from '../../../../services/role.service';

@Component({
    selector: 'unblock-user',
    templateUrl: 'unblockUser.template.html',
    styles:[]
})

export class UnblockUserComponent {

    selectedRole:any;
    name:string;
    operators:any[];
    developers:any[];

    roles: any = [
        {value: 'operators', option: 'Operator'},
        {value: 'developers', option: 'Developer'}
    ];

    users: string[];

    constructor(private roleManagementService: RoleManagementService ) {}

    onRoleSelect(role: any): void{
        this.roleManagementService.getBlockedUsers(role).then(res => {
            this.users = res;
        });
    }

    onSubmit(form: any): void{
        this.roleManagementService.unblockUser(form).then(
            response => {
                alert(response.message);
                this.name = null;
            }, error => {
                alert(error);
            }
        );
    }
}