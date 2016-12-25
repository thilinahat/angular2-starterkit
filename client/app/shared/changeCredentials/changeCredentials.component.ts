/**
 * Created by thilina on 12/25/16.
 */
import {Component, ViewChild} from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'changeCredentials',
    templateUrl: 'changeCredentials.template.html',
    styleUrls: ['changeCredentials.css']
})

export class ChangeCredentialsComponent {

    @ViewChild('newUsername')
    newUsername: any;

    @ViewChild('confirmedUsername')
    confirmedUsername: any;

    @ViewChild('newPassword')
    newPassword: any;

    @ViewChild('confirmedPassword')
    confirmedPassword: any;

    usernameMatched: boolean = false;
    usernameMatchedIcon: string = '';

    passwordMatched: boolean = false;
    passwordMatchedIcon: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    onConfirmedUsernameChange(): void{
        if (this.newUsername.nativeElement.value != '' && this.newUsername.nativeElement.value == this.confirmedUsername.nativeElement.value){
            this.usernameMatched = true;
        } else{
            this.usernameMatched = false;
            this.usernameMatchedIcon = 'close';
        }
    }

    onConfirmedUsernameInput(): void{
        if (this.newUsername.nativeElement.value != '' && this.newUsername.nativeElement.value == this.confirmedUsername.nativeElement.value){
            this.usernameMatched = true;
            this.usernameMatchedIcon = 'done';
        }
    }

    onConfirmedPasswordChange(): void{
        if (this.newPassword.nativeElement.value != '' && this.newPassword.nativeElement.value == this.confirmedPassword.nativeElement.value){
            this.passwordMatched = true;
        } else{
            this.passwordMatched = false;
            this.passwordMatchedIcon = 'close';
        }
    }

    onConfirmedPasswordInput(): void{
        if (this.newPassword.nativeElement.value != '' && this.newPassword.nativeElement.value == this.confirmedPassword.nativeElement.value){
            this.passwordMatched = true;
            this.passwordMatchedIcon = 'done';
        }
    }

    onSubmit(form: any): void {
        this.authService.changeCredentials(form).then(res => {
            this.router.navigate([res.redirectURL]);
        }, error => {
            alert('Invalid Username or Password');
        });
    }
}