/**
 * Created by tharakamd on 12/29/16.
 */
export class CallModel{
    constructor(
        public start_time: Date,
        public end_time: Date,
        public description: string,
        public type: string,
        public time_duration: number,
        public client_id: number
    ){}
}