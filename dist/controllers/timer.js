"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * GET /
 * Timer page.
 */
class MyTimer {
    setStartTime() {
        this.startTime = Date.now();
    }
    setStopTime() {
        this.stopTime = Date.now();
    }
    getTime() {
        const time = Date.now();
        return time;
    }
    getDate() {
        const today = new Date();
        return today;
    }
    elapsedTime(startedAt, stoppedAt) {
        const totalTime = this.stopTime - this.startTime;
        return totalTime;
    }
}
const timerData = new MyTimer;
const startTimerData = new MyTimer;
const stopTimerData = new MyTimer;
exports.getTimer = (req, res) => {
    const baseUrl = "http://localhost:3000/timer/startTimer";
    const timeNow = Date.now();
    const fullUrl = "baseUrl + timenow";
    res.render("timer", {
        date: timerData.getDate(),
        startTime: timeNow,
        link: fullUrl
    });
};
exports.startTimer = (req, res) => {
    // next: NextFunction
    const testTime = req.params.startTime;
    startTimerData.setStartTime();
    res.render("starttimer", {
        date: startTimerData.getDate(),
        startTime: Date.now(),
        try: testTime
    });
};
exports.stopTimer = (req, res) => {
    const start = req.params.startTime;
    stopTimerData.setStopTime();
    if (stopTimerData.startTime > 1) {
        this.timeSpent = timerData.elapsedTime(startTimerData.startTime, stopTimerData.stopTime);
    }
    else {
        this.timeSpent = "error";
    }
    res.render("stoptimer", {
        date: timerData.getDate(),
        stopTime: startTimerData.stopTime,
        startTime: stopTimerData.startTime,
        total: this.timeSpent
    });
};
/* export let startTimer = (req: Request, res: Response) => {
    res.send("<p>start Time: " + timer.startTime + "</p>");
}; */
//# sourceMappingURL=timer.js.map