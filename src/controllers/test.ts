import { Request, Response } from "express";

/*
    interface timeInfo {
        public startTime: number;
        public stopTime: number;

    }
*/

class Time {

    // public startTime: number;
    // public stopTime: number;
    /*
    date: timerData.getDate(),
    startTime: 0,
    endTime: 0,
    total: 0,
    title: "Timer"
    */

    private timerData = {
        startTime: 0,
        endTime: 0,
        total: 0
    };

    setStartTime() {
        this.timerData.startTime = this.getTime();
    }

    setStopTime() {
        this.timerData.endTime = this.getTime();
        this.elapsedTime(this.timerData.startTime, this.timerData.endTime);

    }

    private getTime() {
        return Date.now();
    }

    returnTimerData() {
        return this.timerData;
    }

    private elapsedTime(startedAt: number, stoppedAt: number) {
        const diff = stoppedAt - startedAt;
        const totalTime = diff / 1000;
        this.timerData.total = totalTime;
    }

}


function callTime() {
    const time1 = new Time;
    time1.setStartTime();
    console.log(time1.returnTimerData());

    time1.setStopTime();
    console.log(time1.returnTimerData());

}

callTime();