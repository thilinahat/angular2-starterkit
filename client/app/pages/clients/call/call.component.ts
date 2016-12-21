/**
 * Created by tharakamd on 12/18/16.
 */
import {Component} from "@angular/core"
import Timer = NodeJS.Timer;

@Component({
    selector:'call',
    templateUrl:'call.template.html',
    styleUrls: ['call.css']
})

export class CallComponent {

    timer_time : String;
    timer_seconds: number;
    timer_minutes: number;
    timer_token : any;

    play_btn_clicked: boolean;
    play_btn_class: String;
    play_btn_icon: String;
    play_btn_text: String;

    constructor(){
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

}