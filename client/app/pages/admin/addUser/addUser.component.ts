/**
 * Created by thilina on 1/1/17.
 */
import {Component} from "@angular/core";
import {RoleManagementService} from './../../../services/roleManagement.service';

@Component({
    selector: 'add-user',
    templateUrl: './addUser.template.html',
    styleUrls: [],
})

export class AddUserComponent {

    roles: any = [
        {value: 'OPERATOR', option: 'Operator'},
        {value: 'DEVELOPER', option: 'Developer'}
    ];

    constructor(private roleManagementService: RoleManagementService ) {}

    onSubmit(form: any): void{
        this.roleManagementService.addUser(form).then(
            response => {
                alert(response.message + '\n' + response.username + '\n' + response.password);
            }, error => {
                alert(error);
            }
        );
    }
}