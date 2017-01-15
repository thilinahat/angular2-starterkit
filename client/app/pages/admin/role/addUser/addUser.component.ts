/**
 * Created by thilina on 1/1/17.
 */
import {Component} from "@angular/core";
import {RoleManagementService} from '../../../../services/role.service';

@Component({
    selector: 'add-user',
    templateUrl: 'addUser.template.html',
    styles:['.form-container{margin-top: 25px;}']
})

export class AddUserComponent {

    selectedRole:any;
    name:any;
    companyId:any;
    email:any;
    operators:any[];
    developers:any[];

    roles: any = [
        {value: 'OPERATOR', option: 'Operator'},
        {value: 'DEVELOPER', option: 'Developer'}
    ];

    constructor(private roleManagementService: RoleManagementService ) {}

    onSubmit(form: any): void{
        this.roleManagementService.addUser(form).then(
            response => {
                this.companyId = null;
                this.email = null;
                this.name = null;
                this.loadData();
                alert(response.message);
            }, error => {
                alert(error);
            }
        );
    }

    ngOnInit(){

        //remove (if) due to peroformance issue when chaning beween tabs quickly
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