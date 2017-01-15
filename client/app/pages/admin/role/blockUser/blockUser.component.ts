/**
 * Created by thilina on 1/6/17.
 */
import {Component} from "@angular/core";
import {RoleManagementService} from '../../../../services/role.service';

@Component({
    selector: 'block-user',
    templateUrl: 'blockUser.template.html',
    styles:['.form-container{margin-top: 25px;}']
})

export class BlockUserComponent {

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
        this.roleManagementService.getUnblockedUsers(role).then(res => {
            this.users = res;
        });
    }

    onSubmit(form: any): void{
        this.roleManagementService.blockUser(form).then(
            response => {
                this.name = null;
                this.loadData();
                alert(response.message);
            }, error => {
                alert(error);
            }
        );
    }

    ngOnInit(){

        //remove due to peroformance issue when chaning beween tabs quickly
        this.loadData();


    }

    loadData(){
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

}