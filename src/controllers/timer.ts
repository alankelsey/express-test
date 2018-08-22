import { Request, Response } from "express";

/**
 * GET /
 * Timer page.
 */
class MyTimer {

    /*
    timerData: object;
    constructor() {
        this.timerData = {
            startTime: 0,
            endTime: 0,
            min: 0,
            sec: 0
        }
    }
    */

    private timerData = {
        startTime: 0,
        endTime: 0,
        min: 0,
        sec: 0
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
        // const totalTime = this.formatMinSec(diff).seconds;
        this.timerData.min = this.formatMinSec(diff).minutes;
        this.timerData.sec = this.formatMinSec(diff).seconds;

    }

    private formatMinSec(ms: number) {

        const sec = (ms / 1000) % 60;
        // const secCalc = (ms / 1000) % 60;
        const min = ((ms / 1000) - ((ms / 1000) % 60)) / 60;
        // const sec = Math.trunc(secCalc * Math.pow(10, 3)) / 100;

        const results = { seconds: sec, minutes: 0 };

        if (min < 1) {

            results.minutes = 0;
        } else {

            results.minutes = min;
        }

        return results;
    }

    resetTimer() {

        this.timerData.startTime = 0;
        this.timerData.endTime = 0;
        this.timerData.min = 0;
        this.timerData.sec = 0;
    }

}

const timer = new MyTimer;

export let getTimer = (req: Request, res: Response) => {
    timer.resetTimer();
    res.render("timer", timer.returnTimerData());
};

export let startTimer = (req: Request, res: Response) => {
    timer.setStartTime();
    res.render("timer", timer.returnTimerData());
};

export let stopTimer = (req: Request, res: Response) => {
    timer.setStopTime();
    res.render("timer", timer.returnTimerData());
};

export let t = timer;