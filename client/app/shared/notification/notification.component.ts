/**
 * Created by thilina on 1/2/17.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";


@Component({
    selector: 'notification',
    templateUrl: 'notification.template.html',
})

export class NotificationComponent {

    @Input()  display: boolean;
    @Input()  notificationType: string;
    @Input()  notification: string;
    @Input()  notificationSymbol:string;
    @Output() onNotificationClose: EventEmitter<any> = new EventEmitter();

    onClose(){
        this.onNotificationClose.next();
    }


}

/*
* notificationTypes
*
* info
* warning
* success
* danger
* */

/*notificationSymbols
*
* info_outline
* check
* warning
* error_outline
* */