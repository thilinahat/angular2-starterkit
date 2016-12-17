import {Component, Input} from "@angular/core";
@Component({
    moduleId: module.id,
    selector: 'navbarheader',
    templateUrl: 'navbarheader.template.html',

})


export class NavbarheaderComponent {
    ToggleNavBar = function () {
        console.log("working");

    }
}
