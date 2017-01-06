/**
 * Created by thilina on 1/6/17.
 */
import {Component} from "@angular/core";
import {RoleManagementService} from '../../../../services/role.service';

@Component({
    selector: 'block-user',
    templateUrl: 'blockUser.template.html',
    styleUrls: [],
})

export class BlockUserComponent {

    roles: any = [
        {value: 'operators', option: 'Operator'},
        {value: 'developers', option: 'Developer'}
    ];

    users: string[];

    constructor(private roleManagementService: RoleManagementService ) {}

    onRoleSelect(role: any): void{
        this.roleManagementService.getUnblockedUsers(role).then(res => {
            this.users = res;
        });
    }

    onSubmit(form: any): void{
        this.roleManagementService.blockUser(form).then(
            response => {
                alert(response.message);
            }, error => {
                alert(error);
            }
        );
    }
}