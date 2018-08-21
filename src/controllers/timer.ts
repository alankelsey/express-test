import { Request, Response } from "express";

/**
 * GET /
 * Timer page.
 */
class MyTimer {

    private timerData = {
        startTime: 0,
        endTime: 0,
        min: "",
        sec: ""
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

        const sec = (ms / 1000);
        const totalSec = sec;
        const min = (ms / 60000);

        const results = {
            seconds: sec.toFixed(),
            minutes: "0"
        };

        if (min < 1) {


                results.seconds = sec.toFixed();
                results.minutes = "0";


        } else {

            results.seconds = sec.toFixed();
            results.minutes = min.toFixed();

            }


        return results;

    }

    resetTimer() {

        this.timerData.startTime = 0;
        this.timerData.endTime = 0;
        this.timerData.min = "";
        this.timerData.sec = "";
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