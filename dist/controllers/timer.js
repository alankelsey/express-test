"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const group_1 = require("../controllers/group");
/**
 * GET /
 * Timer page.
 */
//  starts, stops, resets, formats dates.
//  pills in group for a list of names
//  and combines it all together for running results
class MyTimer extends group_1.MyGroup {
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
        // vars
        this.nameList = this.getNames();
        this.resultsList = [];
        // initialize timerdata
        this.timerData = {
            startTime: 0,
            endTime: 0,
            min: 0,
            sec: 0,
            name: this.nameList[0],
            index: 0,
            html: "",
            totals: {}
        };
    }
    // private nextName(listIn: object) {
    // this.timerData.name = this.name;
    // }
    setStartTime() {
        this.timerData.startTime = this.getTime();
        // this.nextName(this.nameList);
        console.log("STARTTIME " + this.timerData.totals);
    }
    setStopTime() {
        this.timerData.endTime = this.getTime();
        this.elapsedTime(this.timerData.startTime, this.timerData.endTime);
        this.timerData.totals = this.setTotals(this.timerData.name, this.timerData.min, this.timerData.sec);
        console.log("STOPTIME " + this.timerData.totals);
    }
    setUser(inc) {
        this.timerData.name = this.nameList[inc];
    }
    setTotals(user, min, sec) {
        const minSec = min + ":" + sec;
        const fullTotal = user + " " + minSec;
        this.resultsList.push(fullTotal);
        console.log("SETTOTAL " + this.timerData.totals);
        return this.resultsList;
    }
    // This resets the timer and group order
    nextUser(cnt) {
        this.resetTimer();
        // get length for the names array : minus one to offset index vs length
        const endIng = this.nameList.length - 1;
        // check if array length vs current position in user list
        const inc = cnt + 1;
        if (inc > endIng) {
            this.timerData.name = this.nameList[0];
            this.timerData.index = 0;
        }
        else {
            this.timerData.name = this.nameList[inc];
            this.timerData.index = inc;
        }
        console.log("NEXT USER " + this.timerData.totals);
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
        this.setUser(0);
    }
    resetResults() {
        console.log("RESET " + this.timerData.totals);
        this.timerData.totals = [];
        // this.timerData.totals =  0;
        this.resultsList = [];
        console.log("RESET " + this.timerData.totals);
    }
}
const timer = new MyTimer;
exports.getGroup = (req, res) => {
    res.render("timer", timer.returnTimerData());
};
exports.getTimer = (req, res) => {
    timer.resetTimer();
    timer.resetResults();
    res.render("timer", timer.returnTimerData());
};
exports.startTimer = (req, res) => {
    timer.setStartTime();
    res.render("timer", timer.returnTimerData());
};
exports.stopTimer = (req, res) => {
    // timer.setTotals(timer.returnTimerData().name, timer.returnTimerData().min, timer.returnTimerData().sec);
    timer.setStopTime();
    res.render("timer", timer.returnTimerData());
};
exports.next = (req, res) => {
    timer.nextUser(timer.returnTimerData().index);
    res.render("timer", timer.returnTimerData());
};
// export let t = timer;
//# sourceMappingURL=timer.js.map