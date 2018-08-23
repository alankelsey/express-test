"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * GET /
 * Timer page.
 */
class MyGroup {
    constructor() {
        this.groupInfo = [
            {
                "id": 1,
                "name": "Greg",
                "time": 0
            },
            {
                "id": 2,
                "name": "Dave",
                "time": 0
            },
            {
                "id": 3,
                "name": "Alan",
                "time": 0
            }
        ];
    }
    /*
        private groupInfo = [
            {
                "id": 1,
                "name": "Greg",
                "time": 0
            },
            {
                "id": 2,
                "name": "Dave",
                "time": 0
            },
            {
                "id": 2,
                "name": "Alan",
                "time": 0
            }
    
        ];
    */
    getName() {
        return "alan";
        // return this.groupInfo;
    }
}
/*

  starts, stops, formats dates
*/
class MyTimer extends MyGroup {
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
        super(...arguments);
        this.nameList = this.getName();
        this.timerData = {
            startTime: 0,
            endTime: 0,
            min: 0,
            sec: 0,
            name: this.nameList
        };
    }
    nextName(listIn) {
        // this.timerData.name = this.name;
    }
    setStartTime() {
        this.timerData.startTime = this.getTime();
        // this.nextName(this.nameList);
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
exports.getGroup = (req, res) => {
    // res.send(group.getName());
    // console.log(group.getName());
    res.render("timer", timer.returnTimerData());
};
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