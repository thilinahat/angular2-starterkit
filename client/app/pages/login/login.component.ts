/**
 * Created by thilina on 12/16/16.
 */
import {Component} from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'login',
    templateUrl: 'login.template.html',
    styleUrls: ['login.css']
})

export class LoginComponent {

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit(form: any): void {
        this.authService.login(form).then(res => {
                localStorage.setItem("CRM_USERNAME", res.name);
                this.router.navigate([res.redirectURL]);
            }, error => {
            alert('Invalid Username or Password');
        });
    }
}