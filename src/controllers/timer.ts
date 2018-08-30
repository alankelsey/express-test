import { Request, Response } from "express";
import { WriteError } from "mongodb";
import { default as User, UserModel, AuthToken } from "../models/User";
import { each } from "../../node_modules/@types/async";
import { MyGroup } from "../controllers/group" ;

/**
 * GET /
 * Timer page.
 */

 //  starts, stops, resets, formats dates.
 //  pills in group for a list of names
 //  and combines it all together for running results

class MyTimer extends MyGroup {


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

    // vars
    private nameList = this.getNames();
    private resultsList: Array<string> = [];

    // initialize timerdata
    private timerData = {
        startTime: 0,
        endTime: 0,
        min: 0,
        sec: 0,
        name: this.nameList[0],
        index: 0,
        html: "",
        totals: {}
    };


    // private nextName(listIn: object) {
        // this.timerData.name = this.name;
    // }

    setStartTime() {

        this.timerData.startTime = this.getTime();
        // this.nextName(this.nameList);
    }

    setStopTime() {

        this.timerData.endTime = this.getTime();
        this.elapsedTime(this.timerData.startTime, this.timerData.endTime);
        this.timerData.totals = this.setTotals(this.timerData.name, this.timerData.min, this.timerData.sec);

    }

    setUser(inc: number) {

        this.timerData.name = this.nameList[inc];
    }

    setTotals(user: string, min: number, sec: number) {

        const minSec = min + ":" + sec;
        const fullTotal = user + " " + minSec;


        this.resultsList.push(fullTotal);

        // console.log(user + " " + min + ":" + sec);
        // console.log(this.timerData.totals);

        return  this.resultsList;
    }

    // This resets the timer and group order
    nextUser(cnt: number) {

        this.resetTimer();
        // get length for the names array : minus one to offset index vs length
        const endIng = this.nameList.length - 1;

        // check if array length vs current position in user list
        const inc = cnt + 1;

        if ( inc > endIng ) {
            this.timerData.name = this.nameList[0];
            this.timerData.index = 0;
        } else {
            this.timerData.name = this.nameList[inc];
            this.timerData.index = inc;
        }
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
        this.setUser(0);
    }

    resetResults() {

        this.timerData.totals = [];
    }

}

const timer = new MyTimer;

export let getGroup = (req: Request, res: Response) => {

    res.render("timer", timer.returnTimerData());
};

export let getTimer = (req: Request, res: Response) => {

    timer.resetTimer();
    timer.resetResults();
    res.render("timer", timer.returnTimerData());
};

export let startTimer = (req: Request, res: Response) => {

    timer.setStartTime();
    res.render("timer", timer.returnTimerData());
};

export let stopTimer = (req: Request, res: Response) => {

    // timer.setTotals(timer.returnTimerData().name, timer.returnTimerData().min, timer.returnTimerData().sec);
    timer.setStopTime();
    res.render("timer", timer.returnTimerData());
};

export let next = (req: Request, res: Response) => {

    timer.nextUser(timer.returnTimerData().index);
    res.render("timer", timer.returnTimerData());
};

// export let t = timer;