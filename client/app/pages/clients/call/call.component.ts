/**
 * Created by tharakamd on 12/18/16.
 */
import {Component, OnInit} from "@angular/core";
import {NotificationsService} from 'angular2-notifications';
import Timer = NodeJS.Timer;
import {CallModel} from "./call.model";
import {CallService} from '../../../services/call.service';

@Component({
    selector:'call',
    templateUrl:'call.template.html',
    styleUrls: ['call.css'],
    providers: [CallService]
})

export class CallComponent implements OnInit{

    // binding for summary
    public summary = {
        incomingThisWeek: 0
    }

    ngOnInit(): void {
        this.getCallSummory();
    }

    // for nitifications
    public notif_options = {
        position: ["bottom", "left"],
        timeOut: 5000,
        lastOnBottom: true
    }

    timer_time : String;
    timer_seconds: number;
    timer_minutes: number;
    timer_token : any;

    play_btn_clicked: boolean;
    play_btn_class: String;
    play_btn_icon: String;
    play_btn_text: String;

    constructor(private callService: CallService,private notif_service: NotificationsService){
        this.timer_seconds = 0;
        this.timer_minutes = 0;
        this.timer_time = "00 : 00";
        this.play_btn_clicked = true;
        this.playButtonClick();
    }

    playButtonClick(){
        this.play_btn_clicked = !this.play_btn_clicked;
        if(this.play_btn_clicked){
            this.play_btn_class = "btn btn-warning";
            this.play_btn_icon = "glyphicon glyphicon-pause";
            this.play_btn_text = "Pause"
            this.startTimer();
        }else{
            this.play_btn_class = "btn btn-success";
            this.play_btn_icon = "glyphicon glyphicon-play";
            this.play_btn_text = "Start";
            this.stopTimer();
        }
    }

    stopButtonClick(){
        this.stopTimer();
        this.timer_seconds = 0;
        this.timer_minutes = 0;
        this.timer_time = "00 : 00";
        this.play_btn_clicked = true;
        this.playButtonClick();
    }

    startTimer(){

        this.timer_token = setInterval(() =>{
            if(this.timer_seconds < 59){
                this.timer_seconds++;
            }else{
                this.timer_seconds = 0;
                this.timer_minutes++;
            }

            var str_seconds: String;
            var str_minutes : String;
            str_minutes = "";
            str_seconds =  "";


            if(this.timer_seconds < 10){
                str_seconds = "0" + String(this.timer_seconds);
            }else{
                str_seconds = String(this.timer_seconds);
            }
            if(this.timer_minutes < 10){
                str_minutes = "0" + String(this.timer_minutes);
            }else{
                str_minutes = String(this.timer_minutes);
            }


            this.timer_time = str_minutes + " : " + str_seconds;
        },1000);
    }

    stopTimer(){
        clearInterval(this.timer_token);
    }

    // new call form
    newCallModel = new CallModel(new Date(2010, 11, 28, 14, 57),new Date(2010, 11, 28, 14, 57),"","",0,1);

    onCallFormSubmit(){
        //this.newCallModel.time_duration = (this.newCallModel.end_time.getTime() - this.newCallModel.start_time.getTime())/1000;
        // console.log(this.newCallModel.time_duration);
        this.callService.storeNewCall(this.newCallModel).then(
            data  => this.notif_service.success("Success","Your call stored successfully"),
            error => this.notif_service.error("Error","We couldn't store your data")
        );
        this.newCallModel = new CallModel(new Date(2010, 11, 28, 14, 57),new Date(2010, 11, 28, 14, 57),"","",0,1);
    }

    getCallSummory(){
        this.callService.getCallSummary().then(
            data => {
                data = JSON.parse(data._body);
                this.summary = data;
                console.log(data);

            },
            error => this.notif_service.error("Error","Error fetching data from server")
        );
    }
}