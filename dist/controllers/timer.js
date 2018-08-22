"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * GET /
 * Timer page.
 */
class MyTimer {
    constructor() {
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
        this.timerData = {
            startTime: 0,
            endTime: 0,
            min: 0,
            sec: 0
        };
    }
    setStartTime() {
        this.timerData.startTime = this.getTime();
    }
    setStopTime() {
        this.timerData.endTime = this.getTime();
        this.elapsedTime(this.timerData.startTime, this.timerData.endTime);
    }
    getTime() {
        return Date.now();
    }
    returnTimerData() {
        return this.timerData;
    }
    elapsedTime(startedAt, stoppedAt) {
        const diff = stoppedAt - startedAt;
        // const totalTime = this.formatMinSec(diff).seconds;
        this.timerData.min = this.formatMinSec(diff).minutes;
        this.timerData.sec = this.formatMinSec(diff).seconds;
    }
    formatMinSec(ms) {
        const sec = (ms / 1000) % 60;
        // const secCalc = (ms / 1000) % 60;
        const min = ((ms / 1000) - ((ms / 1000) % 60)) / 60;
        // const sec = Math.trunc(secCalc * Math.pow(10, 3)) / 100;
        const results = { seconds: sec, minutes: 0 };
        if (min < 1) {
            results.minutes = 0;
        }
        else {
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
exports.getTimer = (req, res) => {
    timer.resetTimer();
    res.render("timer", timer.returnTimerData());
};
exports.startTimer = (req, res) => {
    timer.setStartTime();
    res.render("timer", timer.returnTimerData());
};
exports.stopTimer = (req, res) => {
    timer.setStopTime();
    res.render("timer", timer.returnTimerData());
};
exports.t = timer;
//# sourceMappingURL=timer.js.map